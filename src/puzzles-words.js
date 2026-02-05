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

export const WORD_SEARCHES = [
  {
    id: 'ws-comfort',
    title: 'Comfort Words',
    words: ['COSY', 'WARM', 'SOFT', 'CALM', 'REST', 'PEACE'],
    grid: [
      ['C', 'O', 'S', 'Y', 'P', 'R', 'S', 'T'],
      ['A', 'W', 'A', 'R', 'M', 'E', 'O', 'E'],
      ['L', 'R', 'S', 'O', 'F', 'T', 'F', 'S'],
      ['M', 'P', 'E', 'A', 'C', 'E', 'T', 'T'],
      ['W', 'A', 'R', 'E', 'S', 'T', 'C', 'R'],
      ['S', 'O', 'F', 'C', 'O', 'S', 'Y', 'E'],
      ['R', 'E', 'S', 'T', 'P', 'E', 'A', 'S'],
      ['C', 'A', 'L', 'M', 'W', 'A', 'R', 'T']
    ]
  },
  {
    id: 'ws-cuppa',
    title: 'Time for Tea',
    words: ['TEA', 'CUP', 'MILK', 'SUGAR', 'BREW', 'KETTLE'],
    grid: [
      ['K', 'E', 'T', 'T', 'L', 'E', 'B', 'T'],
      ['M', 'I', 'L', 'K', 'S', 'U', 'R', 'E'],
      ['C', 'U', 'P', 'T', 'E', 'A', 'E', 'A'],
      ['S', 'U', 'G', 'A', 'R', 'M', 'W', 'K'],
      ['B', 'R', 'E', 'W', 'C', 'I', 'S', 'E'],
      ['T', 'E', 'A', 'C', 'U', 'P', 'T', 'T'],
      ['M', 'I', 'L', 'K', 'B', 'R', 'E', 'W'],
      ['S', 'U', 'G', 'A', 'R', 'T', 'E', 'A']
    ]
  },
  {
    id: 'ws-nature',
    title: 'In the Garden',
    words: ['BIRD', 'TREE', 'FLOWER', 'GRASS', 'SKY', 'BEE'],
    grid: [
      ['B', 'I', 'R', 'D', 'S', 'K', 'Y', 'T'],
      ['F', 'L', 'O', 'W', 'E', 'R', 'B', 'R'],
      ['G', 'R', 'A', 'S', 'S', 'E', 'E', 'E'],
      ['T', 'R', 'E', 'E', 'B', 'I', 'E', 'E'],
      ['S', 'K', 'Y', 'F', 'L', 'O', 'W', 'E'],
      ['G', 'R', 'A', 'S', 'S', 'B', 'E', 'R'],
      ['B', 'I', 'R', 'D', 'T', 'R', 'E', 'E'],
      ['F', 'L', 'O', 'W', 'E', 'R', 'S', 'S']
    ]
  },
  {
    id: 'ws-home',
    title: 'Around the House',
    words: ['SOFA', 'LAMP', 'TABLE', 'CHAIR', 'BED', 'RUG'],
    grid: [
      ['S', 'O', 'F', 'A', 'L', 'A', 'M', 'P'],
      ['T', 'A', 'B', 'L', 'E', 'R', 'U', 'G'],
      ['C', 'H', 'A', 'I', 'R', 'B', 'E', 'D'],
      ['L', 'A', 'M', 'P', 'S', 'O', 'F', 'A'],
      ['R', 'U', 'G', 'T', 'A', 'B', 'L', 'E'],
      ['B', 'E', 'D', 'C', 'H', 'A', 'I', 'R'],
      ['S', 'O', 'F', 'A', 'R', 'U', 'G', 'L'],
      ['T', 'A', 'B', 'L', 'E', 'B', 'E', 'D']
    ]
  },
  {
    id: 'ws-food',
    title: 'Comfort Food',
    words: ['CAKE', 'TOAST', 'SOUP', 'PIE', 'BREAD', 'CHIPS'],
    grid: [
      ['C', 'A', 'K', 'E', 'B', 'R', 'E', 'A'],
      ['T', 'O', 'A', 'S', 'T', 'S', 'O', 'D'],
      ['S', 'O', 'U', 'P', 'I', 'E', 'C', 'H'],
      ['B', 'R', 'E', 'A', 'D', 'C', 'A', 'I'],
      ['C', 'H', 'I', 'P', 'S', 'A', 'K', 'P'],
      ['T', 'O', 'A', 'S', 'T', 'K', 'E', 'S'],
      ['S', 'O', 'U', 'P', 'I', 'E', 'B', 'C'],
      ['B', 'R', 'E', 'A', 'D', 'S', 'O', 'U']
    ]
  },
  {
    id: 'ws-weather',
    title: 'Weather Words',
    words: ['RAIN', 'SNOW', 'WIND', 'CLOUD', 'SUN', 'FOG'],
    grid: [
      ['R', 'A', 'I', 'N', 'C', 'L', 'O', 'U'],
      ['S', 'N', 'O', 'W', 'I', 'N', 'D', 'F'],
      ['C', 'L', 'O', 'U', 'D', 'R', 'A', 'O'],
      ['W', 'I', 'N', 'D', 'S', 'U', 'N', 'G'],
      ['F', 'O', 'G', 'R', 'A', 'I', 'N', 'S'],
      ['S', 'U', 'N', 'S', 'N', 'O', 'W', 'C'],
      ['R', 'A', 'I', 'N', 'F', 'O', 'G', 'L'],
      ['C', 'L', 'O', 'U', 'D', 'W', 'I', 'N']
    ]
  },
  {
    id: 'ws-colour',
    title: 'Colour Palette',
    words: ['RED', 'BLUE', 'GREEN', 'GOLD', 'PINK', 'GREY'],
    grid: [
      ['R', 'E', 'D', 'B', 'L', 'U', 'E', 'G'],
      ['G', 'R', 'E', 'E', 'N', 'G', 'O', 'L'],
      ['P', 'I', 'N', 'K', 'G', 'R', 'E', 'D'],
      ['G', 'O', 'L', 'D', 'E', 'Y', 'B', 'L'],
      ['G', 'R', 'E', 'Y', 'R', 'E', 'D', 'U'],
      ['P', 'I', 'N', 'K', 'G', 'O', 'L', 'E'],
      ['B', 'L', 'U', 'E', 'G', 'R', 'E', 'E'],
      ['R', 'E', 'D', 'G', 'R', 'E', 'Y', 'N']
    ]
  },
  {
    id: 'ws-seasons',
    title: 'Four Seasons',
    words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'FROST', 'BLOOM'],
    grid: [
      ['S', 'P', 'R', 'I', 'N', 'G', 'B', 'L'],
      ['S', 'U', 'M', 'M', 'E', 'R', 'F', 'O'],
      ['A', 'U', 'T', 'U', 'M', 'N', 'R', 'O'],
      ['W', 'I', 'N', 'T', 'E', 'R', 'O', 'M'],
      ['F', 'R', 'O', 'S', 'T', 'B', 'S', 'S'],
      ['B', 'L', 'O', 'O', 'M', 'S', 'T', 'P'],
      ['S', 'U', 'M', 'M', 'E', 'R', 'A', 'R'],
      ['A', 'U', 'T', 'U', 'M', 'N', 'W', 'I']
    ]
  },
  {
    id: 'ws-relax',
    title: 'Relaxation',
    words: ['YOGA', 'BATH', 'BOOK', 'WALK', 'NAP', 'HUG'],
    grid: [
      ['Y', 'O', 'G', 'A', 'B', 'A', 'T', 'H'],
      ['B', 'O', 'O', 'K', 'W', 'A', 'L', 'K'],
      ['N', 'A', 'P', 'H', 'U', 'G', 'Y', 'O'],
      ['W', 'A', 'L', 'K', 'B', 'O', 'O', 'G'],
      ['B', 'A', 'T', 'H', 'N', 'A', 'P', 'A'],
      ['H', 'U', 'G', 'Y', 'O', 'G', 'A', 'B'],
      ['N', 'A', 'P', 'B', 'O', 'O', 'K', 'A'],
      ['W', 'A', 'L', 'K', 'H', 'U', 'G', 'T']
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
