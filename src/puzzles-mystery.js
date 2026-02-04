/**
 * Mini Mystery Puzzles
 * 
 * Cluedo-style logic puzzles - who did it, where, with what?
 * Simple enough to do in a few minutes, satisfying to solve.
 */

export const MYSTERY_PUZZLES = [
  {
    id: 'mystery-001',
    title: 'The Missing Biscuit',
    scenario: 'Someone ate the last chocolate digestive. The suspects are gathered in the kitchen.',
    suspects: ['Dad', 'The Cat', 'Next Door\'s Kid'],
    locations: ['Kitchen', 'Living Room', 'Garden'],
    items: ['Chocolate Crumbs', 'Muddy Footprints', 'Cat Hair'],
    clues: [
      'Dad was watching telly all afternoon.',
      'There are chocolate crumbs near the back door.',
      'The cat has been asleep on the sofa since lunch.',
      'Next door\'s kid was seen climbing over the fence earlier.',
      'There are muddy footprints leading from the garden.'
    ],
    solution: {
      who: 'Next Door\'s Kid',
      where: 'Garden',
      evidence: 'Muddy Footprints'
    },
    explanation: 'Next door\'s kid climbed over the fence, grabbed the biscuit, and escaped through the garden - leaving muddy footprints and crumbs by the back door!'
  },
  {
    id: 'mystery-002',
    title: 'The Case of the Remote Control',
    scenario: 'The TV remote has vanished. Again.',
    suspects: ['The Dog', 'Grandma', 'The Sofa Cushions'],
    locations: ['Under the Sofa', 'In the Kitchen', 'By the Window'],
    items: ['Chew Marks', 'Reading Glasses', 'Cushion Stuffing'],
    clues: [
      'Grandma says she last saw it during Countdown.',
      'There are chew marks on the coffee table leg.',
      'The dog looks suspiciously guilty.',
      'One sofa cushion is slightly askew.',
      'Grandma\'s reading glasses are by the window.'
    ],
    solution: {
      who: 'The Dog',
      where: 'Under the Sofa',
      evidence: 'Chew Marks'
    },
    explanation: 'The dog grabbed the remote (look at those guilty eyes!) and hid it under the sofa. Classic dog behaviour.'
  },
  {
    id: 'mystery-003',
    title: 'Who Finished the Milk?',
    scenario: 'There\'s an empty milk bottle in the fridge. Someone\'s in trouble.',
    suspects: ['Teenage Son', 'Dad', 'Mum'],
    locations: ['Kitchen', 'Home Office', 'Garage'],
    items: ['Cereal Bowl', 'Coffee Mug', 'Protein Shaker'],
    clues: [
      'Dad only drinks black coffee.',
      'There\'s an unwashed cereal bowl in the sink.',
      'Mum had toast for breakfast.',
      'The teenage son had three bowls of Weetabix.',
      'The protein shaker is in the dishwasher.'
    ],
    solution: {
      who: 'Teenage Son',
      where: 'Kitchen',
      evidence: 'Cereal Bowl'
    },
    explanation: 'Three bowls of Weetabix! That\'ll do it. The teenage son strikes again.'
  },
  {
    id: 'mystery-004',
    title: 'The Garden Gnome Incident',
    scenario: 'Gerald the garden gnome has been moved. He\'s now facing the wrong way.',
    suspects: ['The Postman', 'Mrs Henderson Next Door', 'The Wind'],
    locations: ['Front Garden', 'By the Bins', 'Near the Gate'],
    items: ['Muddy Shoe Print', 'Garden Glove', 'Windswept Leaves'],
    clues: [
      'The leaves on the path are undisturbed.',
      'There\'s a muddy shoe print near Gerald.',
      'Mrs Henderson was seen "admiring" her own gnome collection.',
      'The postman delivered at 7am when it was still dark.',
      'A garden glove was found by the gate.'
    ],
    solution: {
      who: 'Mrs Henderson Next Door',
      where: 'Front Garden',
      evidence: 'Garden Glove'
    },
    explanation: 'Mrs Henderson has been jealous of Gerald for years. She moved him to face her garden so she could admire him. The garden glove fell from her pocket.'
  },
  {
    id: 'mystery-005',
    title: 'The Thermostat Mystery',
    scenario: 'Someone has turned the heating up to 25°C. The gas bill weeps.',
    suspects: ['Nan', 'The Teenager', 'Dad'],
    locations: ['Hallway', 'Living Room', 'Upstairs Landing'],
    items: ['Woolly Cardigan', 'Phone Charger', 'Open Window'],
    clues: [
      'Dad has been complaining about the cost of energy.',
      'The teenager has their window wide open.',
      'Nan is wearing three cardigans.',
      'There\'s a woolly blanket on Nan\'s chair.',
      'The thermostat is at Nan\'s eye level in the hallway.'
    ],
    solution: {
      who: 'Nan',
      where: 'Hallway',
      evidence: 'Woolly Cardigan'
    },
    explanation: 'Despite wearing three cardigans and having a blanket, Nan is still cold. She\'s been at that thermostat again.'
  },
  {
    id: 'mystery-006',
    title: 'The Disappearing Leftovers',
    scenario: 'Someone ate the leftover Sunday roast that was clearly labelled "DO NOT EAT".',
    suspects: ['Brother', 'Flatmate', 'Yourself (Sleepwalking)'],
    locations: ['Kitchen', 'Living Room', 'Your Bedroom'],
    items: ['Gravy Stain', 'Empty Container', 'Netflix Pause'],
    clues: [
      'Your flatmate is vegetarian.',
      'There\'s a gravy stain on the sofa.',
      'Brother visited yesterday evening.',
      'Netflix shows something was paused at 11pm.',
      'The empty container is in the living room bin.'
    ],
    solution: {
      who: 'Brother',
      where: 'Living Room',
      evidence: 'Gravy Stain'
    },
    explanation: 'Brother came over, helped himself to your roast while watching Netflix, and left the evidence all over the sofa. Classic sibling behaviour.'
  },
  {
    id: 'mystery-007',
    title: 'Who Broke the Vase?',
    scenario: 'The ugly vase from Aunt Mildred is in pieces. Nobody saw anything.',
    suspects: ['The Children', 'The Cat', 'It Fell By Itself'],
    locations: ['Mantelpiece', 'Bookshelf', 'Windowsill'],
    items: ['Football', 'Cat Toy', 'Suspiciously Clean Spot'],
    clues: [
      'The children were playing football in the garden.',
      'A football was found under the sofa.',
      'The cat has been outside all day.',
      'There\'s a suspiciously clean spot on the mantelpiece.',
      'The window was closed.'
    ],
    solution: {
      who: 'The Children',
      where: 'Mantelpiece',
      evidence: 'Football'
    },
    explanation: 'The football came through an open door (or window) and knocked the vase off the mantelpiece. The kids hid the ball under the sofa. Classic.'
  },
  {
    id: 'mystery-008',
    title: 'The WiFi Password Paper',
    scenario: 'The paper with the WiFi password has gone missing. Guests are arriving.',
    suspects: ['The Cleaner', 'Last Week\'s Visitors', 'The Filing System'],
    locations: ['Kitchen Drawer', 'By the Router', 'In the Recycling'],
    items: ['Cleaning Spray', 'Coffee Cup Ring', 'Shredded Paper'],
    clues: [
      'The cleaner organised the kitchen drawer yesterday.',
      'There\'s a coffee cup ring on the router shelf.',
      'Last week\'s visitors asked for the password.',
      'The recycling went out this morning.',
      'There\'s shredded paper in the bin.'
    ],
    solution: {
      who: 'The Cleaner',
      where: 'In the Recycling',
      evidence: 'Shredded Paper'
    },
    explanation: 'The cleaner, in their enthusiasm, thought the tatty paper was rubbish and recycled it. Time to check the router for the default password.'
  },
  {
    id: 'mystery-009',
    title: 'The Mysterious Puddle',
    scenario: 'There\'s a puddle in the kitchen. Whodunit?',
    suspects: ['The Dog', 'Leaky Fridge', 'Someone\'s Wet Umbrella'],
    locations: ['By the Back Door', 'Near the Fridge', 'Under the Coat Rack'],
    items: ['Paw Prints', 'Ice Cube', 'Umbrella Drips'],
    clues: [
      'The dog looks innocent (too innocent).',
      'There\'s an ice cube tray defrosting on the counter.',
      'Nobody went out today - it\'s not raining.',
      'There\'s a trail of water from the fridge.',
      'No paw prints visible in the water.'
    ],
    solution: {
      who: 'Leaky Fridge',
      where: 'Near the Fridge',
      evidence: 'Ice Cube'
    },
    explanation: 'The fridge is defrosting! The ice cube tray is the giveaway. Time to check the temperature settings.'
  },
  {
    id: 'mystery-010',
    title: 'The Birthday Card Culprit',
    scenario: 'Someone forgot to sign Nan\'s birthday card. The card has already been given to her.',
    suspects: ['Uncle Bob', 'Cousin Sarah', 'You'],
    locations: ['Kitchen Table', 'In the Car', 'By the Front Door'],
    items: ['Pen Left Behind', 'Rushed Handwriting', 'Coffee Spill on Card'],
    clues: [
      'You definitely remember signing it.',
      'Uncle Bob never signs cards - he just writes "Bob".',
      'There\'s no "Bob" on the card.',
      'Cousin Sarah was running late and left in a rush.',
      'There\'s a pen on the floor by the front door.'
    ],
    solution: {
      who: 'Cousin Sarah',
      where: 'By the Front Door',
      evidence: 'Pen Left Behind'
    },
    explanation: 'Cousin Sarah grabbed the card on her way out, intending to sign it, but was in such a rush she dropped the pen and forgot. Classic Sarah.'
  },
  {
    id: 'mystery-011',
    title: 'The Suspicious Sandwich',
    scenario: 'Someone made a sandwich and left a huge mess in the kitchen. Crumbs everywhere.',
    suspects: ['Teenage Daughter', 'Dad', 'The Lodger'],
    locations: ['Kitchen Counter', 'Dining Table', 'Living Room'],
    items: ['Peanut Butter Jar', 'Bread Bag Left Open', 'Dirty Knife'],
    clues: [
      'Dad is allergic to peanuts.',
      'The lodger hasn\'t been home all day.',
      'There\'s peanut butter on the kitchen counter.',
      'The teenage daughter\'s school bag is by the front door.',
      'There\'s a dirty knife with peanut butter on it in the sink.'
    ],
    solution: {
      who: 'Teenage Daughter',
      where: 'Kitchen Counter',
      evidence: 'Peanut Butter Jar'
    },
    explanation: 'The teenage daughter came home from school, made herself a peanut butter sandwich in a rush, and left the evidence all over the counter. Dad can\'t eat peanuts and the lodger was out.'
  },
  {
    id: 'mystery-012',
    title: 'The Moved Garden Chair',
    scenario: 'The favourite garden chair has been moved from the patio to under the apple tree.',
    suspects: ['Next Door\'s Cat', 'The Window Cleaner', 'Mum'],
    locations: ['Under the Apple Tree', 'By the Shed', 'On the Patio'],
    items: ['Book Left on Seat', 'Cat Fur', 'Window Cleaner\'s Card'],
    clues: [
      'There\'s a novel face-down on the chair seat.',
      'The window cleaner came on Tuesday but today is Thursday.',
      'Mum said she was "just popping outside for a minute" earlier.',
      'The cat is sleeping on the fence.',
      'There\'s a cup of cold tea on the arm of the chair.'
    ],
    solution: {
      who: 'Mum',
      where: 'Under the Apple Tree',
      evidence: 'Book Left on Seat'
    },
    explanation: 'Mum dragged her chair to a shady spot under the apple tree and had a sneaky sit-down with her book and a cuppa. Good for her.'
  },
  {
    id: 'mystery-013',
    title: 'The Empty Biscuit Tin',
    scenario: 'The special occasion biscuit tin is empty. These were the posh ones.',
    suspects: ['Grandad', 'The Dog', 'Visiting Auntie'],
    locations: ['Kitchen', 'Conservatory', 'Front Room'],
    items: ['Crumb Trail', 'Empty Wrapper', 'Dog Biscuit Swap'],
    clues: [
      'The dog has been in the garden all afternoon.',
      'Grandad was in the conservatory reading his paper.',
      'Visiting Auntie said the biscuits were "absolutely lovely".',
      'There\'s a trail of crumbs from the kitchen to the front room.',
      'An empty wrapper was found behind the cushion in the front room.'
    ],
    solution: {
      who: 'Visiting Auntie',
      where: 'Front Room',
      evidence: 'Empty Wrapper'
    },
    explanation: 'Visiting Auntie helped herself to the posh biscuits while watching telly in the front room. She tried to hide the wrapper behind the cushion. We saw that, Auntie.'
  },
  {
    id: 'mystery-014',
    title: 'The Parking Space Pincher',
    scenario: 'Someone parked in your usual parking space. There\'s a mystery car there.',
    suspects: ['Delivery Driver', 'New Neighbour', 'Estate Agent'],
    locations: ['Your Space', 'Visitor Bay', 'On the Kerb'],
    items: ['Takeaway Menu', 'For Sale Sign', 'Moving Boxes'],
    clues: [
      'There are no takeaway menus on any windscreens today.',
      'Number 14 has had viewings all week.',
      'There are moving boxes visible in the mystery car.',
      'The new people at number 12 moved in yesterday.',
      'An estate agent\'s card was found on the pavement.'
    ],
    solution: {
      who: 'New Neighbour',
      where: 'Your Space',
      evidence: 'Moving Boxes'
    },
    explanation: 'The new neighbours at number 12 don\'t know the unwritten parking rules yet. The moving boxes in their car are the giveaway. Time for a friendly chat.'
  },
  {
    id: 'mystery-015',
    title: 'The Late Night Noise',
    scenario: 'Something crashed in the kitchen at midnight. Everyone claims they were asleep.',
    suspects: ['The Cat', 'Sleepwalking Son', 'The Wind'],
    locations: ['Kitchen Counter', 'By the Window', 'Near the Fridge'],
    items: ['Broken Mug', 'Cat Treats Bag', 'Open Window'],
    clues: [
      'A mug is broken on the kitchen floor.',
      'The kitchen window was found slightly open.',
      'The cat treats bag has been knocked off the counter.',
      'There are no muddy footprints anywhere.',
      'The cat is sitting in the broken mug spot looking pleased with itself.'
    ],
    solution: {
      who: 'The Cat',
      where: 'Kitchen Counter',
      evidence: 'Cat Treats Bag'
    },
    explanation: 'The cat jumped on the counter to get at the treats bag, knocked the mug off in the process, and is now sitting in the crime scene with zero remorse. Classic cat.'
  },
  {
    id: 'mystery-016',
    title: 'The Mysterious Muddy Boots',
    scenario: 'A pair of very muddy wellies has appeared in the hallway. Nobody will own up.',
    suspects: ['Eldest Child', 'Dad', 'The Dog Walker'],
    locations: ['Hallway', 'Back Porch', 'Garden Shed'],
    items: ['Football', 'Lead and Ball Chucker', 'Garden Trowel'],
    clues: [
      'The dog walker comes at 3pm but it\'s only 11am.',
      'Dad says he\'s been working from home all day.',
      'There\'s a muddy football in the garden.',
      'The eldest child\'s school called to say they have an inset day.',
      'There\'s a garden trowel clean and dry in the shed.'
    ],
    solution: {
      who: 'Eldest Child',
      where: 'Hallway',
      evidence: 'Football'
    },
    explanation: 'The eldest child, off school on an inset day, went out for a kickabout in the muddy garden and dumped the wellies in the hall. The muddy football confirms it.'
  },
  {
    id: 'mystery-017',
    title: 'The Changed Radio Station',
    scenario: 'Someone changed the kitchen radio from Radio 2 to Radio 1. This is serious.',
    suspects: ['Teenage Niece', 'The Plumber', 'Dad'],
    locations: ['Kitchen', 'Utility Room', 'Garage'],
    items: ['Phone Charger', 'Spanner', 'Dance Shoes'],
    clues: [
      'Dad only listens to Radio 4 or Classic FM.',
      'The plumber was fixing the boiler in the utility room.',
      'Teenage niece came over for lunch.',
      'There\'s a phone charger plugged in by the radio.',
      'The plumber left at 10am before the radio was changed.'
    ],
    solution: {
      who: 'Teenage Niece',
      where: 'Kitchen',
      evidence: 'Phone Charger'
    },
    explanation: 'The teenage niece changed the station while making lunch and left her phone charger behind as evidence. Radio 2 has been restored. Order is maintained.'
  },
  {
    id: 'mystery-018',
    title: 'The Missing TV Guide',
    scenario: 'The TV guide has vanished. Without it, how will anyone know what\'s on?',
    suspects: ['The Recycling Bin', 'Under the Cat', 'In the Bathroom'],
    locations: ['Living Room', 'Kitchen', 'Bathroom'],
    items: ['Recycling Box', 'Cat Bed', 'Reading Glasses'],
    clues: [
      'The recycling was taken out this morning.',
      'The cat is sitting on something in her bed.',
      'Someone\'s reading glasses are in the bathroom.',
      'The recycling box is empty - the bin men came.',
      'The cat looks unusually comfortable and slightly higher up than normal.'
    ],
    solution: {
      who: 'Under the Cat',
      where: 'Living Room',
      evidence: 'Cat Bed'
    },
    explanation: 'The TV guide slid off the sofa and the cat has claimed it as a mattress topper. She\'s been sitting on it all afternoon. Move the cat, find the guide.'
  },
  {
    id: 'mystery-019',
    title: 'The Shrinking Chocolate Bar',
    scenario: 'The big chocolate bar in the fridge is definitely smaller than it was yesterday.',
    suspects: ['Partner', 'You', 'The Kids'],
    locations: ['Kitchen', 'Bedroom', 'Living Room'],
    items: ['Wrapper in Bin', 'Chocolate Fingerprint', 'Hidden Stash'],
    clues: [
      'There\'s a chocolate wrapper in the bedroom bin.',
      'The kids were at school all day.',
      'You don\'t remember eating any (but you were tired).',
      'Your partner came to bed late last night.',
      'There\'s a chocolate fingerprint on the TV remote.'
    ],
    solution: {
      who: 'Partner',
      where: 'Bedroom',
      evidence: 'Wrapper in Bin'
    },
    explanation: 'Your partner had a midnight chocolate session in bed. The wrapper in the bedroom bin and the chocolatey remote are damning evidence. Fair enough though - they probably needed it.'
  },
  {
    id: 'mystery-020',
    title: 'The Unplugged Phone Charger',
    scenario: 'Your phone charger has been unplugged and something else is in its place.',
    suspects: ['Partner', 'Teenage Son', 'Cleaner'],
    locations: ['Bedside Table', 'Kitchen Counter', 'Landing'],
    items: ['Gaming Controller', 'Vacuum Lead', 'Laptop Charger'],
    clues: [
      'The cleaner wasn\'t in today.',
      'There\'s a gaming controller charging where your phone should be.',
      'The teenage son\'s phone is at 100%.',
      'Your partner\'s laptop is charging in the kitchen.',
      'The gaming controller is low on battery.'
    ],
    solution: {
      who: 'Teenage Son',
      where: 'Bedside Table',
      evidence: 'Gaming Controller'
    },
    explanation: 'The teenage son needed to charge his controller urgently for an online game. Your charger was sacrificed for the cause. His phone is suspiciously fully charged though - he planned ahead for himself.'
  },
];

/**
 * Get a random mystery puzzle
 */
export function getRandomMystery(excludeIds = []) {
  const available = MYSTERY_PUZZLES.filter(p => !excludeIds.includes(p.id));
  if (available.length === 0) return MYSTERY_PUZZLES[Math.floor(Math.random() * MYSTERY_PUZZLES.length)];
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Check if the solution is correct
 */
export function checkMysteryAnswer(puzzle, answer) {
  return (
    answer.who === puzzle.solution.who &&
    answer.where === puzzle.solution.where &&
    answer.evidence === puzzle.solution.evidence
  );
}
