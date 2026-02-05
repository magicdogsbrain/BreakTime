/**
 * Stick Figure Animation System
 *
 * A skeletal animation engine that renders and animates a stick figure
 * based on keyframe data stored alongside exercise steps.
 *
 * The stick figure uses a simple joint-based rig:
 * - head (circle)
 * - neck -> torso (spine)
 * - shoulders -> elbows -> wrists (arms)
 * - hips -> knees -> ankles (legs)
 *
 * Animations are defined as keyframes with joint positions relative to
 * a normalized coordinate system (0-100).
 */

// Default standing pose - all positions relative to center (50, y)
const DEFAULT_POSE = {
  head: { x: 50, y: 12 },
  neck: { x: 50, y: 20 },
  torso: { x: 50, y: 45 },
  leftShoulder: { x: 42, y: 22 },
  rightShoulder: { x: 58, y: 22 },
  leftElbow: { x: 35, y: 35 },
  rightElbow: { x: 65, y: 35 },
  leftWrist: { x: 32, y: 48 },
  rightWrist: { x: 68, y: 48 },
  leftHip: { x: 45, y: 48 },
  rightHip: { x: 55, y: 48 },
  leftKnee: { x: 44, y: 65 },
  rightKnee: { x: 56, y: 65 },
  leftAnkle: { x: 43, y: 85 },
  rightAnkle: { x: 57, y: 85 }
};

/**
 * Interpolate between two poses
 */
function interpolatePose(poseA, poseB, t) {
  const result = {};
  for (const joint in poseA) {
    result[joint] = {
      x: poseA[joint].x + (poseB[joint].x - poseA[joint].x) * t,
      y: poseA[joint].y + (poseB[joint].y - poseA[joint].y) * t
    };
  }
  return result;
}

/**
 * Easing function for smooth animations
 */
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Creates the SVG stick figure element
 */
export function createStickFigure(width = 150, height = 150) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.classList.add('stick-figure');

  // Style for the figure
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    .stick-figure { overflow: visible; }
    .stick-line { stroke: #ff4081; stroke-width: 3; stroke-linecap: round; fill: none; }
    .stick-head { fill: none; stroke: #ff4081; stroke-width: 3; }
    .stick-joint { fill: #ff6b9d; }
  `;
  svg.appendChild(style);

  // Create body parts as lines
  const parts = [
    // Spine
    { id: 'spine', from: 'neck', to: 'torso' },
    // Left arm
    { id: 'left-upper-arm', from: 'leftShoulder', to: 'leftElbow' },
    { id: 'left-lower-arm', from: 'leftElbow', to: 'leftWrist' },
    // Right arm
    { id: 'right-upper-arm', from: 'rightShoulder', to: 'rightElbow' },
    { id: 'right-lower-arm', from: 'rightElbow', to: 'rightWrist' },
    // Shoulders
    { id: 'shoulders', from: 'leftShoulder', to: 'rightShoulder' },
    // Neck
    { id: 'neck-line', from: 'head', to: 'neck' },
    // Hips
    { id: 'hips', from: 'leftHip', to: 'rightHip' },
    // Torso to hips (center)
    { id: 'torso-hips', from: 'torso', to: 'torso', toOffset: { x: 0, y: 3 } },
    // Left leg
    { id: 'left-upper-leg', from: 'leftHip', to: 'leftKnee' },
    { id: 'left-lower-leg', from: 'leftKnee', to: 'leftAnkle' },
    // Right leg
    { id: 'right-upper-leg', from: 'rightHip', to: 'rightKnee' },
    { id: 'right-lower-leg', from: 'rightKnee', to: 'rightAnkle' }
  ];

  // Create lines
  parts.forEach(part => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('stick-line');
    line.id = `stick-${part.id}`;
    line.dataset.from = part.from;
    line.dataset.to = part.to;
    if (part.toOffset) {
      line.dataset.toOffsetX = part.toOffset.x;
      line.dataset.toOffsetY = part.toOffset.y;
    }
    svg.appendChild(line);
  });

  // Create head
  const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  head.classList.add('stick-head');
  head.id = 'stick-head';
  head.setAttribute('r', '8');
  svg.appendChild(head);

  // Create small joint circles for hands
  ['leftWrist', 'rightWrist'].forEach(joint => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.classList.add('stick-joint');
    circle.id = `stick-joint-${joint}`;
    circle.setAttribute('r', '2');
    svg.appendChild(circle);
  });

  return svg;
}

/**
 * Updates the SVG stick figure to match a pose
 */
export function updateStickFigure(svg, pose) {
  // Update head position
  const head = svg.querySelector('#stick-head');
  if (head) {
    head.setAttribute('cx', pose.head.x);
    head.setAttribute('cy', pose.head.y);
  }

  // Update all lines
  svg.querySelectorAll('.stick-line').forEach(line => {
    const from = line.dataset.from;
    const to = line.dataset.to;
    const toOffsetX = parseFloat(line.dataset.toOffsetX) || 0;
    const toOffsetY = parseFloat(line.dataset.toOffsetY) || 0;

    if (pose[from] && pose[to]) {
      line.setAttribute('x1', pose[from].x);
      line.setAttribute('y1', pose[from].y);
      line.setAttribute('x2', pose[to].x + toOffsetX);
      line.setAttribute('y2', pose[to].y + toOffsetY);
    }
  });

  // Update joint circles
  ['leftWrist', 'rightWrist'].forEach(joint => {
    const circle = svg.querySelector(`#stick-joint-${joint}`);
    if (circle && pose[joint]) {
      circle.setAttribute('cx', pose[joint].x);
      circle.setAttribute('cy', pose[joint].y);
    }
  });
}

