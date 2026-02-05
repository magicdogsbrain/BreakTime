/**
 * Word Puzzles
 * 
 * Simple word games - not cryptic, not frustrating
 * Just satisfying little word puzzles
 */

// ==================
// ANAGRAMS
// ==================

export const ANAGRAMS = [
  // Easy household words
  { letters: 'TKELELT', answer: 'KETTLE', hint: 'Makes your cuppa' },
  { letters: 'FAOS', answer: 'SOFA', hint: 'Sit on it' },
  { letters: 'DONWIG', answer: 'WINDOW', hint: 'Let the light in' },
  { letters: 'HCIRA', answer: 'CHAIR', hint: 'Take a seat' },
  { letters: 'LOBWEL', answer: 'ELBOW', hint: 'Bendy arm bit' },
  
  // Food and drink
  { letters: 'TAOTS', answer: 'TOAST', hint: 'Breakfast staple' },
  { letters: 'FEOCFE', answer: 'COFFEE', hint: 'Morning fuel' },
  { letters: 'ISCUTIB', answer: 'BISCUIT', hint: 'Goes with tea' },
  { letters: 'DAERB', answer: 'BREAD', hint: 'Sliced and lovely' },
  { letters: 'HESECE', answer: 'CHEESE', hint: 'Say it for photos' },
  
  // Nature
  { letters: 'DRENGA', answer: 'GARDEN', hint: 'Outdoor space' },
  { letters: 'RETE', answer: 'TREE', hint: 'Has leaves and branches' },
  { letters: 'LOWESFR', answer: 'FLOWERS', hint: 'Colourful blooms' },
  { letters: 'RIBSD', answer: 'BIRDS', hint: 'Feathered friends' },
  { letters: 'NISSENUH', answer: 'SUNSHINE', hint: 'Makes you smile' },
  
  // Feelings (positive)
  { letters: 'PYHPA', answer: 'HAPPY', hint: 'A good feeling' },
  { letters: 'MALC', answer: 'CALM', hint: 'Peaceful state' },
  { letters: 'THEERAB', answer: 'BREATHE', hint: 'In and out' },
  { letters: 'LAERX', answer: 'RELAX', hint: 'Take it easy' },
  { letters: 'LSIME', answer: 'SMILE', hint: ':)' },
  
  // Around the house
  { letters: 'NOOSL', answer: 'SPOON', hint: 'Stirring tool' },
  { letters: 'KLCOC', answer: 'CLOCK', hint: 'Tells the time' },
  { letters: 'PMAL', answer: 'LAMP', hint: 'Light source' },
  { letters: 'ROOIM', answer: 'MIRROR', hint: 'See yourself' },
  { letters: 'WLOTE', answer: 'TOWEL', hint: 'Drying off' },

  // More household
  { letters: 'PTIELO', answer: 'POLITE', hint: 'Good manners' },
  { letters: 'LOBPIL', answer: 'PILLOW', hint: 'Head rest' },
  { letters: 'RAGUST', answer: 'GUITARS', hint: 'Musical strings' },
  { letters: 'KRSOOBC', answer: 'REBOOKS', hint: 'Arranges again' },
  { letters: 'THIKECN', answer: 'KITCHEN', hint: 'Cooking room' },

  // Comfort & feelings
  { letters: 'KAHTNS', answer: 'THANKS', hint: 'Gratitude word' },
  { letters: 'HELP', answer: 'HELP', hint: 'Ask for this' },
  { letters: 'GHUAL', answer: 'LAUGH', hint: 'Ha ha ha' },
  { letters: 'PLEES', answer: 'SLEEP', hint: 'Nighttime activity' },
  { letters: 'EPCAE', answer: 'PEACE', hint: 'Quiet state' },

  // Nature
  { letters: 'TRBTELUYF', answer: 'BUTTERFLY', hint: 'Colourful wings' },
  { letters: 'BNAIROW', answer: 'RAINBOW', hint: 'After the rain' },
  { letters: 'BEPLBE', answer: 'PEBBLE', hint: 'Small stone' },
  { letters: 'ADNEP', answer: 'PANDA', hint: 'Black and white bear' },
  { letters: 'GISPNR', answer: 'SPRING', hint: 'Season of growth' },
];

