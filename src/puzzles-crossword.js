/**
 * Mini Crosswords
 * 
 * 5x5 grids with gentle, accessible clues
 * Not cryptic - just satisfying wordplay
 */

export const MINI_CROSSWORDS = [
  {
    id: 'cross-001',
    title: 'Cosy Comforts',
    grid: [
      ['S', 'O', 'F', 'A', '#'],
      ['L', '#', 'I', '#', 'T'],
      ['E', 'A', 'R', 'T', 'E'],
      ['E', '#', 'E', '#', 'A'],
      ['P', 'E', 'A', 'C', 'E']
    ],
    across: [
      { number: 1, clue: 'Sit back on this (4)', answer: 'SOFA', row: 0, col: 0 },
      { number: 3, clue: 'Planet we live on (5)', answer: 'EARTH', row: 2, col: 0 },
      { number: 4, clue: 'Quiet calm (5)', answer: 'PEACE', row: 4, col: 0 }
    ],
    down: [
      { number: 1, clue: 'What you need after a long day (5)', answer: 'SLEEP', row: 0, col: 0 },
      { number: 2, clue: 'Chimney warmth (4)', answer: 'FIRE', row: 0, col: 2 },
      { number: 3, clue: 'Cup of ___ (3)', answer: 'TEA', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-002',
    title: 'Garden Life',
    grid: [
      ['R', 'O', 'S', 'E', '#'],
      ['O', '#', 'U', '#', 'B'],
      ['B', 'I', 'N', 'G', 'E'],
      ['I', '#', 'S', '#', 'E'],
      ['N', 'E', 'S', 'T', 'S']
    ],
    across: [
      { number: 1, clue: 'Red flower with thorns (4)', answer: 'ROSE', row: 0, col: 0 },
      { number: 3, clue: 'Watch too much TV (5)', answer: 'BINGE', row: 2, col: 0 },
      { number: 4, clue: 'Where birds live (5)', answer: 'NESTS', row: 4, col: 0 }
    ],
    down: [
      { number: 1, clue: 'Redbreast bird (5)', answer: 'ROBIN', row: 0, col: 0 },
      { number: 2, clue: 'Bright yellow ball in sky (3)', answer: 'SUN', row: 0, col: 2 },
      { number: 3, clue: 'Buzzy insects (4)', answer: 'BEES', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-003',
    title: 'Kitchen Time',
    grid: [
      ['B', 'R', 'E', 'A', 'D'],
      ['A', '#', 'G', '#', 'I'],
      ['K', 'E', 'G', 'S', 'S'],
      ['E', '#', 'S', '#', 'H'],
      ['#', 'C', 'U', 'P', 'S']
    ],
    across: [
      { number: 1, clue: 'Toast starts as this (5)', answer: 'BREAD', row: 0, col: 0 },
      { number: 3, clue: 'Beer barrels (4)', answer: 'KEGS', row: 2, col: 0 },
      { number: 4, clue: 'Tea goes in these (4)', answer: 'CUPS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Oven creation (4)', answer: 'BAKE', row: 0, col: 0 },
      { number: 2, clue: 'Morning meal (4)', answer: 'EGGS', row: 0, col: 2 },
      { number: 3, clue: 'Plates, bowls, cups (6)', answer: 'DISHES', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-004',
    title: 'Rainy Day',
    grid: [
      ['C', 'L', 'O', 'U', 'D'],
      ['O', '#', 'V', '#', 'R'],
      ['A', 'R', 'E', 'N', 'A'],
      ['T', '#', 'R', '#', 'P'],
      ['#', 'W', 'E', 'T', '#']
    ],
    across: [
      { number: 1, clue: 'Rain comes from this (5)', answer: 'CLOUD', row: 0, col: 0 },
      { number: 3, clue: 'Sports stadium (5)', answer: 'ARENA', row: 2, col: 0 },
      { number: 4, clue: 'Opposite of dry (3)', answer: 'WET', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Keep dry in rain (4)', answer: 'COAT', row: 0, col: 0 },
      { number: 2, clue: 'Across, atop (4)', answer: 'OVER', row: 0, col: 2 },
      { number: 3, clue: 'Water falling from sky (4)', answer: 'DRIP', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-005',
    title: 'Evening In',
    grid: [
      ['F', 'I', 'L', 'M', 'S'],
      ['I', '#', 'A', '#', 'O'],
      ['R', 'E', 'M', 'O', 'F'],
      ['E', '#', 'P', '#', 'A'],
      ['#', 'B', 'E', 'D', '#']
    ],
    across: [
      { number: 1, clue: 'Movies to watch (5)', answer: 'FILMS', row: 0, col: 0 },
      { number: 3, clue: 'TV control (5)', answer: 'REMOTE', row: 2, col: 0 },
      { number: 4, clue: 'Where you sleep (3)', answer: 'BED', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Flames (4)', answer: 'FIRE', row: 0, col: 0 },
      { number: 2, clue: 'Light for reading (4)', answer: 'LAMP', row: 0, col: 2 },
      { number: 3, clue: 'Comfy seat (4)', answer: 'SOFA', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-006',
    title: 'Sweet Treats',
    grid: [
      ['C', 'A', 'K', 'E', 'S'],
      ['H', '#', 'I', '#', 'U'],
      ['O', 'R', 'E', 'O', 'G'],
      ['C', '#', 'V', '#', 'A'],
      ['#', 'J', 'A', 'M', 'R']
    ],
    across: [
      { number: 1, clue: 'Birthday treats (5)', answer: 'CAKES', row: 0, col: 0 },
      { number: 3, clue: 'Black and white biscuit (4)', answer: 'OREO', row: 2, col: 0 },
      { number: 4, clue: 'Fruit preserve (3)', answer: 'JAM', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Sweet brown treat (4)', answer: 'CHOC', row: 0, col: 0 },
      { number: 2, clue: 'Famous brand of Kipling (4)', answer: 'KIEV', row: 0, col: 2 },
      { number: 3, clue: 'Sweet white stuff (5)', answer: 'SUGAR', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-007',
    title: 'At the Beach',
    grid: [
      ['S', 'A', 'N', 'D', '#'],
      ['U', '#', 'E', '#', 'W'],
      ['N', 'E', 'T', 'S', 'A'],
      ['S', '#', 'S', '#', 'V'],
      ['#', 'S', 'E', 'A', 'S']
    ],
    across: [
      { number: 1, clue: 'Beach grains (4)', answer: 'SAND', row: 0, col: 0 },
      { number: 3, clue: 'Fishing equipment (4)', answer: 'NETS', row: 2, col: 0 },
      { number: 4, clue: 'Oceans (4)', answer: 'SEAS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Bright in the sky (4)', answer: 'SUNS', row: 0, col: 0 },
      { number: 2, clue: 'Bird homes (5)', answer: 'NESTS', row: 0, col: 2 },
      { number: 3, clue: 'Ocean movement (4)', answer: 'WAVE', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-008',
    title: 'Morning Routine',
    grid: [
      ['W', 'A', 'K', 'E', '#'],
      ['A', '#', 'E', '#', 'T'],
      ['S', 'H', 'O', 'W', 'E'],
      ['H', '#', 'T', '#', 'A'],
      ['#', 'C', 'U', 'P', 'S']
    ],
    across: [
      { number: 1, clue: 'Get up (4)', answer: 'WAKE', row: 0, col: 0 },
      { number: 3, clue: 'Morning wash (5)', answer: 'SHOWE', row: 2, col: 0 },
      { number: 4, clue: 'Mugs for drinks (4)', answer: 'CUPS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Clean clothes (4)', answer: 'WASH', row: 0, col: 0 },
      { number: 2, clue: 'Hot water pot (6)', answer: 'KETTLE', row: 0, col: 2 },
      { number: 3, clue: 'Morning cuppa (3)', answer: 'TEA', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-009',
    title: 'Book Corner',
    grid: [
      ['R', 'E', 'A', 'D', '#'],
      ['E', '#', 'U', '#', 'P'],
      ['S', 'T', 'O', 'R', 'A'],
      ['T', '#', 'R', '#', 'G'],
      ['#', 'N', 'O', 'V', 'E']
    ],
    across: [
      { number: 1, clue: 'What you do with books (4)', answer: 'READ', row: 0, col: 0 },
      { number: 3, clue: 'Tale or narrative (5)', answer: 'STORY', row: 2, col: 0 },
      { number: 4, clue: 'Long fiction book (4)', answer: 'NOVE', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Take a break (4)', answer: 'REST', row: 0, col: 0 },
      { number: 2, clue: 'Writer\'s name (6)', answer: 'AUTHOR', row: 0, col: 2 },
      { number: 3, clue: 'Book sheets (4)', answer: 'PAGE', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-010',
    title: 'Pet Corner',
    grid: [
      ['D', 'O', 'G', 'S', '#'],
      ['I', '#', 'O', '#', 'C'],
      ['S', 'T', 'A', 'R', 'A'],
      ['H', '#', 'T', '#', 'T'],
      ['#', 'P', 'U', 'R', 'R']
    ],
    across: [
      { number: 1, clue: 'Man\'s best friends (4)', answer: 'DOGS', row: 0, col: 0 },
      { number: 3, clue: 'Night sky twinkler (4)', answer: 'STAR', row: 2, col: 0 },
      { number: 4, clue: 'Happy cat sound (4)', answer: 'PURR', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Plates and bowls (4)', answer: 'DISH', row: 0, col: 0 },
      { number: 2, clue: 'Farm animal (4)', answer: 'GOAT', row: 0, col: 2 },
      { number: 3, clue: 'Feline friends (4)', answer: 'CATS', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-011',
    title: 'Music Time',
    grid: [
      ['S', 'O', 'N', 'G', '#'],
      ['I', '#', 'O', '#', 'B'],
      ['N', 'O', 'T', 'E', 'A'],
      ['G', '#', 'E', '#', 'N'],
      ['#', 'D', 'R', 'U', 'D']
    ],
    across: [
      { number: 1, clue: 'Musical piece (4)', answer: 'SONG', row: 0, col: 0 },
      { number: 3, clue: 'Musical symbol (4)', answer: 'NOTE', row: 2, col: 0 },
      { number: 4, clue: 'Percussion instrument (4)', answer: 'DRUM', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Vocal performance (4)', answer: 'SING', row: 0, col: 0 },
      { number: 2, clue: 'Written music (5)', answer: 'NOTES', row: 0, col: 2 },
      { number: 3, clue: 'Musical group (4)', answer: 'BAND', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-012',
    title: 'Teatime',
    grid: [
      ['S', 'C', 'O', 'N', 'E'],
      ['U', '#', 'A', '#', 'A'],
      ['G', 'R', 'T', 'S', 'R'],
      ['A', '#', 'S', '#', 'L'],
      ['R', 'O', 'L', 'L', 'S']
    ],
    across: [
      { number: 1, clue: 'Cream tea essential (5)', answer: 'SCONE', row: 0, col: 0 },
      { number: 3, clue: 'Porridge ingredient (4)', answer: 'OATS', row: 2, col: 1 },
      { number: 4, clue: 'Bread shapes (5)', answer: 'ROLLS', row: 4, col: 0 }
    ],
    down: [
      { number: 1, clue: 'Sweet stuff (5)', answer: 'SUGAR', row: 0, col: 0 },
      { number: 2, clue: 'Breakfast grain (4)', answer: 'OATS', row: 0, col: 2 },
      { number: 3, clue: 'Sooner (5)', answer: 'EARLY', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-013',
    title: 'Weather Watch',
    grid: [
      ['R', 'A', 'I', 'N', '#'],
      ['I', '#', 'C', '#', 'F'],
      ['S', 'N', 'O', 'W', 'O'],
      ['E', '#', 'L', '#', 'G'],
      ['#', 'H', 'A', 'I', 'L']
    ],
    across: [
      { number: 1, clue: 'Wet weather (4)', answer: 'RAIN', row: 0, col: 0 },
      { number: 3, clue: 'White winter blanket (4)', answer: 'SNOW', row: 2, col: 0 },
      { number: 4, clue: 'Icy balls from the sky (4)', answer: 'HAIL', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Sun goes up (4)', answer: 'RISE', row: 0, col: 0 },
      { number: 2, clue: 'Frozen water (3)', answer: 'ICE', row: 0, col: 2 },
      { number: 3, clue: 'Misty weather (3)', answer: 'FOG', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-014',
    title: 'Pub Night',
    grid: [
      ['B', 'E', 'E', 'R', '#'],
      ['A', '#', 'A', '#', 'P'],
      ['R', 'O', 'U', 'N', 'I'],
      ['S', '#', 'S', '#', 'N'],
      ['#', 'L', 'E', 'G', 'S']
    ],
    across: [
      { number: 1, clue: 'Pub drink (4)', answer: 'BEER', row: 0, col: 0 },
      { number: 3, clue: 'Whose turn? Buy a ___ (5)', answer: 'ROUND', row: 2, col: 0 },
      { number: 4, clue: 'Table supports (4)', answer: 'LEGS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Where drinks are served (4)', answer: 'BARS', row: 0, col: 0 },
      { number: 2, clue: 'Hear with these (4)', answer: 'EARS', row: 0, col: 2 },
      { number: 3, clue: 'Half of beer (4)', answer: 'PINT', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-015',
    title: 'Holiday Time',
    grid: [
      ['P', 'A', 'C', 'K', '#'],
      ['L', '#', 'A', '#', 'R'],
      ['A', 'W', 'N', 'E', 'E'],
      ['N', '#', 'E', '#', 'S'],
      ['#', 'S', 'U', 'N', 'T']
    ],
    across: [
      { number: 1, clue: 'Fill your suitcase (4)', answer: 'PACK', row: 0, col: 0 },
      { number: 3, clue: 'Overhead shelter (5)', answer: 'AWNER', row: 2, col: 0 },
      { number: 4, clue: 'Beach light (3)', answer: 'SUN', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Itinerary (4)', answer: 'PLAN', row: 0, col: 0 },
      { number: 2, clue: 'Walking stick (4)', answer: 'CANE', row: 0, col: 2 },
      { number: 3, clue: 'Relaxation (4)', answer: 'REST', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-016',
    title: 'Autumn Days',
    grid: [
      ['L', 'E', 'A', 'F', '#'],
      ['O', '#', 'C', '#', 'W'],
      ['G', 'U', 'S', 'T', 'I'],
      ['S', '#', 'E', '#', 'N'],
      ['#', 'D', 'A', 'M', 'D']
    ],
    across: [
      { number: 1, clue: 'Falls from trees (4)', answer: 'LEAF', row: 0, col: 0 },
      { number: 3, clue: 'Blowy weather (5)', answer: 'GUSTI', row: 2, col: 0 },
      { number: 4, clue: 'Moist (4)', answer: 'DAMP', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Wooden pieces (4)', answer: 'LOGS', row: 0, col: 0 },
      { number: 2, clue: 'Playing card type (4)', answer: 'ACES', row: 0, col: 2 },
      { number: 3, clue: 'Blowy season (4)', answer: 'WIND', row: 1, col: 4 }
    ]
  },
  {
    id: 'cross-017',
    title: 'Seaside Fun',
    grid: [
      ['W', 'A', 'V', 'E', 'S'],
      ['A', '#', 'I', '#', 'H'],
      ['D', 'I', 'N', 'E', 'E'],
      ['E', '#', 'E', '#', 'L'],
      ['#', 'P', 'S', 'S', 'L']
    ],
    across: [
      { number: 1, clue: 'Ocean movers (5)', answer: 'WAVES', row: 0, col: 0 },
      { number: 3, clue: 'Eat out (4)', answer: 'DINE', row: 2, col: 0 },
      { number: 4, clue: 'Garden tool (4)', answer: 'PSSL', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Walk through water (4)', answer: 'WADE', row: 0, col: 0 },
      { number: 2, clue: 'Grape plant (4)', answer: 'VINE', row: 0, col: 2 },
      { number: 3, clue: 'Sea creature home (5)', answer: 'SHELL', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-018',
    title: 'Sunday Best',
    grid: [
      ['R', 'O', 'A', 'S', 'T'],
      ['E', '#', 'P', '#', 'A'],
      ['S', 'A', 'U', 'C', 'T'],
      ['T', '#', 'D', '#', 'S'],
      ['#', 'P', 'E', 'A', 'S']
    ],
    across: [
      { number: 1, clue: 'Sunday dinner centrepiece (5)', answer: 'ROAST', row: 0, col: 0 },
      { number: 3, clue: 'Gravy is one (5)', answer: 'SAUCE', row: 2, col: 0 },
      { number: 4, clue: 'Green veg (4)', answer: 'PEAS', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'After-dinner nap (4)', answer: 'REST', row: 0, col: 0 },
      { number: 2, clue: 'Crumble fruit (5)', answer: 'APPLE', row: 0, col: 2 },
      { number: 3, clue: 'Flavour finders (5)', answer: 'TASTE', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-019',
    title: 'Cosy Night In',
    grid: [
      ['D', 'U', 'V', 'E', 'T'],
      ['I', '#', 'I', '#', 'O'],
      ['S', 'H', 'E', 'D', 'A'],
      ['C', '#', 'W', '#', 'S'],
      ['#', 'B', 'E', 'N', 'T']
    ],
    across: [
      { number: 1, clue: 'Bed cover (5)', answer: 'DUVET', row: 0, col: 0 },
      { number: 3, clue: 'Garden building (4)', answer: 'SHED', row: 2, col: 0 },
      { number: 4, clue: 'Not straight (4)', answer: 'BENT', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Record (4)', answer: 'DISC', row: 0, col: 0 },
      { number: 2, clue: 'Opinion (4)', answer: 'VIEW', row: 0, col: 2 },
      { number: 3, clue: 'Breakfast bread (5)', answer: 'TOAST', row: 0, col: 4 }
    ]
  },
  {
    id: 'cross-020',
    title: 'Park Life',
    grid: [
      ['D', 'U', 'C', 'K', 'S'],
      ['O', '#', 'O', '#', 'W'],
      ['G', 'A', 'T', 'E', 'A'],
      ['S', '#', 'E', '#', 'N'],
      ['#', 'P', 'A', 'T', 'H']
    ],
    across: [
      { number: 1, clue: 'Pond birds (5)', answer: 'DUCKS', row: 0, col: 0 },
      { number: 3, clue: 'Park entrance (4)', answer: 'GATE', row: 2, col: 0 },
      { number: 4, clue: 'Walking trail (4)', answer: 'PATH', row: 4, col: 1 }
    ],
    down: [
      { number: 1, clue: 'Faithful friends (4)', answer: 'DOGS', row: 0, col: 0 },
      { number: 2, clue: 'Winter jacket (4)', answer: 'COAT', row: 0, col: 2 },
      { number: 3, clue: 'Graceful bird (4)', answer: 'SWAN', row: 0, col: 4 }
    ]
  },
];

/**
 * Get a crossword that hasn't been completed recently
 */
export function getRandomCrossword(completedIds = []) {
  const available = MINI_CROSSWORDS.filter(c => !completedIds.includes(c.id));
  if (available.length === 0) {
    // All done - start over with a random one
    return MINI_CROSSWORDS[Math.floor(Math.random() * MINI_CROSSWORDS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Check if a word answer is correct
 */
export function checkWord(crossword, direction, number, answer) {
  const clues = direction === 'across' ? crossword.across : crossword.down;
  const clue = clues.find(c => c.number === number);
  if (!clue) return false;
  return answer.toUpperCase() === clue.answer;
}

/**
 * Check if entire crossword is complete
 */
export function isCrosswordComplete(crossword, answers) {
  // answers is an object like { 'across-1': 'SOFA', 'down-2': 'FIRE', ... }
  for (const clue of crossword.across) {
    if (answers[`across-${clue.number}`]?.toUpperCase() !== clue.answer) {
      return false;
    }
  }
  for (const clue of crossword.down) {
    if (answers[`down-${clue.number}`]?.toUpperCase() !== clue.answer) {
      return false;
    }
  }
  return true;
}