/**
 * StickFigureAnimator - Manages animation playback
 */
export class StickFigureAnimator {
  constructor(svg, keyframes) {
    this.svg = svg;
    this.keyframes = keyframes || [{ pose: DEFAULT_POSE, duration: 1000 }];
    this.currentKeyframe = 0;
    this.animationFrame = null;
    this.startTime = null;
    this.isPlaying = false;
  }

  /**
   * Start the animation loop
   */
  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startTime = performance.now();
    this.animate();
  }

  /**
   * Stop the animation
   */
  stop() {
    this.isPlaying = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Animation loop
   */
  animate() {
    if (!this.isPlaying) return;

    const now = performance.now();
    const elapsed = now - this.startTime;
    const currentKF = this.keyframes[this.currentKeyframe];
    const nextKFIndex = (this.currentKeyframe + 1) % this.keyframes.length;
    const nextKF = this.keyframes[nextKFIndex];

    // Calculate progress through current keyframe
    const progress = Math.min(elapsed / currentKF.duration, 1);
    const easedProgress = easeInOutQuad(progress);

    // Interpolate between current and next pose
    const currentPose = currentKF.pose || DEFAULT_POSE;
    const nextPose = nextKF.pose || DEFAULT_POSE;
    const interpolatedPose = interpolatePose(currentPose, nextPose, easedProgress);

    // Update the figure
    updateStickFigure(this.svg, interpolatedPose);

    // Move to next keyframe if done
    if (progress >= 1) {
      this.currentKeyframe = nextKFIndex;
      this.startTime = now;
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  /**
   * Set new keyframes and restart
   */
  setKeyframes(keyframes) {
    this.stop();
    this.keyframes = keyframes;
    this.currentKeyframe = 0;
    this.play();
  }
}

/**
 * Preset animation poses for common exercises
 */
export const ANIMATION_POSES = {
  // Standing neutral
  standing: { ...DEFAULT_POSE },

  // Arms raised overhead
  armsUp: {
    ...DEFAULT_POSE,
    leftElbow: { x: 40, y: 12 },
    rightElbow: { x: 60, y: 12 },
    leftWrist: { x: 42, y: 2 },
    rightWrist: { x: 58, y: 2 }
  },

  // Arms out to sides (T-pose)
  armsOut: {
    ...DEFAULT_POSE,
    leftElbow: { x: 25, y: 22 },
    rightElbow: { x: 75, y: 22 },
    leftWrist: { x: 10, y: 22 },
    rightWrist: { x: 90, y: 22 }
  },

  // Shoulders raised (shrug)
  shouldersUp: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 42, y: 18 },
    rightShoulder: { x: 58, y: 18 },
    leftElbow: { x: 35, y: 30 },
    rightElbow: { x: 65, y: 30 }
  },

  // Head tilted left
  headLeft: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 12 }
  },

  // Head tilted right
  headRight: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 12 }
  },

  // Slight squat
  squat: {
    ...DEFAULT_POSE,
    torso: { x: 50, y: 50 },
    leftHip: { x: 45, y: 53 },
    rightHip: { x: 55, y: 53 },
    leftKnee: { x: 40, y: 68 },
    rightKnee: { x: 60, y: 68 },
    leftAnkle: { x: 38, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Reaching left
  reachLeft: {
    ...DEFAULT_POSE,
    leftElbow: { x: 20, y: 30 },
    leftWrist: { x: 5, y: 35 },
    torso: { x: 48, y: 45 }
  },

  // Reaching right
  reachRight: {
    ...DEFAULT_POSE,
    rightElbow: { x: 80, y: 30 },
    rightWrist: { x: 95, y: 35 },
    torso: { x: 52, y: 45 }
  },

  // Deep breath - expanded chest
  breatheIn: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 40, y: 20 },
    rightShoulder: { x: 60, y: 20 },
    leftElbow: { x: 30, y: 33 },
    rightElbow: { x: 70, y: 33 }
  },

  // Exhale - relaxed
  breatheOut: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 43, y: 24 },
    rightShoulder: { x: 57, y: 24 }
  },

  // Twist left
  twistLeft: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 48, y: 22 },
    rightShoulder: { x: 55, y: 25 },
    leftElbow: { x: 55, y: 35 },
    leftWrist: { x: 60, y: 45 },
    rightElbow: { x: 62, y: 38 },
    rightWrist: { x: 58, y: 50 }
  },

  // Twist right
  twistRight: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 45, y: 25 },
    rightShoulder: { x: 52, y: 22 },
    leftElbow: { x: 38, y: 38 },
    leftWrist: { x: 42, y: 50 },
    rightElbow: { x: 45, y: 35 },
    rightWrist: { x: 40, y: 45 }
  },

  // Neck roll forward
  neckForward: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 16 },
    neck: { x: 50, y: 20 }
  },

  // One arm up (left)
  leftArmUp: {
    ...DEFAULT_POSE,
    leftElbow: { x: 38, y: 10 },
    leftWrist: { x: 40, y: 0 }
  },

  // One arm up (right)
  rightArmUp: {
    ...DEFAULT_POSE,
    rightElbow: { x: 62, y: 10 },
    rightWrist: { x: 60, y: 0 }
  },

  // Hands on hips
  handsOnHips: {
    ...DEFAULT_POSE,
    leftElbow: { x: 32, y: 38 },
    leftWrist: { x: 40, y: 48 },
    rightElbow: { x: 68, y: 38 },
    rightWrist: { x: 60, y: 48 }
  },

  // Seated (for chair exercises)
  seated: {
    ...DEFAULT_POSE,
    torso: { x: 50, y: 40 },
    leftHip: { x: 45, y: 45 },
    rightHip: { x: 55, y: 45 },
    leftKnee: { x: 35, y: 55 },
    rightKnee: { x: 65, y: 55 },
    leftAnkle: { x: 35, y: 75 },
    rightAnkle: { x: 65, y: 75 }
  }
};