// ==================
// MISSING LETTERS
// ==================

export const MISSING_LETTERS = [
  // Common words
  { puzzle: 'C_P  O_  T_A', answer: 'CUP OF TEA', hint: 'British essential' },
  { puzzle: 'S_N_A_', answer: 'SUNDAY', hint: 'End of the week' },
  { puzzle: 'H_M_', answer: 'HOME', hint: 'Where the heart is' },
  { puzzle: 'F_M_L_', answer: 'FAMILY', hint: 'Your people' },
  { puzzle: 'K_T_H_N', answer: 'KITCHEN', hint: 'Cooking room' },
  
  // Longer phrases
  { puzzle: 'T_K_  A  B_E_K', answer: 'TAKE A BREAK', hint: 'You deserve it' },
  { puzzle: 'D_E_  B_E_T_', answer: 'DEEP BREATH', hint: 'Calm down technique' },
  { puzzle: 'G_O_  M_R_I_G', answer: 'GOOD MORNING', hint: 'Wake up greeting' },
  { puzzle: 'S_E_T  D_E_M_', answer: 'SWEET DREAMS', hint: 'Bedtime wish' },
  { puzzle: 'W_L_  D_N_', answer: 'WELL DONE', hint: 'You did it!' },
  
  // Comfort words
  { puzzle: 'W_R_  H_G', answer: 'WARM HUG', hint: 'Cosy embrace' },
  { puzzle: 'S_F_  B_A_K_T', answer: 'SOFT BLANKET', hint: 'Snuggly cover' },
  { puzzle: 'H_T  C_O_O_A_E', answer: 'HOT CHOCOLATE', hint: 'Warming drink' },
  { puzzle: 'C_Z_  S_C_S', answer: 'COZY SOCKS', hint: 'Warm feet' },
  { puzzle: 'Q_I_T  M_M_N_', answer: 'QUIET MOMENT', hint: 'Peaceful pause' },

  // More phrases
  { puzzle: 'F_E_H  A_R', answer: 'FRESH AIR', hint: 'Open a window for this' },
  { puzzle: 'C_P  O_  C_F_E_', answer: 'CUP OF COFFEE', hint: 'Morning pick-me-up' },
  { puzzle: 'R_A_Y  S_E_D_', answer: 'READY STEADY', hint: 'Go!' },
  { puzzle: 'S_N_Y  D_Y', answer: 'SUNNY DAY', hint: 'Nice weather' },
  { puzzle: 'B_G  H_G', answer: 'BIG HUG', hint: 'Warm squeeze' },
  { puzzle: 'G_O_  N_W_', answer: 'GOOD NEWS', hint: 'Something positive' },
  { puzzle: 'K_N_  W_R_S', answer: 'KIND WORDS', hint: 'Nice things to say' },
  { puzzle: 'H_P_Y  D_Y_', answer: 'HAPPY DAYS', hint: 'Good times' },
  { puzzle: 'L_V_L_  W_L_', answer: 'LOVELY WALK', hint: 'Nice stroll' },
  { puzzle: 'N_C_  O_E', answer: 'NICE ONE', hint: 'Well done!' },
];

// ==================
// WORD DEFINITIONS (simple crossword clues)
// ==================

