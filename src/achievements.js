/**
 * Silly Achievements for BreakTime
 * Fun rewards for using the app!
 */

export const ACHIEVEMENTS = [
  // Getting started
  {
    id: 'first-steps',
    name: 'First Steps',
    desc: 'Complete your first exercise',
    emoji: '👟',
    check: s => s.exercises >= 1
  },
  {
    id: 'stretch-armstrong',
    name: 'Stretch Armstrong',
    desc: 'Do 10 exercises this week',
    emoji: '💪',
    check: s => s.exercises >= 10
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    desc: 'Complete 5 breathing exercises',
    emoji: '🧘',
    check: s => s.breaths >= 5
  },

  // Puzzles & Quizzes
  {
    id: 'puzzle-pal',
    name: 'Puzzle Pal',
    desc: 'Solve 5 puzzles',
    emoji: '🧩',
    check: s => s.puzzles >= 5
  },
  {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    desc: 'Take 3 quizzes',
    emoji: '🎓',
    check: s => s.quizzes >= 3
  },
  {
    id: 'brainbox',
    name: 'Brainbox',
    desc: 'Get 100% on a quiz',
    emoji: '🏆',
    check: s => s.perfectQuiz
  },

  // Consistency
  {
    id: 'daily-devotee',
    name: 'Daily Devotee',
    desc: 'Use the app 5 days this week',
    emoji: '📅',
    check: s => s.daysActive >= 5
  },
  {
    id: 'full-house',
    name: 'Full House',
    desc: 'Active all 7 days this week',
    emoji: '🌟',
    check: s => s.daysActive >= 7
  },
  {
    id: 'cuppa-break',
    name: 'Cuppa Break',
    desc: 'Take 20 breaks total',
    emoji: '☕',
    check: s => s.totalBreaks >= 20
  },

  // Gaming
  {
    id: 'tetris-titan',
    name: 'Tetris Titan',
    desc: 'Score 1000+ in Tetris',
    emoji: '🎮',
    check: s => s.tetrisHigh >= 1000
  },

  // Time-based
  {
    id: 'early-bird',
    name: 'Early Bird',
    desc: 'Take a break before 9am',
    emoji: '🐦',
    check: s => s.earlyBird
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    desc: 'Take a break after 10pm',
    emoji: '🦉',
    check: s => s.nightOwl
  }
];

/**
 * Check which achievements have been earned
 */
export function checkAchievements(stats) {
  return ACHIEVEMENTS.filter(a => a.check(stats));
}

/**
 * Get achievement by ID
 */
export function getAchievement(id) {
  return ACHIEVEMENTS.find(a => a.id === id);
}