/**
 * Pre-defined animation sequences for exercises
 * Each sequence is an array of keyframes with pose name and duration
 */
export const ANIMATION_SEQUENCES = {
  // Shoulder drops
  'shoulder-drops': [
    { pose: ANIMATION_POSES.standing, duration: 500 },
    { pose: ANIMATION_POSES.shouldersUp, duration: 800 },
    { pose: ANIMATION_POSES.standing, duration: 600 }
  ],

  // Neck stretches
  'neck-stretch': [
    { pose: ANIMATION_POSES.standing, duration: 500 },
    { pose: ANIMATION_POSES.headLeft, duration: 1500 },
    { pose: ANIMATION_POSES.standing, duration: 500 },
    { pose: ANIMATION_POSES.headRight, duration: 1500 },
    { pose: ANIMATION_POSES.standing, duration: 500 }
  ],

  // Arm reaches
  'arm-reaches': [
    { pose: ANIMATION_POSES.standing, duration: 400 },
    { pose: ANIMATION_POSES.armsUp, duration: 1000 },
    { pose: ANIMATION_POSES.armsOut, duration: 800 },
    { pose: ANIMATION_POSES.standing, duration: 600 }
  ],

  // Deep breathing
  'deep-breathing': [
    { pose: ANIMATION_POSES.standing, duration: 300 },
    { pose: ANIMATION_POSES.breatheIn, duration: 2000 },
    { pose: ANIMATION_POSES.breatheOut, duration: 2500 },
    { pose: ANIMATION_POSES.standing, duration: 500 }
  ],

  // Body twist
  'body-twist': [
    { pose: ANIMATION_POSES.handsOnHips, duration: 400 },
    { pose: ANIMATION_POSES.twistLeft, duration: 1200 },
    { pose: ANIMATION_POSES.handsOnHips, duration: 400 },
    { pose: ANIMATION_POSES.twistRight, duration: 1200 },
    { pose: ANIMATION_POSES.handsOnHips, duration: 400 }
  ],

  // Gentle squats
  'gentle-squat': [
    { pose: ANIMATION_POSES.standing, duration: 500 },
    { pose: ANIMATION_POSES.squat, duration: 1000 },
    { pose: ANIMATION_POSES.standing, duration: 800 }
  ],

  // Side stretches
  'side-stretch': [
    { pose: ANIMATION_POSES.standing, duration: 400 },
    { pose: ANIMATION_POSES.leftArmUp, duration: 300 },
    { pose: ANIMATION_POSES.reachRight, duration: 1500 },
    { pose: ANIMATION_POSES.standing, duration: 400 },
    { pose: ANIMATION_POSES.rightArmUp, duration: 300 },
    { pose: ANIMATION_POSES.reachLeft, duration: 1500 },
    { pose: ANIMATION_POSES.standing, duration: 400 }
  ],

  // Default gentle movement
  'default': [
    { pose: ANIMATION_POSES.standing, duration: 800 },
    { pose: ANIMATION_POSES.breatheIn, duration: 1200 },
    { pose: ANIMATION_POSES.breatheOut, duration: 1400 },
    { pose: ANIMATION_POSES.standing, duration: 600 }
  ]
};