export const WORD_CLUES = [
  // 3 letters
  { clue: 'Feline pet', answer: 'CAT', length: 3 },
  { clue: 'Beverage from leaves', answer: 'TEA', length: 3 },
  { clue: 'Loyal four-legged friend', answer: 'DOG', length: 3 },
  { clue: 'Rises in the east', answer: 'SUN', length: 3 },
  { clue: 'Opposite of cold', answer: 'HOT', length: 3 },
  { clue: 'Where you sleep', answer: 'BED', length: 3 },

  // 4 letters
  { clue: 'Rain protection', answer: 'COAT', length: 4 },
  { clue: 'Baked comfort food', answer: 'CAKE', length: 4 },
  { clue: 'Worn on feet', answer: 'SHOE', length: 4 },
  { clue: 'England\'s national flower', answer: 'ROSE', length: 4 },

  // 5 letters
  { clue: 'Telling stories while asleep', answer: 'DREAM', length: 5 },
  { clue: 'Daily news source', answer: 'PAPER', length: 5 },
  { clue: 'Nightly rest', answer: 'SLEEP', length: 5 },
  { clue: 'Garden visitor', answer: 'ROBIN', length: 5 },

  // 6 letters
  { clue: 'Written message', answer: 'LETTER', length: 6 },
  { clue: 'Knitted warmth', answer: 'JUMPER', length: 6 },
  { clue: 'Evening meal', answer: 'DINNER', length: 6 },
  { clue: 'Orange root vegetable', answer: 'CARROT', length: 6 },

  // 7+ letters
  { clue: 'Colourful arc after rain', answer: 'RAINBOW', length: 7 },
  { clue: 'Sunday roast meat', answer: 'CHICKEN', length: 7 },
  { clue: 'Fireside seat', answer: 'ARMCHAIR', length: 8 },
  { clue: 'Keeps the rain off', answer: 'UMBRELLA', length: 8 },
  { clue: 'First meal of the day', answer: 'BREAKFAST', length: 9 },

  // More clues
  { clue: 'Black and yellow buzzer', answer: 'BEE', length: 3 },
  { clue: 'Bedtime drink', answer: 'COCOA', length: 5 },
  { clue: 'Garden climbing flower', answer: 'IVY', length: 3 },
  { clue: 'Put the kettle on for this', answer: 'TEA', length: 3 },
  { clue: 'Cosy winter drink', answer: 'SOUP', length: 4 },
  { clue: 'Furry household companion', answer: 'CAT', length: 3 },
  { clue: 'Round red fruit', answer: 'APPLE', length: 5 },
  { clue: 'Ocean birds', answer: 'GULLS', length: 5 },
  { clue: 'Autumn colour', answer: 'GOLD', length: 4 },
  { clue: 'Night light in the sky', answer: 'MOON', length: 4 },
  { clue: 'Baby sheep', answer: 'LAMB', length: 4 },
  { clue: 'Place to sit in the garden', answer: 'BENCH', length: 5 },
];

// ==================
// WORD SEARCH GRIDS (small, 8x8)
// ==================

// Word searches with words placed in multiple directions:
// H = horizontal (left to right)
// V = vertical (top to bottom)
// D = diagonal (top-left to bottom-right)
// R = reverse diagonal (top-right to bottom-left)
// Words can also be found backwards along these lines

