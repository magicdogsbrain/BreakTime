/**
 * Stick Figure Animation System
 *
 * A skeletal animation engine that renders and animates a stick figure
 * based on keyframe data stored alongside exercise steps.
 *
 * Features:
 * - Joint-based rig with head, spine, arms, legs
 * - Props: wall, chair, doorframe for context
 * - Smooth interpolation between poses
 * - Per-exercise custom animations
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
    // Handle face property specially - it's not a coordinate
    if (joint === 'face') {
      // For face features, use the source pose's face if we're less than halfway,
      // otherwise use the target pose's face (snap transition)
      // But if target has face features, prefer those as we approach the target
      if (t < 0.5) {
        result.face = poseA.face ? { ...poseA.face } : null;
      } else {
        result.face = poseB.face ? { ...poseB.face } : (poseA.face ? { ...poseA.face } : null);
      }
      continue;
    }

    // Regular joint interpolation
    if (poseA[joint] && poseA[joint].x !== undefined && poseB[joint]) {
      result[joint] = {
        x: poseA[joint].x + (poseB[joint].x - poseA[joint].x) * t,
        y: poseA[joint].y + (poseB[joint].y - poseA[joint].y) * t
      };
    } else if (poseA[joint]) {
      result[joint] = { ...poseA[joint] };
    }
  }

  // Also check if poseB has face that poseA doesn't
  if (!result.face && poseB.face && t >= 0.5) {
    result.face = { ...poseB.face };
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
 * Creates prop elements (wall, chair, doorframe)
 */
function createProps(svg, props) {
  if (!props) return;

  const propGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  propGroup.classList.add('stick-props');

  if (props.includes('wall')) {
    // Vertical wall on the right side
    const wall = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wall.setAttribute('x1', '85');
    wall.setAttribute('y1', '5');
    wall.setAttribute('x2', '85');
    wall.setAttribute('y2', '90');
    wall.classList.add('stick-prop');
    propGroup.appendChild(wall);
  }

  if (props.includes('wall-left')) {
    // Vertical wall on the left side
    const wall = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wall.setAttribute('x1', '15');
    wall.setAttribute('y1', '5');
    wall.setAttribute('x2', '15');
    wall.setAttribute('y2', '90');
    wall.classList.add('stick-prop');
    propGroup.appendChild(wall);
  }

  if (props.includes('chair')) {
    // Simple chair shape - seat and back
    const seat = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    seat.setAttribute('x1', '25');
    seat.setAttribute('y1', '60');
    seat.setAttribute('x2', '55');
    seat.setAttribute('y2', '60');
    seat.classList.add('stick-prop');
    propGroup.appendChild(seat);

    const back = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    back.setAttribute('x1', '25');
    back.setAttribute('y1', '35');
    back.setAttribute('x2', '25');
    back.setAttribute('y2', '60');
    back.classList.add('stick-prop');
    propGroup.appendChild(back);

    const legLeft = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    legLeft.setAttribute('x1', '28');
    legLeft.setAttribute('y1', '60');
    legLeft.setAttribute('x2', '28');
    legLeft.setAttribute('y2', '85');
    legLeft.classList.add('stick-prop');
    propGroup.appendChild(legLeft);

    const legRight = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    legRight.setAttribute('x1', '52');
    legRight.setAttribute('y1', '60');
    legRight.setAttribute('x2', '52');
    legRight.setAttribute('y2', '85');
    legRight.classList.add('stick-prop');
    propGroup.appendChild(legRight);
  }

  if (props.includes('doorframe')) {
    // Doorframe - two vertical lines with top
    const left = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    left.setAttribute('x1', '20');
    left.setAttribute('y1', '5');
    left.setAttribute('x2', '20');
    left.setAttribute('y2', '90');
    left.classList.add('stick-prop');
    propGroup.appendChild(left);

    const right = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    right.setAttribute('x1', '80');
    right.setAttribute('y1', '5');
    right.setAttribute('x2', '80');
    right.setAttribute('y2', '90');
    right.classList.add('stick-prop');
    propGroup.appendChild(right);

    const top = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    top.setAttribute('x1', '20');
    top.setAttribute('y1', '5');
    top.setAttribute('x2', '80');
    top.setAttribute('y2', '5');
    top.classList.add('stick-prop');
    propGroup.appendChild(top);
  }

  if (props.includes('table')) {
    // Table/desk surface
    const surface = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    surface.setAttribute('x1', '60');
    surface.setAttribute('y1', '50');
    surface.setAttribute('x2', '95');
    surface.setAttribute('y2', '50');
    surface.classList.add('stick-prop');
    propGroup.appendChild(surface);

    const leg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leg.setAttribute('x1', '90');
    leg.setAttribute('y1', '50');
    leg.setAttribute('x2', '90');
    leg.setAttribute('y2', '85');
    leg.classList.add('stick-prop');
    propGroup.appendChild(leg);
  }

  if (props.includes('floor')) {
    // Floor line
    const floor = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    floor.setAttribute('x1', '5');
    floor.setAttribute('y1', '88');
    floor.setAttribute('x2', '95');
    floor.setAttribute('y2', '88');
    floor.classList.add('stick-prop');
    propGroup.appendChild(floor);
  }

  // Insert props before the figure (so they appear behind)
  svg.insertBefore(propGroup, svg.firstChild.nextSibling);
}

/**
 * Creates the SVG stick figure element
 */