/**
 * Get animation keyframes for an exercise
 * Tries to match by exercise ID, or returns default
 */
export function getAnimationForExercise(exercise) {
  // First check if exercise has custom animation data
  if (exercise.animation) {
    // Convert animation data to keyframes
    return exercise.animation.map(frame => ({
      pose: typeof frame.pose === 'string'
        ? ANIMATION_POSES[frame.pose] || ANIMATION_POSES.standing
        : { ...ANIMATION_POSES.standing, ...frame.pose },
      duration: frame.duration || 1000
    }));
  }

  // Try to find a matching sequence by ID or partial match
  const id = exercise.id.toLowerCase();

  // Direct match
  if (ANIMATION_SEQUENCES[id]) {
    return ANIMATION_SEQUENCES[id];
  }

  // Partial matches
  if (id.includes('shoulder')) return ANIMATION_SEQUENCES['shoulder-drops'];
  if (id.includes('neck')) return ANIMATION_SEQUENCES['neck-stretch'];
  if (id.includes('arm') || id.includes('reach')) return ANIMATION_SEQUENCES['arm-reaches'];
  if (id.includes('breath')) return ANIMATION_SEQUENCES['deep-breathing'];
  if (id.includes('twist')) return ANIMATION_SEQUENCES['body-twist'];
  if (id.includes('squat') || id.includes('stand')) return ANIMATION_SEQUENCES['gentle-squat'];
  if (id.includes('stretch') || id.includes('side')) return ANIMATION_SEQUENCES['side-stretch'];

  // Category-based defaults
  if (exercise.category === 'breathe') return ANIMATION_SEQUENCES['deep-breathing'];

  return ANIMATION_SEQUENCES['default'];
}

/**
 * Creates and starts an animated stick figure for an exercise
 * Returns the container element and animator instance
 */
export function createExerciseAnimation(exercise) {
  const container = document.createElement('div');
  container.className = 'stick-figure-container';

  const svg = createStickFigure(120, 120);
  container.appendChild(svg);

  const keyframes = getAnimationForExercise(exercise);
  const animator = new StickFigureAnimator(svg, keyframes);

  // Initialize with first pose
  updateStickFigure(svg, keyframes[0].pose);

  // Start animation
  animator.play();

  return { container, animator, svg };
}