export const WORD_SEARCHES = [
  {
    id: 'ws-comfort',
    title: 'Comfort Words',
    words: ['COSY', 'WARM', 'SOFT', 'CALM', 'REST', 'PEACE'],
    // PEACE: H from (6,0)
    // COSY: R from (0,4)
    // WARM: V from (2,5)
    // SOFT: H from (7,3)
    // CALM: V from (4,7)
    // REST: R from (0,3)
    grid: [
      ['L', 'C', 'Z', 'R', 'C', 'A', 'X', 'Q'],
      ['D', 'Z', 'E', 'O', 'W', 'Z', 'W', 'G'],
      ['K', 'S', 'S', 'M', 'W', 'W', 'W', 'A'],
      ['T', 'Y', 'G', 'S', 'M', 'A', 'X', 'M'],
      ['Q', 'V', 'J', 'F', 'M', 'R', 'H', 'C'],
      ['Y', 'D', 'E', 'X', 'A', 'M', 'A', 'A'],
      ['P', 'E', 'A', 'C', 'E', 'N', 'D', 'L'],
      ['S', 'H', 'P', 'S', 'O', 'F', 'T', 'M']
    ]
  },
  {
    id: 'ws-cuppa',
    title: 'Time for Tea',
    words: ['TEA', 'CUP', 'MILK', 'SUGAR', 'BREW', 'BISCUIT'],
    // BISCUIT: D from (1,1)
    // SUGAR: D from (3,0)
    // MILK: V from (1,7)
    // BREW: R from (0,7)
    // TEA: V from (0,4)
    // CUP: H from (0,1)
    grid: [
      ['E', 'C', 'U', 'P', 'T', 'G', 'A', 'B'],
      ['R', 'B', 'K', 'N', 'E', 'W', 'R', 'M'],
      ['T', 'Y', 'I', 'V', 'A', 'E', 'Z', 'I'],
      ['S', 'M', 'D', 'S', 'W', 'N', 'V', 'L'],
      ['X', 'U', 'E', 'L', 'C', 'R', 'F', 'K'],
      ['M', 'S', 'G', 'G', 'E', 'U', 'H', 'W'],
      ['Q', 'V', 'C', 'A', 'F', 'G', 'I', 'J'],
      ['W', 'B', 'V', 'L', 'R', 'X', 'R', 'T']
    ]
  },
  {
    id: 'ws-nature',
    title: 'In the Garden',
    words: ['BIRD', 'TREE', 'FLOWER', 'GRASS', 'SUN', 'BEE'],
    // FLOWER: D from (1,2)
    // GRASS: D from (2,0)
    // BIRD: D from (0,3)
    // TREE: H from (7,0)
    // SUN: H from (0,0)
    // BEE: D from (0,5)
    grid: [
      ['S', 'U', 'N', 'B', 'F', 'B', 'Q', 'M'],
      ['B', 'A', 'F', 'D', 'I', 'Q', 'E', 'E'],
      ['G', 'G', 'E', 'L', 'G', 'R', 'W', 'E'],
      ['W', 'R', 'W', 'A', 'O', 'L', 'D', 'G'],
      ['E', 'N', 'A', 'E', 'Z', 'W', 'V', 'Y'],
      ['S', 'R', 'Y', 'S', 'S', 'G', 'E', 'Z'],
      ['Q', 'S', 'C', 'D', 'S', 'S', 'L', 'R'],
      ['T', 'R', 'E', 'E', 'R', 'N', 'B', 'R']
    ]
  },
  {
    id: 'ws-home',
    title: 'Around the House',
    words: ['SOFA', 'LAMP', 'TABLE', 'CHAIR', 'BED', 'RUG'],
    // TABLE: V from (3,2)
    // CHAIR: R from (2,7)
    // SOFA: V from (2,3)
    // LAMP: R from (1,7)
    // BED: V from (2,0)
    // RUG: R from (1,3)
    grid: [
      ['T', 'F', 'R', 'N', 'P', 'K', 'C', 'K'],
      ['J', 'P', 'W', 'R', 'X', 'F', 'Z', 'L'],
      ['B', 'F', 'U', 'S', 'X', 'R', 'A', 'C'],
      ['E', 'G', 'T', 'O', 'M', 'M', 'H', 'S'],
      ['D', 'P', 'A', 'F', 'P', 'A', 'Y', 'T'],
      ['Z', 'Y', 'B', 'A', 'I', 'F', 'T', 'N'],
      ['Z', 'F', 'L', 'R', 'Y', 'G', 'P', 'Q'],
      ['R', 'G', 'E', 'H', 'F', 'W', 'M', 'Q']
    ]
  },
  {
    id: 'ws-food',
    title: 'Comfort Food',
    words: ['CAKE', 'TOAST', 'SOUP', 'PIE', 'BREAD', 'CHIPS'],
    // TOAST: D from (3,3)
    // BREAD: H from (1,0)
    // CHIPS: R from (1,6)
    // CAKE: H from (6,2)
    // SOUP: H from (7,3)
    // PIE: V from (3,0)
    grid: [
      ['W', 'S', 'J', 'N', 'B', 'J', 'E', 'V'],
      ['B', 'R', 'E', 'A', 'D', 'G', 'C', 'Y'],
      ['A', 'M', 'L', 'Y', 'S', 'H', 'P', 'C'],
      ['P', 'V', 'C', 'T', 'I', 'B', 'V', 'T'],
      ['I', 'J', 'W', 'P', 'O', 'T', 'N', 'Y'],
      ['E', 'Z', 'S', 'K', 'P', 'A', 'H', 'A'],
      ['A', 'Q', 'C', 'A', 'K', 'E', 'S', 'L'],
      ['Z', 'S', 'F', 'S', 'O', 'U', 'P', 'T']
    ]
  },
  {
    id: 'ws-weather',
    title: 'Weather Words',
    words: ['RAIN', 'SNOW', 'WIND', 'CLOUD', 'SUN', 'FOG'],
    // CLOUD: R from (2,5)
    // RAIN: D from (3,3)
    // SNOW: V from (4,0)
    // WIND: V from (0,0)
    // SUN: R from (4,5)
    // FOG: H from (1,2)
    grid: [
      ['W', 'R', 'Y', 'A', 'V', 'P', 'F', 'N'],
      ['I', 'F', 'F', 'O', 'G', 'J', 'V', 'M'],
      ['N', 'H', 'N', 'A', 'C', 'C', 'S', 'T'],
      ['D', 'S', 'Q', 'R', 'L', 'A', 'P', 'X'],
      ['S', 'J', 'K', 'O', 'A', 'S', 'H', 'V'],
      ['N', 'R', 'U', 'Z', 'U', 'I', 'M', 'L'],
      ['O', 'D', 'L', 'N', 'Z', 'R', 'N', 'W'],
      ['W', 'C', 'V', 'V', 'F', 'F', 'A', 'W']
    ]
  },
  {
    id: 'ws-colour',
    title: 'Colour Palette',
    words: ['RED', 'BLUE', 'GREEN', 'PINK', 'GOLD', 'GREY'],
    // GREEN: D from (0,0)
    // BLUE: R from (4,6)
    // PINK: R from (1,6)
    // GOLD: D from (2,0)
    // GREY: R from (1,4)
    // RED: R from (5,7)
    grid: [
      ['G', 'K', 'L', 'S', 'T', 'M', 'E', 'H'],
      ['Q', 'R', 'K', 'S', 'G', 'W', 'P', 'Z'],
      ['G', 'E', 'E', 'R', 'R', 'I', 'R', 'Y'],
      ['Z', 'O', 'E', 'E', 'N', 'R', 'T', 'H'],
      ['V', 'Y', 'L', 'K', 'N', 'D', 'B', 'P'],
      ['X', 'X', 'A', 'D', 'B', 'L', 'C', 'R'],
      ['H', 'A', 'J', 'W', 'U', 'W', 'E', 'R'],
      ['Y', 'H', 'A', 'E', 'W', 'D', 'W', 'C']
    ]
  },
  {
    id: 'ws-seasons',
    title: 'Seasons',
    words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'LEAF', 'SNOW'],
    // SPRING: R from (1,5)
    // SUMMER: H from (6,2)
    // AUTUMN: H from (5,2)
    // WINTER: R from (0,5)
    // LEAF: V from (1,0)
    // SNOW: H from (3,4)
    grid: [
      ['C', 'G', 'C', 'L', 'W', 'W', 'Q', 'B'],
      ['L', 'R', 'P', 'V', 'I', 'S', 'D', 'Q'],
      ['E', 'F', 'T', 'N', 'P', 'A', 'C', 'M'],
      ['A', 'R', 'T', 'R', 'S', 'N', 'O', 'W'],
      ['F', 'E', 'I', 'K', 'E', 'A', 'F', 'N'],
      ['R', 'N', 'A', 'U', 'T', 'U', 'M', 'N'],
      ['G', 'B', 'S', 'U', 'M', 'M', 'E', 'R'],
      ['X', 'Y', 'H', 'Q', 'V', 'Y', 'N', 'W']
    ]
  },
  {
    id: 'ws-relax',
    title: 'Relaxation',
    words: ['YOGA', 'BATH', 'BOOK', 'WALK', 'NAP', 'CALM'],
    // YOGA: D from (1,1)
    // BATH: H from (1,2)
    // BOOK: H from (6,0)
    // WALK: R from (1,6)
    // CALM: H from (5,4)
    // NAP: V from (1,0)
    grid: [
      ['Z', 'F', 'C', 'P', 'G', 'B', 'G', 'M'],
      ['N', 'Y', 'B', 'A', 'T', 'H', 'W', 'V'],
      ['A', 'G', 'O', 'L', 'T', 'A', 'J', 'K'],
      ['P', 'X', 'X', 'G', 'L', 'F', 'W', 'S'],
      ['M', 'T', 'N', 'K', 'A', 'P', 'L', 'Y'],
      ['Q', 'Q', 'Y', 'Y', 'C', 'A', 'L', 'M'],
      ['B', 'O', 'O', 'K', 'E', 'Q', 'C', 'Q'],
      ['Z', 'J', 'L', 'W', 'H', 'T', 'M', 'F']
    ]
  },
  {
    // Harder puzzle with diagonal words going both directions
    id: 'ws-feelings',
    title: 'Good Feelings',
    words: ['HAPPY', 'JOY', 'LOVE', 'HOPE', 'SMILE', 'KIND'],
    // HAPPY: V from (3,0)
    // SMILE: D from (3,1)
    // LOVE: H from (3,2)
    // HOPE: H from (4,3)
    // KIND: H from (0,3)
    // JOY: R from (5,6)
    grid: [
      ['H', 'M', 'G', 'K', 'I', 'N', 'D', 'X'],
      ['W', 'L', 'T', 'V', 'Q', 'V', 'J', 'W'],
      ['T', 'W', 'W', 'E', 'A', 'J', 'K', 'F'],
      ['H', 'S', 'L', 'O', 'V', 'E', 'R', 'G'],
      ['A', 'R', 'M', 'H', 'O', 'P', 'E', 'E'],
      ['P', 'Q', 'Y', 'I', 'Y', 'Y', 'J', 'V'],
      ['P', 'Q', 'K', 'J', 'L', 'O', 'Z', 'N'],
      ['Y', 'M', 'S', 'N', 'Y', 'E', 'Z', 'T']
    ]
  }
];

