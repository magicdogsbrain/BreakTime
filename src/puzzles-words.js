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
    // COSY: diagonal from (0,0)
    // WARM: horizontal at row 2
    // SOFT: vertical from (0,5)
    // CALM: horizontal at row 5
    // REST: diagonal from (2,7) going down-left
    // PEACE: horizontal at row 7
    grid: [
      ['C', 'M', 'R', 'T', 'L', 'S', 'X', 'B'],
      ['A', 'O', 'E', 'P', 'K', 'O', 'N', 'R'],
      ['W', 'A', 'R', 'M', 'G', 'F', 'J', 'E'],
      ['H', 'Q', 'Z', 'S', 'D', 'T', 'V', 'S'],
      ['U', 'I', 'N', 'P', 'Y', 'A', 'L', 'T'],
      ['C', 'A', 'L', 'M', 'F', 'E', 'O', 'K'],
      ['G', 'D', 'J', 'B', 'R', 'W', 'H', 'Q'],
      ['P', 'E', 'A', 'C', 'E', 'N', 'Y', 'Z']
    ]
  },
  {
    id: 'ws-cuppa',
    title: 'Time for Tea',
    words: ['TEA', 'CUP', 'MILK', 'SUGAR', 'BREW', 'BISCUIT'],
    // TEA: horizontal at row 0
    // CUP: vertical from (1,0)
    // MILK: diagonal from (2,2)
    // SUGAR: horizontal at row 4
    // BREW: vertical from (3,7)
    // BISCUIT: horizontal at row 6
    grid: [
      ['T', 'E', 'A', 'X', 'R', 'N', 'K', 'J'],
      ['C', 'F', 'G', 'H', 'Q', 'Z', 'V', 'B'],
      ['U', 'D', 'M', 'W', 'Y', 'A', 'L', 'R'],
      ['P', 'N', 'O', 'I', 'T', 'S', 'C', 'E'],
      ['S', 'U', 'G', 'A', 'R', 'L', 'E', 'W'],
      ['J', 'K', 'H', 'F', 'D', 'K', 'P', 'Q'],
      ['B', 'I', 'S', 'C', 'U', 'I', 'T', 'N'],
      ['Y', 'R', 'Z', 'M', 'W', 'X', 'V', 'A']
    ]
  },
  {
    id: 'ws-nature',
    title: 'In the Garden',
    words: ['BIRD', 'TREE', 'FLOWER', 'GRASS', 'SUN', 'BEE'],
    // BIRD: diagonal from (0,0)
    // TREE: vertical from (0,6)
    // FLOWER: horizontal at row 4
    // GRASS: horizontal at row 6
    // SUN: diagonal from (1,3)
    // BEE: vertical from (5,2)
    grid: [
      ['B', 'M', 'K', 'Q', 'Z', 'J', 'T', 'N'],
      ['A', 'I', 'H', 'S', 'P', 'W', 'R', 'X'],
      ['D', 'F', 'R', 'G', 'U', 'Y', 'E', 'L'],
      ['V', 'C', 'N', 'D', 'T', 'N', 'E', 'O'],
      ['F', 'L', 'O', 'W', 'E', 'R', 'A', 'P'],
      ['Y', 'Q', 'B', 'J', 'K', 'M', 'H', 'S'],
      ['G', 'R', 'A', 'S', 'S', 'X', 'Z', 'V'],
      ['W', 'T', 'E', 'D', 'C', 'R', 'N', 'Q']
    ]
  },
  {
    id: 'ws-home',
    title: 'Around the House',
    words: ['SOFA', 'LAMP', 'TABLE', 'CHAIR', 'BED', 'RUG'],
    // SOFA: horizontal at row 0
    // LAMP: vertical from (1,7)
    // TABLE: diagonal from (2,1)
    // CHAIR: horizontal at row 5
    // BED: vertical from (0,4)
    // RUG: diagonal from (5,5)
    grid: [
      ['S', 'O', 'F', 'A', 'B', 'N', 'Q', 'Z'],
      ['K', 'M', 'H', 'J', 'E', 'W', 'X', 'L'],
      ['P', 'T', 'R', 'Y', 'D', 'V', 'C', 'A'],
      ['N', 'G', 'A', 'F', 'Q', 'K', 'S', 'M'],
      ['D', 'W', 'Z', 'B', 'J', 'H', 'T', 'P'],
      ['C', 'H', 'A', 'I', 'R', 'R', 'N', 'Y'],
      ['V', 'X', 'K', 'M', 'L', 'E', 'U', 'F'],
      ['Q', 'J', 'S', 'P', 'W', 'D', 'C', 'G']
    ]
  },
  {
    id: 'ws-food',
    title: 'Comfort Food',
    words: ['CAKE', 'TOAST', 'SOUP', 'PIE', 'BREAD', 'CHIPS'],
    // CAKE: diagonal from (0,0)
    // TOAST: horizontal at row 2
    // SOUP: vertical from (3,6)
    // PIE: horizontal at row 4
    // BREAD: horizontal at row 6
    // CHIPS: vertical from (1,2)
    grid: [
      ['C', 'N', 'M', 'Q', 'Z', 'J', 'K', 'W'],
      ['F', 'A', 'C', 'R', 'T', 'X', 'V', 'Y'],
      ['T', 'O', 'A', 'S', 'T', 'D', 'L', 'N'],
      ['H', 'G', 'I', 'K', 'E', 'M', 'S', 'Q'],
      ['P', 'I', 'E', 'P', 'J', 'W', 'O', 'Z'],
      ['R', 'Y', 'S', 'V', 'N', 'H', 'U', 'A'],
      ['B', 'R', 'E', 'A', 'D', 'X', 'P', 'F'],
      ['K', 'L', 'Q', 'M', 'T', 'C', 'G', 'R']
    ]
  },
  {
    id: 'ws-weather',
    title: 'Weather Words',
    words: ['RAIN', 'SNOW', 'WIND', 'CLOUD', 'SUN', 'FOG'],
    // RAIN: horizontal at row 1
    // SNOW: diagonal from (0,7) going down-left
    // WIND: vertical from (2,0)
    // CLOUD: horizontal at row 5
    // SUN: diagonal from (3,3)
    // FOG: horizontal at row 7
    grid: [
      ['Q', 'K', 'M', 'J', 'T', 'X', 'Z', 'S'],
      ['R', 'A', 'I', 'N', 'V', 'P', 'N', 'L'],
      ['W', 'Y', 'H', 'D', 'F', 'O', 'A', 'R'],
      ['I', 'M', 'Q', 'S', 'K', 'W', 'B', 'C'],
      ['N', 'T', 'Z', 'J', 'U', 'L', 'G', 'H'],
      ['C', 'L', 'O', 'U', 'D', 'N', 'Y', 'P'],
      ['D', 'V', 'X', 'R', 'A', 'E', 'Q', 'M'],
      ['F', 'O', 'G', 'B', 'W', 'T', 'S', 'K']
    ]
  },
  {
    id: 'ws-colour',
    title: 'Colour Palette',
    words: ['RED', 'BLUE', 'GREEN', 'PINK', 'GOLD', 'GREY'],
    // RED: vertical from (0,0)
    // BLUE: horizontal at row 2
    // GREEN: diagonal from (3,2)
    // PINK: horizontal at row 5
    // GOLD: vertical from (4,7)
    // GREY: horizontal at row 7
    grid: [
      ['R', 'K', 'M', 'Q', 'Z', 'J', 'T', 'N'],
      ['E', 'W', 'X', 'V', 'P', 'S', 'H', 'Y'],
      ['D', 'B', 'L', 'U', 'E', 'F', 'A', 'C'],
      ['L', 'N', 'G', 'K', 'M', 'Q', 'J', 'G'],
      ['T', 'Y', 'H', 'R', 'D', 'V', 'X', 'O'],
      ['P', 'I', 'N', 'K', 'Z', 'E', 'W', 'L'],
      ['S', 'Q', 'M', 'F', 'A', 'E', 'C', 'D'],
      ['G', 'R', 'E', 'Y', 'J', 'T', 'N', 'K']
    ]
  },
  {
    id: 'ws-seasons',
    title: 'Seasons',
    words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'LEAF', 'SNOW'],
    // SPRING: horizontal at row 0
    // SUMMER: horizontal at row 2
    // AUTUMN: vertical from (1,7)
    // WINTER: horizontal at row 5
    // LEAF: diagonal from (3,0)
    // SNOW: vertical from (4,3)
    grid: [
      ['S', 'P', 'R', 'I', 'N', 'G', 'K', 'Q'],
      ['M', 'J', 'X', 'V', 'T', 'H', 'D', 'A'],
      ['S', 'U', 'M', 'M', 'E', 'R', 'N', 'U'],
      ['L', 'K', 'Q', 'S', 'Z', 'Y', 'P', 'T'],
      ['W', 'E', 'T', 'N', 'J', 'M', 'R', 'U'],
      ['W', 'I', 'N', 'T', 'E', 'R', 'X', 'M'],
      ['H', 'D', 'A', 'O', 'K', 'V', 'C', 'N'],
      ['Q', 'Y', 'Z', 'W', 'F', 'S', 'G', 'B']
    ]
  },
  {
    id: 'ws-relax',
    title: 'Relaxation',
    words: ['YOGA', 'BATH', 'BOOK', 'WALK', 'NAP', 'CALM'],
    // YOGA: horizontal at row 0
    // BATH: diagonal from (1,4)
    // BOOK: vertical from (2,0)
    // WALK: horizontal at row 5
    // NAP: diagonal from (3,2)
    // CALM: horizontal at row 7
    grid: [
      ['Y', 'O', 'G', 'A', 'M', 'Q', 'Z', 'K'],
      ['T', 'J', 'X', 'V', 'B', 'N', 'S', 'H'],
      ['B', 'K', 'N', 'R', 'W', 'A', 'P', 'D'],
      ['O', 'M', 'N', 'Q', 'Y', 'Z', 'T', 'J'],
      ['O', 'F', 'H', 'A', 'D', 'V', 'H', 'L'],
      ['W', 'A', 'L', 'K', 'C', 'P', 'X', 'R'],
      ['K', 'T', 'S', 'J', 'M', 'Q', 'N', 'Y'],
      ['C', 'A', 'L', 'M', 'Z', 'W', 'G', 'E']
    ]
  },
  {
    // Harder puzzle with diagonal words going both directions
    id: 'ws-feelings',
    title: 'Good Feelings',
    words: ['HAPPY', 'JOY', 'LOVE', 'HOPE', 'SMILE', 'KIND'],
    // HAPPY: horizontal at row 1
    // JOY: diagonal from (0,5) going down-left
    // LOVE: vertical from (3,0)
    // HOPE: diagonal from (4,3)
    // SMILE: horizontal at row 6
    // KIND: vertical from (2,7)
    grid: [
      ['Q', 'N', 'T', 'Z', 'M', 'J', 'R', 'W'],
      ['H', 'A', 'P', 'P', 'Y', 'O', 'X', 'K'],
      ['V', 'F', 'K', 'D', 'Y', 'S', 'G', 'I'],
      ['L', 'W', 'R', 'M', 'H', 'Q', 'J', 'N'],
      ['O', 'T', 'Z', 'H', 'N', 'X', 'V', 'D'],
      ['V', 'Q', 'K', 'J', 'O', 'F', 'R', 'Y'],
      ['S', 'M', 'I', 'L', 'E', 'P', 'W', 'T'],
      ['E', 'X', 'N', 'D', 'Z', 'M', 'E', 'Q']
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