export function createStickFigure(width = 150, height = 150, props = null) {
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
    .stick-prop { stroke: #d4a5c4; stroke-width: 2; stroke-linecap: round; fill: none; opacity: 0.7; }
    .stick-mouth { stroke: #ff4081; stroke-width: 2; stroke-linecap: round; fill: none; }
    .stick-tongue { fill: #ff6b9d; stroke: none; }
    .stick-eye { fill: #ff4081; }
  `;
  svg.appendChild(style);

  // Add props if specified
  if (props) {
    createProps(svg, props);
  }

  // Create body parts as lines
  const parts = [
    { id: 'spine', from: 'neck', to: 'torso' },
    { id: 'left-upper-arm', from: 'leftShoulder', to: 'leftElbow' },
    { id: 'left-lower-arm', from: 'leftElbow', to: 'leftWrist' },
    { id: 'right-upper-arm', from: 'rightShoulder', to: 'rightElbow' },
    { id: 'right-lower-arm', from: 'rightElbow', to: 'rightWrist' },
    { id: 'shoulders', from: 'leftShoulder', to: 'rightShoulder' },
    { id: 'neck-line', from: 'head', to: 'neck' },
    { id: 'hips', from: 'leftHip', to: 'rightHip' },
    { id: 'torso-hips', from: 'torso', to: 'torso', toOffset: { x: 0, y: 3 } },
    { id: 'left-upper-leg', from: 'leftHip', to: 'leftKnee' },
    { id: 'left-lower-leg', from: 'leftKnee', to: 'leftAnkle' },
    { id: 'right-upper-leg', from: 'rightHip', to: 'rightKnee' },
    { id: 'right-lower-leg', from: 'rightKnee', to: 'rightAnkle' }
  ];

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

  // Create face elements (hidden by default, shown for face-focused exercises)
  // Eyes
  const leftEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  leftEye.classList.add('stick-eye');
  leftEye.id = 'stick-left-eye';
  leftEye.setAttribute('r', '1');
  leftEye.style.opacity = '0';
  svg.appendChild(leftEye);

  const rightEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  rightEye.classList.add('stick-eye');
  rightEye.id = 'stick-right-eye';
  rightEye.setAttribute('r', '1');
  rightEye.style.opacity = '0';
  svg.appendChild(rightEye);

  // Mouth (arc path)
  const mouth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  mouth.classList.add('stick-mouth');
  mouth.id = 'stick-mouth';
  mouth.style.opacity = '0';
  svg.appendChild(mouth);

  // Tongue (for lion breath)
  const tongue = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  tongue.classList.add('stick-tongue');
  tongue.id = 'stick-tongue';
  tongue.style.opacity = '0';
  svg.appendChild(tongue);

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
  const head = svg.querySelector('#stick-head');
  if (head) {
    head.setAttribute('cx', pose.head.x);
    head.setAttribute('cy', pose.head.y);
  }

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

  ['leftWrist', 'rightWrist'].forEach(joint => {
    const circle = svg.querySelector(`#stick-joint-${joint}`);
    if (circle && pose[joint]) {
      circle.setAttribute('cx', pose[joint].x);
      circle.setAttribute('cy', pose[joint].y);
    }
  });

  // Update face elements if pose has face data
  const leftEye = svg.querySelector('#stick-left-eye');
  const rightEye = svg.querySelector('#stick-right-eye');
  const mouth = svg.querySelector('#stick-mouth');
  const tongue = svg.querySelector('#stick-tongue');

  if (pose.face) {
    const headX = pose.head.x;
    const headY = pose.head.y;

    // Eyes
    if (leftEye && rightEye) {
      const eyeSpread = pose.face.eyeSpread || 3;
      const eyeY = headY - 1;
      leftEye.setAttribute('cx', headX - eyeSpread);
      leftEye.setAttribute('cy', eyeY);
      rightEye.setAttribute('cx', headX + eyeSpread);
      rightEye.setAttribute('cy', eyeY);
      leftEye.style.opacity = pose.face.showEyes ? '1' : '0';
      rightEye.style.opacity = pose.face.showEyes ? '1' : '0';

      // Wide eyes for emphasis
      if (pose.face.eyesWide) {
        leftEye.setAttribute('r', '1.5');
        rightEye.setAttribute('r', '1.5');
      } else {
        leftEye.setAttribute('r', '1');
        rightEye.setAttribute('r', '1');
      }
    }

    // Mouth
    if (mouth) {
      const mouthY = headY + 3;
      const mouthOpen = pose.face.mouthOpen || 0; // 0-5 scale

      if (mouthOpen > 0) {
        // Open mouth - ellipse shape
        const width = 2 + mouthOpen;
        const height = mouthOpen * 1.2;
        mouth.setAttribute('d', `M ${headX - width} ${mouthY} Q ${headX} ${mouthY + height * 2} ${headX + width} ${mouthY}`);
        mouth.style.opacity = '1';
      } else if (pose.face.smile) {
        // Smile curve
        mouth.setAttribute('d', `M ${headX - 3} ${mouthY} Q ${headX} ${mouthY + 2} ${headX + 3} ${mouthY}`);
        mouth.style.opacity = '1';
      } else {
        mouth.style.opacity = '0';
      }
    }

    // Tongue (for lion breath)
    if (tongue) {
      if (pose.face.tongueOut) {
        const tongueY = headY + 6 + (pose.face.mouthOpen || 0);
        tongue.setAttribute('cx', headX);
        tongue.setAttribute('cy', tongueY);
        tongue.setAttribute('rx', 2);
        tongue.setAttribute('ry', 3 + (pose.face.mouthOpen || 0) * 0.5);
        tongue.style.opacity = '1';
      } else {
        tongue.style.opacity = '0';
      }
    }
  } else {
    // Hide face elements if no face data
    if (leftEye) leftEye.style.opacity = '0';
    if (rightEye) rightEye.style.opacity = '0';
    if (mouth) mouth.style.opacity = '0';
    if (tongue) tongue.style.opacity = '0';
  }
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

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startTime = performance.now();
    this.animate();
  }

  stop() {
    this.isPlaying = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  animate() {
    if (!this.isPlaying) return;

    const now = performance.now();
    const elapsed = now - this.startTime;
    const currentKF = this.keyframes[this.currentKeyframe];
    const nextKFIndex = (this.currentKeyframe + 1) % this.keyframes.length;
    const nextKF = this.keyframes[nextKFIndex];

    const progress = Math.min(elapsed / currentKF.duration, 1);
    const easedProgress = easeInOutQuad(progress);

    const currentPose = currentKF.pose || DEFAULT_POSE;
    const nextPose = nextKF.pose || DEFAULT_POSE;
    const interpolatedPose = interpolatePose(currentPose, nextPose, easedProgress);

    updateStickFigure(this.svg, interpolatedPose);

    if (progress >= 1) {
      this.currentKeyframe = nextKFIndex;
      this.startTime = now;
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

/**
 * All animation poses
 */
export const POSES = {
  // === STANDING POSES ===
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
    leftShoulder: { x: 42, y: 16 },
    rightShoulder: { x: 58, y: 16 },
    leftElbow: { x: 35, y: 28 },
    rightElbow: { x: 65, y: 28 },
    leftWrist: { x: 32, y: 42 },
    rightWrist: { x: 68, y: 42 }
  },

  // Head tilted left
  headLeft: {
    ...DEFAULT_POSE,
    head: { x: 44, y: 14 }
  },

  // Head tilted right
  headRight: {
    ...DEFAULT_POSE,
    head: { x: 56, y: 14 }
  },

  // Head forward/down
  headDown: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 18 }
  },

  // Squat
  squat: {
    ...DEFAULT_POSE,
    torso: { x: 50, y: 50 },
    leftHip: { x: 42, y: 53 },
    rightHip: { x: 58, y: 53 },
    leftKnee: { x: 35, y: 68 },
    rightKnee: { x: 65, y: 68 },
    leftAnkle: { x: 38, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Side bend left - reaching over
  sideBendLeft: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 14 },
    neck: { x: 47, y: 21 },
    torso: { x: 48, y: 45 },
    rightElbow: { x: 55, y: 8 },
    rightWrist: { x: 40, y: 5 }
  },

  // Side bend right
  sideBendRight: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 14 },
    neck: { x: 53, y: 21 },
    torso: { x: 52, y: 45 },
    leftElbow: { x: 45, y: 8 },
    leftWrist: { x: 60, y: 5 }
  },

  // Deep breath in - expanded
  breatheIn: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 38, y: 20 },
    rightShoulder: { x: 62, y: 20 },
    leftElbow: { x: 28, y: 32 },
    rightElbow: { x: 72, y: 32 }
  },

  // Exhale - relaxed
  breatheOut: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 44, y: 24 },
    rightShoulder: { x: 56, y: 24 },
    leftElbow: { x: 38, y: 38 },
    rightElbow: { x: 62, y: 38 }
  },

  // Hands on hips
  handsOnHips: {
    ...DEFAULT_POSE,
    leftElbow: { x: 30, y: 38 },
    leftWrist: { x: 40, y: 48 },
    rightElbow: { x: 70, y: 38 },
    rightWrist: { x: 60, y: 48 }
  },

  // Twist left
  twistLeft: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 50, y: 22 },
    rightShoulder: { x: 55, y: 25 },
    leftElbow: { x: 60, y: 32 },
    leftWrist: { x: 65, y: 45 },
    rightElbow: { x: 62, y: 40 },
    rightWrist: { x: 55, y: 50 }
  },

  // Twist right
  twistRight: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 45, y: 25 },
    rightShoulder: { x: 50, y: 22 },
    leftElbow: { x: 38, y: 40 },
    leftWrist: { x: 45, y: 50 },
    rightElbow: { x: 40, y: 32 },
    rightWrist: { x: 35, y: 45 }
  },

  // Left arm up only
  leftArmUp: {
    ...DEFAULT_POSE,
    leftElbow: { x: 38, y: 8 },
    leftWrist: { x: 42, y: -2 }
  },

  // Right arm up only
  rightArmUp: {
    ...DEFAULT_POSE,
    rightElbow: { x: 62, y: 8 },
    rightWrist: { x: 58, y: -2 }
  },

  // === WALL POSES ===
  // Facing wall, hands on wall
  wallLean: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 15 },
    neck: { x: 57, y: 22 },
    torso: { x: 60, y: 45 },
    leftShoulder: { x: 52, y: 24 },
    rightShoulder: { x: 68, y: 24 },
    leftElbow: { x: 60, y: 20 },
    rightElbow: { x: 78, y: 20 },
    leftWrist: { x: 70, y: 18 },
    rightWrist: { x: 85, y: 18 },
    leftHip: { x: 55, y: 48 },
    rightHip: { x: 65, y: 48 },
    leftKnee: { x: 50, y: 65 },
    rightKnee: { x: 60, y: 65 },
    leftAnkle: { x: 45, y: 85 },
    rightAnkle: { x: 55, y: 85 }
  },

  // Wall lean extended (push-up position)
  wallLeanDeep: {
    ...DEFAULT_POSE,
    head: { x: 62, y: 22 },
    neck: { x: 64, y: 28 },
    torso: { x: 68, y: 48 },
    leftShoulder: { x: 60, y: 30 },
    rightShoulder: { x: 76, y: 30 },
    leftElbow: { x: 72, y: 28 },
    rightElbow: { x: 84, y: 28 },
    leftWrist: { x: 80, y: 25 },
    rightWrist: { x: 85, y: 25 },
    leftHip: { x: 62, y: 51 },
    rightHip: { x: 72, y: 51 },
    leftKnee: { x: 55, y: 68 },
    rightKnee: { x: 65, y: 68 },
    leftAnkle: { x: 48, y: 85 },
    rightAnkle: { x: 58, y: 85 }
  },

  // Back against wall
  wallBack: {
    ...DEFAULT_POSE,
    head: { x: 70, y: 12 },
    neck: { x: 72, y: 20 },
    torso: { x: 75, y: 45 },
    leftShoulder: { x: 67, y: 22 },
    rightShoulder: { x: 83, y: 22 },
    leftHip: { x: 70, y: 48 },
    rightHip: { x: 80, y: 48 }
  },

  // === SEATED POSES ===
  // Chair seat is at y=60, so hips should be at ~58, knees forward at ~70, feet at ~85
  seated: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 28 },
    neck: { x: 45, y: 35 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 36, y: 37 },
    rightShoulder: { x: 50, y: 37 },
    leftElbow: { x: 30, y: 48 },
    rightElbow: { x: 56, y: 48 },
    leftWrist: { x: 35, y: 58 },
    rightWrist: { x: 55, y: 58 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  seatedTwistLeft: {
    ...DEFAULT_POSE,
    head: { x: 38, y: 28 },
    neck: { x: 42, y: 35 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 48, y: 37 },
    rightShoulder: { x: 50, y: 40 },
    leftElbow: { x: 58, y: 45 },
    rightElbow: { x: 45, y: 52 },
    leftWrist: { x: 62, y: 55 },
    rightWrist: { x: 38, y: 62 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  seatedTwistRight: {
    ...DEFAULT_POSE,
    head: { x: 52, y: 28 },
    neck: { x: 48, y: 35 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 36, y: 40 },
    rightShoulder: { x: 42, y: 37 },
    leftElbow: { x: 42, y: 52 },
    rightElbow: { x: 32, y: 45 },
    leftWrist: { x: 50, y: 62 },
    rightWrist: { x: 28, y: 55 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  seatedKneeUp: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 28 },
    neck: { x: 45, y: 35 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 36, y: 37 },
    rightShoulder: { x: 50, y: 37 },
    leftElbow: { x: 38, y: 48 },
    rightElbow: { x: 52, y: 48 },
    leftWrist: { x: 45, y: 55 },
    rightWrist: { x: 55, y: 55 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 48, y: 50 },       // Knee lifted up
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 45, y: 62 },      // Foot tucked under raised knee
    rightAnkle: { x: 62, y: 85 }
  },

  seatedArmsUp: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 25 },
    neck: { x: 45, y: 32 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 36, y: 34 },
    rightShoulder: { x: 50, y: 34 },
    leftElbow: { x: 38, y: 22 },
    rightElbow: { x: 52, y: 22 },
    leftWrist: { x: 40, y: 10 },
    rightWrist: { x: 54, y: 10 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Forward fold from seated - folding forward over legs
  seatedFold: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 60 },
    neck: { x: 52, y: 55 },
    torso: { x: 48, y: 55 },
    leftShoulder: { x: 44, y: 54 },
    rightShoulder: { x: 54, y: 54 },
    leftElbow: { x: 48, y: 65 },
    rightElbow: { x: 58, y: 65 },
    leftWrist: { x: 50, y: 78 },
    rightWrist: { x: 60, y: 78 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // === DOORFRAME POSES ===
  doorframeStretch: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 15 },
    neck: { x: 50, y: 22 },
    torso: { x: 52, y: 45 },
    leftShoulder: { x: 40, y: 24 },
    rightShoulder: { x: 60, y: 24 },
    leftElbow: { x: 22, y: 18 },
    rightElbow: { x: 78, y: 18 },
    leftWrist: { x: 20, y: 30 },
    rightWrist: { x: 80, y: 30 },
    leftHip: { x: 47, y: 48 },
    rightHip: { x: 57, y: 48 },
    leftKnee: { x: 42, y: 65 },
    rightKnee: { x: 62, y: 65 },
    leftAnkle: { x: 38, y: 85 },
    rightAnkle: { x: 58, y: 85 }
  },

  // === SPECIAL POSES ===
  // Self hug
  selfHug: {
    ...DEFAULT_POSE,
    leftElbow: { x: 58, y: 35 },
    leftWrist: { x: 62, y: 45 },
    rightElbow: { x: 42, y: 35 },
    rightWrist: { x: 38, y: 45 }
  },

  // Butterfly hug (hands on opposite shoulders)
  butterflyHug: {
    ...DEFAULT_POSE,
    leftElbow: { x: 48, y: 35 },
    leftWrist: { x: 58, y: 22 },
    rightElbow: { x: 52, y: 35 },
    rightWrist: { x: 42, y: 22 }
  },

  butterflyTapLeft: {
    ...DEFAULT_POSE,
    leftElbow: { x: 50, y: 32 },
    leftWrist: { x: 58, y: 20 },
    rightElbow: { x: 52, y: 35 },
    rightWrist: { x: 42, y: 22 }
  },

  butterflyTapRight: {
    ...DEFAULT_POSE,
    leftElbow: { x: 48, y: 35 },
    leftWrist: { x: 58, y: 22 },
    rightElbow: { x: 50, y: 32 },
    rightWrist: { x: 42, y: 20 }
  },

  // Hands over eyes
  handsOnFace: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 20 },
    leftWrist: { x: 45, y: 12 },
    rightElbow: { x: 65, y: 20 },
    rightWrist: { x: 55, y: 12 }
  },

  // Hand on chest (only one hand)
  handOnChest: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 35 },
    leftWrist: { x: 48, y: 32 },
    rightElbow: { x: 60, y: 42 },
    rightWrist: { x: 52, y: 50 }
  },

  // Comfort touch - one hand on chest, one on belly (matching instructions)
  comfortTouch: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 32 },
    leftWrist: { x: 48, y: 28 },    // hand on chest
    rightElbow: { x: 62, y: 42 },
    rightWrist: { x: 52, y: 48 }     // hand on belly
  },

  // Ragdoll - forward fold standing
  ragdoll: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 55 },
    neck: { x: 50, y: 48 },
    torso: { x: 50, y: 45 },
    leftShoulder: { x: 45, y: 46 },
    rightShoulder: { x: 55, y: 46 },
    leftElbow: { x: 42, y: 58 },
    rightElbow: { x: 58, y: 58 },
    leftWrist: { x: 40, y: 70 },
    rightWrist: { x: 60, y: 70 }
  },

  // Marching - left knee up
  marchLeft: {
    ...DEFAULT_POSE,
    leftKnee: { x: 48, y: 55 },
    leftAnkle: { x: 48, y: 72 },
    leftElbow: { x: 40, y: 30 },
    rightElbow: { x: 60, y: 40 }
  },

  marchRight: {
    ...DEFAULT_POSE,
    rightKnee: { x: 52, y: 55 },
    rightAnkle: { x: 52, y: 72 },
    rightElbow: { x: 60, y: 30 },
    leftElbow: { x: 40, y: 40 }
  },

  // Calf raise - on tiptoes
  calfRaise: {
    ...DEFAULT_POSE,
    leftAnkle: { x: 43, y: 80 },
    rightAnkle: { x: 57, y: 80 },
    leftKnee: { x: 44, y: 62 },
    rightKnee: { x: 56, y: 62 },
    torso: { x: 50, y: 42 },
    neck: { x: 50, y: 17 },
    head: { x: 50, y: 9 }
  },

  // Arm swing forward
  armSwingForward: {
    ...DEFAULT_POSE,
    leftElbow: { x: 55, y: 25 },
    leftWrist: { x: 60, y: 15 },
    rightElbow: { x: 55, y: 45 },
    rightWrist: { x: 58, y: 55 }
  },

  armSwingBack: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 45 },
    leftWrist: { x: 30, y: 55 },
    rightElbow: { x: 45, y: 25 },
    rightWrist: { x: 40, y: 15 }
  },

  // Hip circles
  hipLeft: {
    ...DEFAULT_POSE,
    torso: { x: 45, y: 45 },
    leftHip: { x: 40, y: 48 },
    rightHip: { x: 50, y: 48 }
  },

  hipRight: {
    ...DEFAULT_POSE,
    torso: { x: 55, y: 45 },
    leftHip: { x: 50, y: 48 },
    rightHip: { x: 60, y: 48 }
  },

  hipForward: {
    ...DEFAULT_POSE,
    torso: { x: 50, y: 43 },
    leftHip: { x: 45, y: 46 },
    rightHip: { x: 55, y: 46 }
  },

  hipBack: {
    ...DEFAULT_POSE,
    torso: { x: 50, y: 47 },
    leftHip: { x: 45, y: 50 },
    rightHip: { x: 55, y: 50 }
  },

  // Wrist circles - hands out front
  wristsOut: {
    ...DEFAULT_POSE,
    leftElbow: { x: 40, y: 30 },
    rightElbow: { x: 60, y: 30 },
    leftWrist: { x: 38, y: 20 },
    rightWrist: { x: 62, y: 20 }
  },

  // Finger spread
  fingersSpread: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 28 },
    rightElbow: { x: 65, y: 28 },
    leftWrist: { x: 25, y: 25 },
    rightWrist: { x: 75, y: 25 }
  },

  // Fists clenched
  fistsClenched: {
    ...DEFAULT_POSE,
    leftElbow: { x: 40, y: 35 },
    rightElbow: { x: 60, y: 35 },
    leftWrist: { x: 42, y: 28 },
    rightWrist: { x: 58, y: 28 }
  },

  // Jaw/face - mouth open (head tilt back slightly)
  mouthOpen: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 10 },
    face: { showEyes: true, mouthOpen: 3 }
  },

  // Lion breath - wide mouth, tongue out, intense expression
  lionBreatheIn: {
    ...DEFAULT_POSE,
    face: { showEyes: true, smile: true }
  },

  lionRoar: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 10 },
    leftShoulder: { x: 38, y: 20 },
    rightShoulder: { x: 62, y: 20 },
    leftElbow: { x: 25, y: 25 },
    rightElbow: { x: 75, y: 25 },
    leftWrist: { x: 18, y: 32 },
    rightWrist: { x: 82, y: 32 },
    face: { showEyes: true, eyesWide: true, mouthOpen: 5, tongueOut: true }
  },

  // Face scrunch - eyes shut, face tense
  faceScrunch: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 14 },
    face: { showEyes: false, mouthOpen: 0 }
  },

  faceRelaxed: {
    ...DEFAULT_POSE,
    face: { showEyes: true, smile: true }
  },

  // Jaw release poses
  jawOpen: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 12 },
    face: { showEyes: true, mouthOpen: 4 }
  },

  jawClosed: {
    ...DEFAULT_POSE,
    face: { showEyes: true, mouthOpen: 0 }
  },

  // Sway left
  swayLeft: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 12 },
    neck: { x: 46, y: 20 },
    torso: { x: 47, y: 45 },
    leftHip: { x: 42, y: 48 },
    rightHip: { x: 52, y: 48 }
  },

  swayRight: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 12 },
    neck: { x: 54, y: 20 },
    torso: { x: 53, y: 45 },
    leftHip: { x: 48, y: 48 },
    rightHip: { x: 58, y: 48 }
  },

  // Rocking in chair - leaning forward
  rockForward: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 32 },
    neck: { x: 48, y: 38 },
    torso: { x: 45, y: 52 },
    leftShoulder: { x: 40, y: 40 },
    rightShoulder: { x: 52, y: 40 },
    leftElbow: { x: 35, y: 50 },
    rightElbow: { x: 58, y: 50 },
    leftWrist: { x: 40, y: 60 },
    rightWrist: { x: 56, y: 60 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Rocking in chair - leaning back
  rockBack: {
    ...DEFAULT_POSE,
    head: { x: 40, y: 25 },
    neck: { x: 42, y: 32 },
    torso: { x: 42, y: 50 },
    leftShoulder: { x: 34, y: 34 },
    rightShoulder: { x: 48, y: 34 },
    leftElbow: { x: 28, y: 45 },
    rightElbow: { x: 54, y: 45 },
    leftWrist: { x: 32, y: 56 },
    rightWrist: { x: 54, y: 56 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Cat-cow standing
  catStanding: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 18 },
    neck: { x: 50, y: 24 },
    torso: { x: 50, y: 48 },
    leftElbow: { x: 38, y: 42 },
    rightElbow: { x: 62, y: 42 },
    leftWrist: { x: 42, y: 52 },
    rightWrist: { x: 58, y: 52 }
  },

  cowStanding: {
    ...DEFAULT_POSE,
    head: { x: 50, y: 8 },
    neck: { x: 50, y: 18 },
    torso: { x: 50, y: 42 },
    leftElbow: { x: 35, y: 35 },
    rightElbow: { x: 65, y: 35 },
    leftWrist: { x: 38, y: 48 },
    rightWrist: { x: 62, y: 48 }
  },

  // Desk/table push-up
  tablePushUp: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 35 },
    neck: { x: 48, y: 40 },
    torso: { x: 55, y: 52 },
    leftShoulder: { x: 48, y: 42 },
    rightShoulder: { x: 62, y: 42 },
    leftElbow: { x: 58, y: 38 },
    rightElbow: { x: 75, y: 38 },
    leftWrist: { x: 68, y: 35 },
    rightWrist: { x: 85, y: 35 },
    leftHip: { x: 50, y: 55 },
    rightHip: { x: 60, y: 55 },
    leftKnee: { x: 42, y: 70 },
    rightKnee: { x: 52, y: 70 },
    leftAnkle: { x: 35, y: 85 },
    rightAnkle: { x: 45, y: 85 }
  },

  tablePushUpDown: {
    ...DEFAULT_POSE,
    head: { x: 55, y: 42 },
    neck: { x: 58, y: 45 },
    torso: { x: 62, y: 52 },
    leftShoulder: { x: 55, y: 47 },
    rightShoulder: { x: 69, y: 47 },
    leftElbow: { x: 65, y: 48 },
    rightElbow: { x: 82, y: 48 },
    leftWrist: { x: 72, y: 40 },
    rightWrist: { x: 88, y: 40 },
    leftHip: { x: 57, y: 55 },
    rightHip: { x: 67, y: 55 },
    leftKnee: { x: 48, y: 70 },
    rightKnee: { x: 58, y: 70 },
    leftAnkle: { x: 40, y: 85 },
    rightAnkle: { x: 50, y: 85 }
  },

  // Ankle circles - one foot lifted off ground, rotating ankle
  ankleCircleLeft: {
    ...DEFAULT_POSE,
    leftKnee: { x: 48, y: 60 },
    leftAnkle: { x: 52, y: 75 }    // Foot lifted forward and up
  },

  ankleCircleRight: {
    ...DEFAULT_POSE,
    rightKnee: { x: 52, y: 60 },
    rightAnkle: { x: 48, y: 75 }   // Foot lifted forward and up
  },

  // Toe taps
  toeTapLeft: {
    ...DEFAULT_POSE,
    leftAnkle: { x: 43, y: 82 }
  },

  toeTapRight: {
    ...DEFAULT_POSE,
    rightAnkle: { x: 57, y: 82 }
  },

  // Shoulder blade squeeze
  shoulderSqueeze: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 44, y: 22 },
    rightShoulder: { x: 56, y: 22 },
    leftElbow: { x: 40, y: 38 },
    rightElbow: { x: 60, y: 38 },
    leftWrist: { x: 45, y: 50 },
    rightWrist: { x: 55, y: 50 }
  },

  // Ground yourself - pressing feet down
  groundFeet: {
    ...DEFAULT_POSE,
    leftAnkle: { x: 40, y: 87 },
    rightAnkle: { x: 60, y: 87 },
    leftKnee: { x: 42, y: 68 },
    rightKnee: { x: 58, y: 68 }
  },

  // Nostril breathing - hand near nose
  nostrilLeft: {
    ...DEFAULT_POSE,
    rightElbow: { x: 55, y: 20 },
    rightWrist: { x: 48, y: 12 }
  },

  nostrilRight: {
    ...DEFAULT_POSE,
    rightElbow: { x: 58, y: 20 },
    rightWrist: { x: 52, y: 12 }
  },

  // === Additional poses for external exercises ===

  // Wrist stretches
  wristUp: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 38 },
    rightElbow: { x: 65, y: 38 },
    leftWrist: { x: 30, y: 35 },
    rightWrist: { x: 70, y: 35 }
  },

  wristDown: {
    ...DEFAULT_POSE,
    leftElbow: { x: 35, y: 38 },
    rightElbow: { x: 65, y: 38 },
    leftWrist: { x: 30, y: 45 },
    rightWrist: { x: 70, y: 45 }
  },

  // Hands on head (scalp massage)
  handsOnHead: {
    ...DEFAULT_POSE,
    leftElbow: { x: 30, y: 25 },
    rightElbow: { x: 70, y: 25 },
    leftWrist: { x: 42, y: 10 },
    rightWrist: { x: 58, y: 10 }
  },

  // Hands on ears
  handsOnEars: {
    ...DEFAULT_POSE,
    leftElbow: { x: 28, y: 22 },
    rightElbow: { x: 72, y: 22 },
    leftWrist: { x: 38, y: 12 },
    rightWrist: { x: 62, y: 12 }
  },

  // Cross-body taps - tapping left hand to right knee
  crossBodyTapLeft: {
    ...DEFAULT_POSE,
    leftElbow: { x: 52, y: 45 },
    leftWrist: { x: 58, y: 60 },
    rightElbow: { x: 75, y: 40 },
    rightWrist: { x: 80, y: 45 }
  },

  // Cross-body taps - tapping right hand to left knee
  crossBodyTapRight: {
    ...DEFAULT_POSE,
    rightElbow: { x: 48, y: 45 },
    rightWrist: { x: 42, y: 60 },
    leftElbow: { x: 25, y: 40 },
    leftWrist: { x: 20, y: 45 }
  },

  // Hand massage - one hand holding/massaging the other
  handMassage: {
    ...DEFAULT_POSE,
    leftElbow: { x: 40, y: 42 },
    rightElbow: { x: 60, y: 42 },
    leftWrist: { x: 48, y: 48 },
    rightWrist: { x: 52, y: 48 }
  },

  // Seated arch (cat-cow on chair - arching back)
  seatedArch: {
    ...DEFAULT_POSE,
    hips: { x: 42, y: 58 },
    leftKnee: { x: 38, y: 70 },
    rightKnee: { x: 58, y: 70 },
    leftAnkle: { x: 35, y: 85 },
    rightAnkle: { x: 55, y: 85 },
    head: { x: 50, y: 10 }, // looking up
    leftShoulder: { x: 38, y: 26 },
    rightShoulder: { x: 62, y: 26 }
  },

  // Seated curl (cat-cow on chair - rounding back)
  seatedCurl: {
    ...DEFAULT_POSE,
    hips: { x: 42, y: 58 },
    leftKnee: { x: 38, y: 70 },
    rightKnee: { x: 58, y: 70 },
    leftAnkle: { x: 35, y: 85 },
    rightAnkle: { x: 55, y: 85 },
    head: { x: 50, y: 18 }, // chin tucked
    leftShoulder: { x: 42, y: 30 },
    rightShoulder: { x: 58, y: 30 }
  },

  // Seated breathing poses
  seatedBreatheIn: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 26 }, // lifted slightly
    neck: { x: 45, y: 33 },
    torso: { x: 43, y: 50 },
    leftShoulder: { x: 34, y: 35 }, // shoulders back
    rightShoulder: { x: 52, y: 35 },
    leftElbow: { x: 28, y: 46 },
    rightElbow: { x: 58, y: 46 },
    leftWrist: { x: 33, y: 56 },
    rightWrist: { x: 57, y: 56 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  seatedBreatheOut: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 30 }, // relaxed down
    neck: { x: 45, y: 37 },
    torso: { x: 43, y: 54 },
    leftShoulder: { x: 38, y: 39 }, // shoulders forward
    rightShoulder: { x: 48, y: 39 },
    leftElbow: { x: 32, y: 50 },
    rightElbow: { x: 54, y: 50 },
    leftWrist: { x: 37, y: 60 },
    rightWrist: { x: 53, y: 60 },
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Seated with hands on chest for breathing exercises
  seatedComfortTouch: {
    ...DEFAULT_POSE,
    head: { x: 45, y: 28 },
    neck: { x: 45, y: 35 },
    torso: { x: 43, y: 52 },
    leftShoulder: { x: 36, y: 37 },
    rightShoulder: { x: 50, y: 37 },
    leftElbow: { x: 35, y: 42 },
    rightElbow: { x: 52, y: 50 },
    leftWrist: { x: 42, y: 38 }, // hand on chest
    rightWrist: { x: 46, y: 52 }, // hand on belly
    leftHip: { x: 38, y: 58 },
    rightHip: { x: 50, y: 58 },
    leftKnee: { x: 50, y: 70 },
    rightKnee: { x: 62, y: 70 },
    leftAnkle: { x: 50, y: 85 },
    rightAnkle: { x: 62, y: 85 }
  },

  // Knee to chest (right leg) - seated
  kneeToChestRight: {
    ...DEFAULT_POSE,
    hips: { x: 42, y: 58 },
    leftKnee: { x: 38, y: 70 },
    leftAnkle: { x: 35, y: 85 },
    rightKnee: { x: 55, y: 48 }, // knee lifted
    rightAnkle: { x: 52, y: 55 }, // foot up
    leftElbow: { x: 30, y: 40 },
    leftWrist: { x: 45, y: 50 }, // hands around knee
    rightElbow: { x: 70, y: 40 },
    rightWrist: { x: 55, y: 50 }
  },

  // Shoulder blade squeeze
  shoulderBladesSqueeze: {
    ...DEFAULT_POSE,
    leftShoulder: { x: 35, y: 25 },
    rightShoulder: { x: 65, y: 25 },
    leftElbow: { x: 28, y: 42 },
    rightElbow: { x: 72, y: 42 },
    leftWrist: { x: 30, y: 50 },
    rightWrist: { x: 70, y: 50 }
  }
};