// ==================
// HELPERS
// ==================

export function getRandomAnagram(excludeAnswers = []) {
  const available = ANAGRAMS.filter(a => !excludeAnswers.includes(a.answer));
  if (available.length === 0) return ANAGRAMS[Math.floor(Math.random() * ANAGRAMS.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomMissingLetters(excludeAnswers = []) {
  const available = MISSING_LETTERS.filter(m => !excludeAnswers.includes(m.answer));
  if (available.length === 0) return MISSING_LETTERS[Math.floor(Math.random() * MISSING_LETTERS.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomWordClue(excludeAnswers = []) {
  const available = WORD_CLUES.filter(w => !excludeAnswers.includes(w.answer));
  if (available.length === 0) return WORD_CLUES[Math.floor(Math.random() * WORD_CLUES.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomWordSearch(excludeIds = []) {
  const available = WORD_SEARCHES.filter(w => !excludeIds.includes(w.id));
  if (available.length === 0) return WORD_SEARCHES[Math.floor(Math.random() * WORD_SEARCHES.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function checkAnagramAnswer(puzzle, answer) {
  return answer.toUpperCase().trim() === puzzle.answer;
}

export function checkMissingLettersAnswer(puzzle, answer) {
  return answer.toUpperCase().replace(/\s+/g, ' ').trim() === puzzle.answer;
}

export function checkWordClueAnswer(puzzle, answer) {
  return answer.toUpperCase().trim() === puzzle.answer;
}
