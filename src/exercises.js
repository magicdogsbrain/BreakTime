/**
 * Exercise library
 * 
 * Design principles:
 * - Maximum 90 seconds each
 * - Based on how she FEELS, not what she's doing
 * - Can be stopped instantly with no "failure"
 * - No equipment needed
 * - Quiet (no jumping, no noise)
 * - Can be done in any room
 */

export const EXERCISE_CATEGORIES = {
  quick: {
    label: "I have 60 seconds",
    icon: "⏱️",
    description: "Something quick"
  },
  back: {
    label: "My back hurts",
    icon: "🔙",
    description: "Gentle relief"
  },
  energy: {
    label: "I need to feel something",
    icon: "⚡",
    description: "Wake up your body"
  },
  tension: {
    label: "I'm wound up tight",
    icon: "😤",
    description: "Release the tension"
  },
  sad: {
    label: "I feel like crying",
    icon: "💧",
    description: "It's okay. Let's breathe."
  },
  break: {
    label: "I have 5 minutes",
    icon: "☕",
    description: "A proper pause"
  },
  breathe: {
    label: "Just let me breathe",
    icon: "🌬️",
    description: "Nothing else"
  }
};

export const EXERCISES = [
  // === QUICK (60 seconds) ===
  {
    id: 'shoulder-drops',
    category: 'quick',
    name: 'Shoulder Drops',
    duration: 45,
    steps: [
      'Lift your shoulders up to your ears',
      'Hold for 3 seconds',
      'Let them drop heavily',
      'Feel the release',
      'Repeat 5 times'
    ]
  },
  {
    id: 'wall-lean',
    category: 'quick',
    name: 'Wall Lean',
    duration: 60,
    steps: [
      'Stand facing a wall, arm\'s length away',
      'Place palms flat on the wall',
      'Lean in slowly, bending elbows',
      'Push back out',
      'Repeat 10 times'
    ]
  },
  {
    id: 'ankle-circles',
    category: 'quick',
    name: 'Ankle Circles',
    duration: 45,
    steps: [
      'Lift one foot slightly off the ground',
      'Rotate your ankle in slow circles',
      '10 circles one way',
      '10 circles the other way',
      'Switch feet'
    ]
  },
  {
    id: 'neck-release',
    category: 'quick',
    name: 'Neck Release',
    duration: 60,
    steps: [
      'Drop your chin to your chest',
      'Slowly roll your head to the right',
      'Hold for a breath',
      'Roll to the left',
      'Hold for a breath',
      'Repeat 3 times'
    ]
  },
  {
    id: 'wrist-circles',
    category: 'quick',
    name: 'Wrist Circles',
    duration: 45,
    steps: [
      'Hold your hands out in front of you',
      'Make slow circles with your wrists',
      '10 circles one way',
      '10 circles the other',
      'Shake your hands out gently'
    ]
  },
  {
    id: 'standing-sway',
    category: 'quick',
    name: 'Standing Sway',
    duration: 45,
    steps: [
      'Stand with feet hip-width apart',
      'Gently sway side to side',
      'Let your arms hang loose',
      'Like a tree in a breeze',
      'Keep going for 30 seconds'
    ]
  },
  {
    id: 'finger-stretch',
    category: 'quick',
    name: 'Finger Stretch',
    duration: 45,
    steps: [
      'Spread your fingers as wide as you can',
      'Hold for 5 seconds',
      'Make a fist',
      'Hold for 5 seconds',
      'Repeat 5 times'
    ]
  },

  // === BACK PAIN ===
  {
    id: 'cat-cow-standing',
    category: 'back',
    name: 'Standing Cat-Cow',
    duration: 60,
    steps: [
      'Stand with hands on thighs',
      'Round your back like an angry cat',
      'Tuck your chin',
      'Then arch your back, looking up',
      'Move slowly between positions',
      'Repeat 8 times'
    ]
  },
  {
    id: 'hip-circles',
    category: 'back',
    name: 'Hip Circles',
    duration: 45,
    steps: [
      'Stand with feet hip-width apart',
      'Place hands on hips',
      'Make big slow circles with your hips',
      '5 circles one direction',
      '5 circles the other'
    ]
  },
  {
    id: 'doorframe-stretch',
    category: 'back',
    name: 'Doorframe Stretch',
    duration: 60,
    steps: [
      'Stand in a doorway',
      'Place forearms on each side of the frame',
      'Step one foot forward',
      'Lean gently through the door',
      'Feel your chest open',
      'Hold for 30 seconds'
    ]
  },
  {
    id: 'seated-twist',
    category: 'back',
    name: 'Seated Twist',
    duration: 60,
    steps: [
      'Sit on a chair, feet flat',
      'Place right hand on left knee',
      'Twist gently to the left',
      'Look over your left shoulder',
      'Hold for 5 breaths',
      'Switch sides'
    ]
  },
  {
    id: 'knee-to-chest',
    category: 'back',
    name: 'Knee to Chest',
    duration: 60,
    steps: [
      'Sit on a chair with back support',
      'Lift one knee towards your chest',
      'Hold it gently with both hands',
      'Feel the stretch in your lower back',
      'Hold for 15 seconds',
      'Switch legs'
    ]
  },
  {
    id: 'shoulder-blade-squeeze',
    category: 'back',
    name: 'Shoulder Blade Squeeze',
    duration: 45,
    steps: [
      'Sit or stand tall',
      'Squeeze your shoulder blades together',
      'Like you\'re holding a pencil between them',
      'Hold for 5 seconds',
      'Release and repeat 10 times'
    ]
  },
  {
    id: 'pelvic-tilt',
    category: 'back',
    name: 'Pelvic Tilt',
    duration: 60,
    steps: [
      'Stand with your back against a wall',
      'Gently press your lower back into the wall',
      'Hold for 5 seconds',
      'Release and arch slightly away',
      'Repeat 10 times',
      'This eases lower back tension'
    ]
  },

  // === NEED ENERGY ===
  {
    id: 'march-in-place',
    category: 'energy',
    name: 'March in Place',
    duration: 60,
    steps: [
      'Stand tall',
      'March on the spot',
      'Lift your knees',
      'Swing your arms',
      'Keep going for 60 seconds',
      'You\'re waking up your whole body'
    ]
  },
  {
    id: 'arm-swings',
    category: 'energy',
    name: 'Arm Swings',
    duration: 45,
    steps: [
      'Stand with feet apart',
      'Swing both arms forward and up',
      'Then let them swing back',
      'Build up some momentum',
      'Feel the blood flowing'
    ]
  },
  {
    id: 'calf-raises',
    category: 'energy',
    name: 'Calf Raises',
    duration: 60,
    steps: [
      'Stand near a wall for balance',
      'Rise up onto your toes',
      'Hold for 2 seconds',
      'Lower slowly',
      'Repeat 15 times'
    ]
  },
  {
    id: 'gentle-squats',
    category: 'energy',
    name: 'Gentle Squats',
    duration: 60,
    steps: [
      'Stand with feet shoulder-width apart',
      'Lower like sitting into a chair',
      'Only go as low as comfortable',
      'Stand back up',
      'Repeat 10 times'
    ]
  },
  {
    id: 'toe-taps',
    category: 'energy',
    name: 'Toe Taps',
    duration: 45,
    steps: [
      'Stand or sit comfortably',
      'Tap your toes quickly on the floor',
      'Like you\'re keeping time to music',
      'Speed up for 15 seconds',
      'Slow down for 15 seconds',
      'Feel the energy in your legs'
    ]
  },
  {
    id: 'side-reaches',
    category: 'energy',
    name: 'Side Reaches',
    duration: 60,
    steps: [
      'Stand with feet apart',
      'Reach your right arm up and over to the left',
      'Feel the stretch along your side',
      'Come back to centre',
      'Reach left arm up and over to the right',
      'Repeat 8 times each side'
    ]
  },
  {
    id: 'desk-push-ups',
    category: 'energy',
    name: 'Desk Push-Ups',
    duration: 60,
    steps: [
      'Place hands on a table or counter',
      'Step feet back so you\'re leaning forward',
      'Bend your elbows to lower towards the surface',
      'Push back up',
      'Repeat 10 times',
      'Quicker than a coffee to wake you up'
    ]
  },

  // === WOUND UP / TENSE ===
  {
    id: 'shake-it-out',
    category: 'tension',
    name: 'Shake It Out',
    duration: 45,
    steps: [
      'Shake your hands like you\'re flicking water off',
      'Let your arms flop loosely',
      'Shake your whole body gently',
      'Let everything be loose and floppy',
      'Sigh it out'
    ]
  },
  {
    id: 'jaw-release',
    category: 'tension',
    name: 'Jaw Release',
    duration: 45,
    steps: [
      'Open your mouth wide',
      'Move your jaw side to side',
      'Massage your jaw joints with your fingers',
      'Let your mouth hang open slightly',
      'Notice how much tension was there'
    ]
  },
  {
    id: 'fist-clench-release',
    category: 'tension',
    name: 'Fist Clench & Release',
    duration: 60,
    steps: [
      'Make tight fists with both hands',
      'Hold for 5 seconds',
      'Release and spread your fingers wide',
      'Notice the difference',
      'Repeat 5 times',
      'Try with your whole body tensed'
    ]
  },
  {
    id: 'ragdoll',
    category: 'tension',
    name: 'Ragdoll',
    duration: 60,
    steps: [
      'Stand with feet hip-width apart',
      'Slowly fold forward from the waist',
      'Let your arms dangle',
      'Let your head hang heavy',
      'Sway gently side to side',
      'Slowly roll back up'
    ]
  },
  {
    id: 'face-scrunch',
    category: 'tension',
    name: 'Face Scrunch',
    duration: 45,
    steps: [
      'Scrunch up your whole face tightly',
      'Eyes, nose, mouth - everything',
      'Hold for 5 seconds',
      'Release completely',
      'Feel your face relax',
      'Repeat 5 times'
    ]
  },
  {
    id: 'lion-breath',
    category: 'tension',
    name: 'Lion Breath',
    duration: 45,
    steps: [
      'Take a deep breath in through your nose',
      'Open your mouth wide',
      'Stick out your tongue',
      'Exhale forcefully with a "haaaa" sound',
      'Feel silly? Good. That\'s part of it.',
      'Repeat 5 times'
    ]
  },
  {
    id: 'body-scan-squeeze',
    category: 'tension',
    name: 'Squeeze & Release',
    duration: 90,
    steps: [
      'Start with your feet - curl your toes tight',
      'Hold for 5 seconds, then release',
      'Move to your calves - tense them',
      'Hold and release',
      'Continue up: thighs, stomach, shoulders, fists, face',
      'Each time, feel the tension melt away'
    ]
  },

  // === FEELING SAD ===
  {
    id: 'self-hug',
    category: 'sad',
    name: 'Self Hug',
    duration: 60,
    steps: [
      'Wrap your arms around yourself',
      'Give yourself a squeeze',
      'Place one hand on your heart',
      'Take 5 slow breaths',
      'It\'s okay to feel this way'
    ]
  },
  {
    id: 'butterfly-hug',
    category: 'sad',
    name: 'Butterfly Hug',
    duration: 90,
    steps: [
      'Cross your arms over your chest',
      'Hands resting on shoulders',
      'Alternately tap your shoulders',
      'Right, left, right, left',
      'Slow and rhythmic',
      'Keep breathing',
      'This is used by trauma therapists'
    ]
  },
  {
    id: 'ground-yourself',
    category: 'sad',
    name: 'Ground Yourself',
    duration: 90,
    steps: [
      'Feel your feet on the floor',
      'Press them down firmly',
      'Notice 5 things you can see',
      '4 things you can touch',
      '3 things you can hear',
      '2 things you can smell',
      '1 thing you can taste'
    ]
  },
  {
    id: 'warm-hands',
    category: 'sad',
    name: 'Warm Hands',
    duration: 60,
    steps: [
      'Rub your palms together quickly',
      'Keep going until they feel warm',
      'Place your warm hands over your eyes',
      'Let the warmth soak in',
      'Breathe slowly',
      'This is a gift from you to you'
    ]
  },
  {
    id: 'comfort-touch',
    category: 'sad',
    name: 'Comfort Touch',
    duration: 60,
    steps: [
      'Place one hand on your chest',
      'Place the other on your belly',
      'Feel the warmth of your hands',
      'Breathe slowly and deeply',
      'You are holding yourself',
      'That is enough'
    ]
  },
  {
    id: 'gentle-rocking',
    category: 'sad',
    name: 'Gentle Rocking',
    duration: 60,
    steps: [
      'Sit comfortably in a chair',
      'Gently rock forward and back',
      'Like a slow rocking chair',
      'This motion is naturally soothing',
      'Keep going as long as it helps'
    ]
  },

  // === HAVE 5 MINUTES ===
  {
    id: 'full-body-stretch',
    category: 'break',
    name: 'Full Body Stretch',
    duration: 300,
    steps: [
      'Start with neck rolls (30 sec)',
      'Shoulder shrugs and drops (30 sec)',
      'Arm circles, both directions (30 sec)',
      'Side bends, reaching over (30 sec)',
      'Hip circles (30 sec)',
      'Gentle forward fold (30 sec)',
      'Calf stretches against wall (30 sec)',
      'Shake everything out (30 sec)'
    ]
  },
  {
    id: 'chair-yoga',
    category: 'break',
    name: 'Chair Yoga',
    duration: 300,
    steps: [
      'Sit tall, feet flat on floor',
      'Reach arms up, stretch long (30 sec)',
      'Gentle seated twist each way (60 sec)',
      'Ankle circles both directions (30 sec)',
      'Forward fold over legs (30 sec)',
      'Cat-cow arching in seat (30 sec)',
      'Shoulder rolls (30 sec)',
      'Rest hands on knees, breathe (30 sec)'
    ]
  },
  {
    id: 'standing-flow',
    category: 'break',
    name: 'Standing Flow',
    duration: 300,
    steps: [
      'Stand tall, feet together',
      'Reach arms up high, stretch (30 sec)',
      'Forward fold, let head hang (30 sec)',
      'Step back to a gentle lunge (30 sec each side)',
      'Stand and twist left then right (30 sec)',
      'Side bends, reaching overhead (30 sec each)',
      'Roll shoulders forward and back (30 sec)',
      'Stand still, eyes closed, breathe (30 sec)'
    ]
  },
  {
    id: 'mindful-walk',
    category: 'break',
    name: 'Mindful Walk',
    duration: 300,
    steps: [
      'Walk slowly around the room or outside',
      'Notice how each foot feels touching the ground',
      'Feel heel, then ball, then toes',
      'Look at something you normally ignore',
      'Listen to the quietest sound you can hear',
      'Take 5 minutes to go nowhere in particular',
      'Return to where you started',
      'Notice how you feel different'
    ]
  },
  {
    id: 'gentle-dance',
    category: 'break',
    name: 'Gentle Dance',
    duration: 300,
    steps: [
      'Put on a favourite song in your head (or hum one)',
      'Start with gentle swaying',
      'Move your hips a little',
      'Roll your shoulders to the beat',
      'Wave your arms slowly',
      'Nobody\'s watching. Move however feels good.',
      'Slow it down towards the end',
      'Stand still and feel the calm'
    ]
  },

  // === JUST BREATHE ===
  {
    id: 'box-breathing',
    category: 'breathe',
    name: 'Box Breathing',
    duration: 60,
    steps: [
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 4 counts',
      'Hold for 4 counts',
      'Repeat 4 times'
    ]
  },
  {
    id: 'long-exhale',
    category: 'breathe',
    name: 'Long Exhale',
    duration: 60,
    steps: [
      'Breathe in for 4 counts',
      'Breathe out for 8 counts',
      'The long exhale activates your rest response',
      'Repeat 5 times'
    ]
  },
  {
    id: 'belly-breathing',
    category: 'breathe',
    name: 'Belly Breathing',
    duration: 90,
    steps: [
      'Place one hand on your belly',
      'Breathe so your belly pushes out',
      'Your chest should barely move',
      'Slow in through nose',
      'Slow out through mouth',
      'Feel your hand rise and fall'
    ]
  },
  {
    id: 'sigh-it-out',
    category: 'breathe',
    name: 'Sigh It Out',
    duration: 45,
    steps: [
      'Take a deep breath in',
      'Let it out with an audible sigh',
      'Really let it go',
      'Make noise if you want',
      'Repeat until you feel lighter'
    ]
  },
  {
    id: '4-7-8-breathing',
    category: 'breathe',
    name: '4-7-8 Breathing',
    duration: 90,
    steps: [
      'Breathe in through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale slowly through your mouth for 8 counts',
      'This activates your body\'s calm response',
      'Repeat 4 times',
      'Feel your heart rate slow'
    ]
  },
  {
    id: 'counting-breaths',
    category: 'breathe',
    name: 'Counting Breaths',
    duration: 90,
    steps: [
      'Breathe naturally',
      'Count each exhale: 1, 2, 3...',
      'When you reach 10, start over',
      'If you lose count, just start at 1 again',
      'No judgement, just counting',
      'Continue for 90 seconds'
    ]
  },
  {
    id: 'ocean-breath',
    category: 'breathe',
    name: 'Ocean Breath',
    duration: 60,
    steps: [
      'Breathe in slowly through your nose',
      'Breathe out through your mouth',
      'Make a gentle "haaa" sound as you exhale',
      'Like the sound of waves on a beach',
      'Let each wave carry tension away',
      'Repeat 8 times'
    ]
  },
  {
    id: 'nostril-breathing',
    category: 'breathe',
    name: 'Alternate Nostril',
    duration: 90,
    steps: [
      'Close your right nostril with your thumb',
      'Breathe in through your left nostril',
      'Close your left nostril with your finger',
      'Release right nostril and breathe out',
      'Breathe in through right nostril',
      'Switch and breathe out through left',
      'Repeat 5 complete cycles'
    ]
  }
];

/**
 * Get exercises for a category
 */
export function getExercisesForCategory(category) {
  return EXERCISES.filter(ex => ex.category === category);
}

/**
 * Get a random exercise from a category
 */
export function getRandomExercise(category) {
  const exercises = getExercisesForCategory(category);
  return exercises[Math.floor(Math.random() * exercises.length)];
}

/**
 * Get all categories with their exercises count
 */
export function getCategoriesWithCounts() {
  return Object.entries(EXERCISE_CATEGORIES).map(([id, cat]) => ({
    id,
    ...cat,
    count: getExercisesForCategory(id).length
  }));
}