/**
 * Exercise animation definitions - keyed by exercise ID
 * Each has: keyframes array and optional props
 */
export const EXERCISE_ANIMATIONS = {
  // === QUICK ===
  'shoulder-drops': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.shouldersUp, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'wall-lean': {
    props: ['wall'],
    keyframes: [
      { pose: POSES.wallLean, duration: 600 },
      { pose: POSES.wallLeanDeep, duration: 800 },
      { pose: POSES.wallLean, duration: 600 }
    ]
  },

  'ankle-circles': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.ankleCircleLeft, duration: 1200 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.ankleCircleRight, duration: 1200 }
    ]
  },

  'neck-release': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.headDown, duration: 600 },
      { pose: POSES.headRight, duration: 800 },
      { pose: POSES.headDown, duration: 400 },
      { pose: POSES.headLeft, duration: 800 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'wrist-circles': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.wristsOut, duration: 1500 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'standing-sway': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.swayLeft, duration: 800 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.swayRight, duration: 800 }
    ]
  },

  'finger-stretch': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.fingersSpread, duration: 800 },
      { pose: POSES.fistsClenched, duration: 600 },
      { pose: POSES.fingersSpread, duration: 800 }
    ]
  },

  // === BACK ===
  'cat-cow-standing': {
    keyframes: [
      { pose: POSES.handsOnHips, duration: 400 },
      { pose: POSES.catStanding, duration: 1000 },
      { pose: POSES.cowStanding, duration: 1000 },
      { pose: POSES.handsOnHips, duration: 400 }
    ]
  },

  'hip-circles': {
    keyframes: [
      { pose: POSES.handsOnHips, duration: 300 },
      { pose: POSES.hipLeft, duration: 500 },
      { pose: POSES.hipForward, duration: 500 },
      { pose: POSES.hipRight, duration: 500 },
      { pose: POSES.hipBack, duration: 500 },
      { pose: POSES.handsOnHips, duration: 300 }
    ]
  },

  'doorframe-stretch': {
    props: ['doorframe'],
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.doorframeStretch, duration: 2000 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'seated-twist': {
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedTwistLeft, duration: 1200 },
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedTwistRight, duration: 1200 }
    ]
  },

  'knee-to-chest': {
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedKneeUp, duration: 1200 },
      { pose: POSES.seated, duration: 400 }
    ]
  },

  'shoulder-blade-squeeze': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.shoulderSqueeze, duration: 1000 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'pelvic-tilt': {
    props: ['wall'],
    keyframes: [
      { pose: POSES.wallBack, duration: 400 },
      { pose: { ...POSES.wallBack, torso: { x: 78, y: 45 } }, duration: 800 },
      { pose: POSES.wallBack, duration: 600 }
    ]
  },

  // === ENERGY ===
  'march-in-place': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.marchLeft, duration: 400 },
      { pose: POSES.standing, duration: 200 },
      { pose: POSES.marchRight, duration: 400 },
      { pose: POSES.standing, duration: 200 }
    ]
  },

  'arm-swings': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.armSwingForward, duration: 500 },
      { pose: POSES.armSwingBack, duration: 500 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'calf-raises': {
    props: ['wall'],
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.calfRaise, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'gentle-squats': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.squat, duration: 800 },
      { pose: POSES.standing, duration: 500 }
    ]
  },

  'toe-taps': {
    keyframes: [
      { pose: POSES.standing, duration: 150 },
      { pose: POSES.toeTapLeft, duration: 200 },
      { pose: POSES.standing, duration: 150 },
      { pose: POSES.toeTapRight, duration: 200 }
    ]
  },

  'side-reaches': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.rightArmUp, duration: 300 },
      { pose: POSES.sideBendLeft, duration: 1000 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.leftArmUp, duration: 300 },
      { pose: POSES.sideBendRight, duration: 1000 }
    ]
  },

  'desk-push-ups': {
    props: ['table'],
    keyframes: [
      { pose: POSES.tablePushUp, duration: 500 },
      { pose: POSES.tablePushUpDown, duration: 700 },
      { pose: POSES.tablePushUp, duration: 500 }
    ]
  },

  // === TENSION ===
  'shake-it-out': {
    keyframes: [
      { pose: POSES.standing, duration: 200 },
      { pose: POSES.swayLeft, duration: 200 },
      { pose: POSES.swayRight, duration: 200 },
      { pose: POSES.swayLeft, duration: 150 },
      { pose: POSES.swayRight, duration: 150 }
    ]
  },

  'jaw-release': {
    keyframes: [
      { pose: POSES.jawClosed, duration: 400 },
      { pose: POSES.jawOpen, duration: 800 },
      { pose: { ...POSES.headLeft, face: { showEyes: true, mouthOpen: 3 } }, duration: 600 },
      { pose: { ...POSES.headRight, face: { showEyes: true, mouthOpen: 3 } }, duration: 600 },
      { pose: POSES.jawClosed, duration: 400 }
    ]
  },

  'fist-clench-release': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.fistsClenched, duration: 800 },
      { pose: POSES.fingersSpread, duration: 600 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'ragdoll': {
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.ragdoll, duration: 1500 },
      { pose: POSES.standing, duration: 800 }
    ]
  },

  'face-scrunch': {
    keyframes: [
      { pose: POSES.faceRelaxed, duration: 400 },
      { pose: POSES.faceScrunch, duration: 1000 },
      { pose: POSES.faceRelaxed, duration: 600 }
    ]
  },

  'lion-breath': {
    keyframes: [
      { pose: POSES.lionBreatheIn, duration: 400 },
      { pose: { ...POSES.breatheIn, face: { showEyes: true, smile: true } }, duration: 1000 },
      { pose: POSES.lionRoar, duration: 1200 },
      { pose: POSES.lionBreatheIn, duration: 500 }
    ]
  },

  'body-scan-squeeze': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.fistsClenched, duration: 600 },
      { pose: POSES.shouldersUp, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  // === SAD ===
  'self-hug': {
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.selfHug, duration: 2000 },
      { pose: POSES.standing, duration: 500 }
    ]
  },

  'butterfly-hug': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.butterflyHug, duration: 400 },
      { pose: POSES.butterflyTapLeft, duration: 400 },
      { pose: POSES.butterflyTapRight, duration: 400 },
      { pose: POSES.butterflyTapLeft, duration: 400 },
      { pose: POSES.butterflyTapRight, duration: 400 }
    ]
  },

  'ground-yourself': {
    props: ['floor'],
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.groundFeet, duration: 1500 },
      { pose: POSES.standing, duration: 500 }
    ]
  },

  'warm-hands': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.wristsOut, duration: 800 },
      { pose: POSES.handsOnFace, duration: 1200 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'comfort-touch': {
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.comfortTouch, duration: 2500 },
      { pose: POSES.standing, duration: 500 }
    ]
  },

  'gentle-rocking': {
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.rockForward, duration: 800 },
      { pose: POSES.rockBack, duration: 800 }
    ]
  },

  // === BREAK (5 min) ===
  'full-body-stretch': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.headLeft, duration: 600 },
      { pose: POSES.headRight, duration: 600 },
      { pose: POSES.shouldersUp, duration: 500 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.armsOut, duration: 600 },
      { pose: POSES.sideBendLeft, duration: 600 },
      { pose: POSES.sideBendRight, duration: 600 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'chair-yoga': {
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedArmsUp, duration: 800 },
      { pose: POSES.seatedTwistLeft, duration: 800 },
      { pose: POSES.seatedTwistRight, duration: 800 },
      { pose: POSES.seatedFold, duration: 800 },
      { pose: POSES.seated, duration: 400 }
    ]
  },

  'standing-flow': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.armsUp, duration: 600 },
      { pose: POSES.ragdoll, duration: 800 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.twistLeft, duration: 600 },
      { pose: POSES.twistRight, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  'mindful-walk': {
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.marchLeft, duration: 700 },
      { pose: POSES.marchRight, duration: 700 },
      { pose: POSES.standing, duration: 500 }
    ]
  },

  'gentle-dance': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.swayLeft, duration: 500 },
      { pose: POSES.swayRight, duration: 500 },
      { pose: POSES.hipLeft, duration: 400 },
      { pose: POSES.hipRight, duration: 400 },
      { pose: POSES.armsOut, duration: 600 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  // === BREATHE ===
  'box-breathing': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.breatheIn, duration: 1500 },
      { pose: POSES.breatheIn, duration: 1500 },
      { pose: POSES.breatheOut, duration: 1500 },
      { pose: POSES.breatheOut, duration: 1500 }
    ]
  },

  'long-exhale': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.breatheIn, duration: 1200 },
      { pose: POSES.breatheOut, duration: 2400 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  'belly-breathing': {
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.handOnChest, duration: 400 },
      { pose: { ...POSES.handOnChest, ...POSES.breatheIn }, duration: 1500 },
      { pose: POSES.handOnChest, duration: 1500 }
    ]
  },

  'sigh-it-out': {
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.breatheIn, face: { showEyes: true } }, duration: 1000 },
      { pose: { ...POSES.breatheOut, head: { x: 50, y: 14 }, face: { showEyes: true, mouthOpen: 2 } }, duration: 1200 },
      { pose: { ...POSES.standing, face: { showEyes: true, smile: true } }, duration: 400 }
    ]
  },

  '4-7-8-breathing': {
    keyframes: [
      { pose: POSES.standing, duration: 200 },
      { pose: POSES.breatheIn, duration: 1400 },
      { pose: POSES.breatheIn, duration: 2450 },
      { pose: POSES.breatheOut, duration: 2800 },
      { pose: POSES.standing, duration: 200 }
    ]
  },

  'counting-breaths': {
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.breatheIn, duration: 1500 },
      { pose: POSES.breatheOut, duration: 1500 }
    ]
  },

  'ocean-breath': {
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.breatheIn, face: { showEyes: true } }, duration: 1500 },
      { pose: { ...POSES.breatheOut, head: { x: 50, y: 14 }, face: { showEyes: true, mouthOpen: 1 } }, duration: 1800 },
      { pose: { ...POSES.standing, face: { showEyes: true, smile: true } }, duration: 400 }
    ]
  },

  'nostril-breathing': {
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.nostrilLeft, duration: 1200 },
      { pose: POSES.nostrilRight, duration: 1200 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  // === EXTERNAL EXERCISES (ex-new-XXX) ===
  // Quick exercises
  'ex-new-001': { // Gentle Hand Squeeze
    keyframes: [
      { pose: POSES.wristsOut, duration: 400 },
      { pose: POSES.fistsClenched, duration: 800 },
      { pose: POSES.fingersSpread, duration: 600 },
      { pose: POSES.fistsClenched, duration: 600 },
      { pose: POSES.fingersSpread, duration: 500 }
    ]
  },
  'ex-new-002': { // Shoulder Drop
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.shouldersUp, duration: 600 },
      { pose: POSES.standing, duration: 500 }
    ]
  },
  'ex-new-003': { // Ankle Circles
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.ankleCircleLeft, duration: 800 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.ankleCircleRight, duration: 800 },
      { pose: POSES.standing, duration: 300 }
    ]
  },
  'ex-new-004': { // Jaw Release
    keyframes: [
      { pose: POSES.jawClosed, duration: 400 },
      { pose: POSES.jawOpen, duration: 800 },
      { pose: { ...POSES.headLeft, face: { showEyes: true, mouthOpen: 2 } }, duration: 500 },
      { pose: { ...POSES.headRight, face: { showEyes: true, mouthOpen: 2 } }, duration: 500 },
      { pose: POSES.jawClosed, duration: 400 }
    ]
  },
  'ex-new-005': { // Wrist Loosener
    keyframes: [
      { pose: POSES.wristsOut, duration: 400 },
      { pose: POSES.wristUp, duration: 800 },
      { pose: POSES.wristDown, duration: 800 },
      { pose: POSES.wristsOut, duration: 400 }
    ]
  },
  'ex-new-006': { // Eye Rest
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.wristsOut, duration: 500 },
      { pose: POSES.handsOnFace, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-007': { // Toe Scrunch
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.toeTapLeft, duration: 400 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.toeTapRight, duration: 400 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  // Back exercises
  'ex-new-008': { // Seated Cat-Cow
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedArch, duration: 800 },
      { pose: POSES.seatedCurl, duration: 800 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-009': { // Gentle Seated Twist
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedTwistLeft, duration: 1000 },
      { pose: POSES.seated, duration: 300 },
      { pose: POSES.seatedTwistRight, duration: 1000 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-010': { // Standing Forward Fold
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.armsUp, duration: 600 },
      { pose: POSES.ragdoll, duration: 1200 },
      { pose: POSES.standing, duration: 600 }
    ]
  },
  'ex-new-011': { // Knee-to-Chest Hug
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.kneeToChest, duration: 1200 },
      { pose: POSES.seated, duration: 300 },
      { pose: POSES.kneeToChestRight, duration: 1200 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-012': { // Shoulder Blade Squeeze
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.shoulderBladesSqueeze, duration: 1000 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-013': { // Pelvic Tilt
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedArch, duration: 700 },
      { pose: POSES.seatedCurl, duration: 700 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-014': { // Side Reach Stretch
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.rightArmUp, duration: 400 },
      { pose: POSES.sideBendLeft, duration: 1000 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.leftArmUp, duration: 400 },
      { pose: POSES.sideBendRight, duration: 1000 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  // Energy exercises
  'ex-new-015': { // Finger Tap Wake-Up
    keyframes: [
      { pose: POSES.wristsOut, duration: 300 },
      { pose: POSES.fingersSpread, duration: 200 },
      { pose: POSES.fistsClenched, duration: 200 },
      { pose: POSES.fingersSpread, duration: 200 },
      { pose: POSES.fistsClenched, duration: 200 },
      { pose: POSES.fingersSpread, duration: 300 }
    ]
  },
  'ex-new-016': { // Big Yawn Stretch
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.armsUp, face: { showEyes: true, mouthOpen: 4 } }, duration: 1200 },
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 400 }
    ]
  },
  'ex-new-017': { // March in Place
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.marchLeft, duration: 400 },
      { pose: POSES.marchRight, duration: 400 },
      { pose: POSES.marchLeft, duration: 400 },
      { pose: POSES.marchRight, duration: 400 },
      { pose: POSES.standing, duration: 300 }
    ]
  },
  'ex-new-018': { // Scalp Massage
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.handsOnHead, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-019': { // Sunrise Arms
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.armsOut, duration: 600 },
      { pose: POSES.armsUp, duration: 800 },
      { pose: POSES.armsOut, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-020': { // Calf Raises
    props: ['chair'],
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.calfRaise, duration: 600 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.calfRaise, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-021': { // Face Scrunch and Release
    keyframes: [
      { pose: POSES.faceRelaxed, duration: 400 },
      { pose: POSES.faceScrunch, duration: 800 },
      { pose: POSES.faceRelaxed, duration: 500 },
      { pose: { ...POSES.standing, face: { showEyes: true, smile: true } }, duration: 500 }
    ]
  },
  'ex-new-022': { // Cross-Body Taps
    keyframes: [
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.crossBodyTapLeft, duration: 400 },
      { pose: POSES.crossBodyTapRight, duration: 400 },
      { pose: POSES.crossBodyTapLeft, duration: 400 },
      { pose: POSES.crossBodyTapRight, duration: 400 },
      { pose: POSES.standing, duration: 300 }
    ]
  },

  // Tension exercises
  'ex-new-023': { // Neck Release
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.headRight, duration: 1000 },
      { pose: POSES.standing, duration: 300 },
      { pose: POSES.headLeft, duration: 1000 },
      { pose: POSES.neckForward, duration: 800 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-024': { // Progressive Fist Clench
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.fistsClenched, duration: 800 },
      { pose: POSES.standing, duration: 400 },
      { pose: { ...POSES.fistsClenched, ...POSES.shouldersUp }, duration: 800 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-025': { // Ear Pull
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.handsOnEars, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-026': { // Butterfly Hug
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.butterflyHug, duration: 400 },
      { pose: POSES.butterflyTapLeft, duration: 400 },
      { pose: POSES.butterflyTapRight, duration: 400 },
      { pose: POSES.butterflyTapLeft, duration: 400 },
      { pose: POSES.butterflyTapRight, duration: 400 }
    ]
  },
  'ex-new-027': { // Hand Massage
    keyframes: [
      { pose: POSES.wristsOut, duration: 400 },
      { pose: POSES.handMassage, duration: 1500 },
      { pose: POSES.wristsOut, duration: 400 }
    ]
  },
  'ex-new-028': { // Whole Body Squeeze
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: { ...POSES.fistsClenched, ...POSES.shouldersUp }, duration: 1000 },
      { pose: POSES.standing, duration: 600 }
    ]
  },
  'ex-new-029': { // Tongue and Jaw Release
    keyframes: [
      { pose: POSES.jawClosed, duration: 400 },
      { pose: POSES.jawOpen, duration: 800 },
      { pose: { ...POSES.headLeft, face: { showEyes: true, mouthOpen: 3 } }, duration: 600 },
      { pose: { ...POSES.headRight, face: { showEyes: true, mouthOpen: 3 } }, duration: 600 },
      { pose: POSES.jawClosed, duration: 400 }
    ]
  },

  // Sad exercises
  'ex-new-030': { // Self-Hug
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.selfHug, duration: 2000 },
      { pose: POSES.standing, duration: 500 }
    ]
  },
  'ex-new-031': { // Warm Hands on Heart
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.wristsOut, duration: 600 },
      { pose: POSES.handOnChest, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-032': { // Grounding Touch
    props: ['floor'],
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.groundFeet, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-033': { // Gentle Rocking
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.rockForward, duration: 800 },
      { pose: POSES.rockBack, duration: 800 }
    ]
  },
  'ex-new-034': { // Kind Hands
    keyframes: [
      { pose: POSES.wristsOut, duration: 400 },
      { pose: POSES.handMassage, duration: 1800 },
      { pose: POSES.wristsOut, duration: 400 }
    ]
  },
  'ex-new-035': { // Comfort Breathing
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.comfortTouch, duration: 500 },
      { pose: { ...POSES.comfortTouch, ...POSES.breatheIn }, duration: 1200 },
      { pose: POSES.comfortTouch, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-036': { // Warm Face Hold
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.wristsOut, duration: 600 },
      { pose: POSES.handsOnFace, duration: 1500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  // Break (5 min) exercises
  'ex-new-037': { // Five-Minute Full Reset
    keyframes: [
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.breatheIn, duration: 800 },
      { pose: POSES.breatheOut, duration: 800 },
      { pose: POSES.headLeft, duration: 500 },
      { pose: POSES.headRight, duration: 500 },
      { pose: POSES.armsUp, duration: 600 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-038': { // Body Scan
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 600 },
      { pose: { ...POSES.standing, head: { x: 50, y: 12 }, face: { showEyes: true } }, duration: 800 },
      { pose: POSES.shouldersUp, duration: 600 },
      { pose: POSES.standing, duration: 500 },
      { pose: POSES.groundFeet, duration: 800 },
      { pose: POSES.standing, duration: 500 }
    ]
  },
  'ex-new-039': { // Seated Yoga Flow
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedArmsUp, duration: 700 },
      { pose: POSES.seatedFold, duration: 700 },
      { pose: POSES.seatedArch, duration: 600 },
      { pose: POSES.seatedCurl, duration: 600 },
      { pose: POSES.seatedTwistLeft, duration: 600 },
      { pose: POSES.seatedTwistRight, duration: 600 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-040': { // Mindful Senses
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 600 },
      { pose: { ...POSES.headLeft, face: { showEyes: true } }, duration: 700 },
      { pose: { ...POSES.headRight, face: { showEyes: true } }, duration: 700 },
      { pose: POSES.standing, duration: 500 }
    ]
  },
  'ex-new-041': { // Gentle Standing Sequence
    keyframes: [
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.armsUp, duration: 800 },
      { pose: POSES.ragdoll, duration: 800 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.calfRaise, duration: 500 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.hipLeft, duration: 400 },
      { pose: POSES.hipRight, duration: 400 },
      { pose: POSES.standing, duration: 400 }
    ]
  },
  'ex-new-042': { // Compassion Pause - "sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 500 },
      { pose: POSES.seatedComfortTouch, duration: 1000 },
      { pose: { ...POSES.seatedComfortTouch, ...POSES.seatedBreatheIn }, duration: 800 },
      { pose: POSES.seatedComfortTouch, duration: 800 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-043': { // Stretch and Breathe Flow
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedArmsUp, duration: 800 },
      { pose: POSES.seated, duration: 300 },
      { pose: POSES.headLeft, duration: 500 },
      { pose: POSES.headRight, duration: 500 },
      { pose: POSES.standing, duration: 400 },
      { pose: POSES.armsOut, duration: 500 },
      { pose: POSES.shouldersUp, duration: 500 },
      { pose: POSES.standing, duration: 400 }
    ]
  },

  // Breathe exercises - all seated as per instructions
  'ex-new-044': { // Box Breathing - "Sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 300 },
      { pose: POSES.seatedBreatheIn, duration: 1500 },
      { pose: POSES.seatedBreatheIn, duration: 1500 },
      { pose: POSES.seatedBreatheOut, duration: 1500 },
      { pose: POSES.seatedBreatheOut, duration: 1500 }
    ]
  },
  'ex-new-045': { // Extended Exhale - "Sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 300 },
      { pose: POSES.seatedBreatheIn, duration: 1000 },
      { pose: POSES.seatedBreatheOut, duration: 2000 },
      { pose: POSES.seated, duration: 300 }
    ]
  },
  'ex-new-046': { // Bee Breath - "Sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: { ...POSES.seated, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.seatedBreatheIn, face: { showEyes: true } }, duration: 1000 },
      { pose: { ...POSES.seatedBreatheOut, face: { showEyes: true, mouthOpen: 1 } }, duration: 1500 },
      { pose: { ...POSES.seated, face: { showEyes: true } }, duration: 400 }
    ]
  },
  'ex-new-047': { // Counting Breath - "Sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 500 },
      { pose: POSES.seatedBreatheIn, duration: 1500 },
      { pose: POSES.seatedBreatheOut, duration: 1500 }
    ]
  },
  'ex-new-048': { // Balloon Breath - hands on belly, seated
    props: ['chair'],
    keyframes: [
      { pose: POSES.seated, duration: 400 },
      { pose: POSES.seatedComfortTouch, duration: 400 },
      { pose: { ...POSES.seatedComfortTouch, ...POSES.seatedBreatheIn }, duration: 1500 },
      { pose: POSES.seatedComfortTouch, duration: 1500 },
      { pose: POSES.seated, duration: 400 }
    ]
  },
  'ex-new-049': { // Cooling Breath - "Sit comfortably"
    props: ['chair'],
    keyframes: [
      { pose: { ...POSES.seated, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.seatedBreatheIn, face: { showEyes: true, mouthOpen: 1 } }, duration: 1500 },
      { pose: { ...POSES.seatedBreatheOut, face: { showEyes: true } }, duration: 1200 },
      { pose: { ...POSES.seated, face: { showEyes: true } }, duration: 400 }
    ]
  },
  'ex-new-050': { // Sigh It Out - standing is fine for this one (more dramatic)
    keyframes: [
      { pose: { ...POSES.standing, face: { showEyes: true } }, duration: 400 },
      { pose: { ...POSES.breatheIn, face: { showEyes: true } }, duration: 1000 },
      { pose: { ...POSES.breatheOut, head: { x: 50, y: 14 }, face: { showEyes: true, mouthOpen: 3 } }, duration: 1200 },
      { pose: { ...POSES.standing, face: { showEyes: true, smile: true } }, duration: 400 }
    ]
  }
};

/**
 * Get animation for an exercise
 */
export function getAnimationForExercise(exercise) {
  const anim = EXERCISE_ANIMATIONS[exercise.id];

  if (anim) {
    return {
      keyframes: anim.keyframes.map(kf => ({
        pose: kf.pose,
        duration: kf.duration
      })),
      props: anim.props || null
    };
  }

  // Fallback based on category
  if (exercise.category === 'breathe') {
    return {
      keyframes: [
        { pose: POSES.standing, duration: 400 },
        { pose: POSES.breatheIn, duration: 1500 },
        { pose: POSES.breatheOut, duration: 1800 },
        { pose: POSES.standing, duration: 400 }
      ],
      props: null
    };
  }

  // Default gentle movement
  return {
    keyframes: [
      { pose: POSES.standing, duration: 600 },
      { pose: POSES.breatheIn, duration: 1000 },
      { pose: POSES.breatheOut, duration: 1200 },
      { pose: POSES.standing, duration: 600 }
    ],
    props: null
  };
}

/**
 * Creates and starts an animated stick figure for an exercise
 */
export function createExerciseAnimation(exercise) {
  const container = document.createElement('div');
  container.className = 'stick-figure-container';

  const { keyframes, props } = getAnimationForExercise(exercise);

  const svg = createStickFigure(120, 120, props);
  container.appendChild(svg);

  const animator = new StickFigureAnimator(svg, keyframes);

  // Initialize with first pose
  updateStickFigure(svg, keyframes[0].pose);

  // Start animation
  animator.play();

  return { container, animator, svg };
}
