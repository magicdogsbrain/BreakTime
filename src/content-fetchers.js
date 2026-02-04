import { putMany, getAll, getState, setState } from './db.js';

// ===========================================
// CONFIGURATION - Change these to your own!
// ===========================================

// Unsplash API: Free at https://unsplash.com/developers (50 req/hour free tier)
// Leave empty to use only bundled content
const UNSPLASH_ACCESS_KEY = '';

// CORS Proxy: needed to fetch RSS feeds from the browser
// Default uses allorigins.win (free, no key needed)
// Alternatives: 'https://corsproxy.io/?url=' or your own Cloudflare Worker
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// RSS feeds for positive/uplifting news stories
const RSS_FEEDS = [
  'https://www.goodnewsnetwork.org/feed/',
  'https://www.positive.news/feed/',
  'https://www.sunnyskyz.com/feed',
  'https://dailygood.org/rss.php'
];

// Calm search terms for Unsplash images
const CALM_TOPICS = [
  'peaceful nature',
  'calm water',
  'forest light',
  'gentle morning',
  'quiet landscape',
  'soft clouds',
  'meadow flowers',
  'misty mountains',
  'lavender field',
  'cherry blossom',
  'sunset beach',
  'autumn leaves'
];

/**
 * Fetch calming images from Unsplash (only if API key is configured)
 */
export async function fetchImages(count = 10) {
  if (!navigator.onLine || !UNSPLASH_ACCESS_KEY) return false;

  const lastFetch = await getState('lastImageFetch', 0);
  const oneDay = 24 * 60 * 60 * 1000;
  if (Date.now() - lastFetch < oneDay) return false;

  try {
    const topic = CALM_TOPICS[Math.floor(Math.random() * CALM_TOPICS.length)];
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(topic)}&count=${count}&orientation=portrait`,
      { headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );

    if (!response.ok) return false;

    const photos = await response.json();
    const images = photos.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.small,
      alt: photo.alt_description || 'A calming image',
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      color: photo.color,
      fetchedAt: Date.now()
    }));

    await putMany('images', images);
    await setState('lastImageFetch', Date.now());
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch positive news from RSS feeds
 */
export async function fetchStories() {
  if (!navigator.onLine || !CORS_PROXY) return false;

  const lastFetch = await getState('lastStoryFetch', 0);
  const sixHours = 6 * 60 * 60 * 1000;
  if (Date.now() - lastFetch < sixHours) return false;

  try {
    const stories = [];

    for (const feedUrl of RSS_FEEDS) {
      try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(feedUrl), {
          signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) continue;
        const text = await response.text();
        const parsed = parseRSS(text);
        stories.push(...parsed);
      } catch (e) {
        // Silently continue if a feed fails
      }
    }

    if (stories.length > 0) {
      const latest = stories
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 30)
        .map(story => ({ ...story, fetchedAt: Date.now() }));

      await putMany('stories', latest);
      await setState('lastStoryFetch', Date.now());
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Simple RSS parser
 */
function parseRSS(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const items = doc.querySelectorAll('item');

  return Array.from(items).map((item, index) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';

    const cleanDescription = description.replace(/<[^>]*>/g, '').trim();

    return {
      id: `story-${Date.now()}-${index}`,
      title: title.trim(),
      description: cleanDescription.slice(0, 200) + (cleanDescription.length > 200 ? '...' : ''),
      link,
      pubDate
    };
  });
}

/**
 * Fetch quotes from ZenQuotes
 */
export async function fetchQuotes() {
  if (!navigator.onLine) return false;
  
  const existingQuotes = await getAll('quotes');
  // Only fetch if we have fewer than 20 quotes
  if (existingQuotes.length >= 20) {
    return false;
  }
  
  try {
    // ZenQuotes returns 50 quotes per call
    const response = await fetch('https://zenquotes.io/api/quotes');
    if (!response.ok) return false;
    
    const quotes = await response.json();
    const formatted = quotes.map((q, i) => ({
      id: `quote-${Date.now()}-${i}`,
      text: q.q,
      author: q.a,
      fetchedAt: Date.now()
    }));
    
    await putMany('quotes', formatted);
    return true;
  } catch (e) {
    console.log('Quote fetch failed', e);
    return false;
  }
}

/**
 * Bundled fallback quotes - these work offline always
 * Specifically chosen for carers - not generic inspiration
 * 110 quotes = 11 per day for 10 days without repeats
 */
export const FALLBACK_QUOTES = [
  // For the exhausted
  { text: "You're doing something incredibly hard. It's okay if that's all you do today.", author: "Unknown" },
  { text: "Rest is not giving up. Rest is how you keep going.", author: "Unknown" },
  { text: "You can't pour from an empty cup, but sometimes you have to anyway. Be gentle with yourself.", author: "Unknown" },
  { text: "Some days the bravest thing you can do is just keep breathing.", author: "Unknown" },
  { text: "You are not failing. You are showing up, again and again.", author: "Unknown" },
  { text: "Three hours sleep. Still standing. That counts.", author: "Unknown" },
  { text: "The house is messy. Everyone is fed. You did enough.", author: "Unknown" },
  { text: "Your exhaustion is not a character flaw.", author: "Unknown" },
  { text: "You got through yesterday. You'll get through today too.", author: "Unknown" },
  { text: "Sleep when you can. Eat when you remember. That's enough for now.", author: "Unknown" },
  { text: "Some days are just about making it to bedtime. And that's fine.", author: "Unknown" },
  { text: "You don't need to earn rest. You just need it.", author: "Unknown" },
  { text: "If all you did today was hold things together, that took everything.", author: "Unknown" },
  { text: "Tired isn't lazy. Tired is tired.", author: "Unknown" },
  { text: "The fact that you worry about doing enough proves you're doing more than enough.", author: "Unknown" },

  // For the emotional days
  { text: "It's okay to feel two things at once. Love and exhaustion. Devotion and resentment. Hope and grief.", author: "Unknown" },
  { text: "Your feelings are valid. All of them.", author: "Unknown" },
  { text: "You're allowed to miss your old life while still loving the person you care for.", author: "Unknown" },
  { text: "You're allowed to grieve someone who's still here.", author: "Unknown" },
  { text: "Crying isn't weakness. It's what happens when you've been strong for too long.", author: "Unknown" },
  { text: "You don't have to understand your feelings to feel them.", author: "Unknown" },
  { text: "It's okay to not be okay while making everything okay for someone else.", author: "Unknown" },
  { text: "Some feelings don't need fixing. They just need feeling.", author: "Unknown" },
  { text: "You carry more than people see. Give yourself credit for that.", author: "Unknown" },
  { text: "Anger doesn't make you a bad carer. It makes you human.", author: "Unknown" },
  { text: "The guilt you feel proves how much you care. But you don't deserve it.", author: "Unknown" },
  { text: "You can love someone completely and still find it hard. Both are true.", author: "Unknown" },
  { text: "Let yourself feel it. Then let yourself let it go. Even if only for a moment.", author: "Unknown" },
  { text: "Resentment doesn't mean you don't love them. It means you're overwhelmed.", author: "Unknown" },
  { text: "It's brave to admit you're struggling. It's braver to keep going anyway.", author: "Unknown" },

  // For self-care
  { text: "Taking a break doesn't mean you love them less.", author: "Unknown" },
  { text: "Caring for someone doesn't mean you have to disappear.", author: "Unknown" },
  { text: "You matter too. Not just as a carer. As a person.", author: "Unknown" },
  { text: "A cup of tea in silence is not selfish. It's survival.", author: "Unknown" },
  { text: "Five minutes for yourself is not five minutes taken from them.", author: "Unknown" },
  { text: "You deserve the same kindness you give everyone else.", author: "Unknown" },
  { text: "Looking after yourself isn't optional. It's what keeps you going.", author: "Unknown" },
  { text: "You don't have to justify needing a break. Everyone does.", author: "Unknown" },
  { text: "Putting yourself first sometimes isn't selfish. It's necessary.", author: "Unknown" },
  { text: "The oxygen mask rule exists for a reason. You first, then others.", author: "Unknown" },
  { text: "Your needs don't stop mattering because someone else's are urgent.", author: "Unknown" },
  { text: "A walk around the block can save a whole day.", author: "Unknown" },
  { text: "Permission to do nothing for the next five minutes. Signed: you.", author: "Unknown" },
  { text: "You can't be everything to everyone. But you can be something to yourself.", author: "Unknown" },
  { text: "Being kind to yourself is being kind to everyone who depends on you.", author: "Unknown" },

  // For strength
  { text: "You don't have to be strong all the time. You just have to be there. And you are.", author: "Unknown" },
  { text: "Today I kept someone safe. That's not nothing.", author: "Unknown" },
  { text: "You're not just surviving. You're carrying someone else through.", author: "Unknown" },
  { text: "It won't always feel this hard. And even if it does, you're still doing it.", author: "Unknown" },
  { text: "You are someone's whole world. That takes strength most people will never know.", author: "Unknown" },
  { text: "What you do every day is harder than most people's hardest day.", author: "Unknown" },
  { text: "Nobody gives you a medal for this. But you deserve one.", author: "Unknown" },
  { text: "The world doesn't see what you do at 3am. But it matters.", author: "Unknown" },
  { text: "Strength isn't never breaking. It's getting back up when you do.", author: "Unknown" },
  { text: "You're doing the most important job there is. And you're doing it.", author: "Unknown" },
  { text: "Heroes don't always wear capes. Sometimes they wear pyjamas at 2pm.", author: "Unknown" },
  { text: "You chose to stay. Every single day you choose to stay. That's extraordinary.", author: "Unknown" },
  { text: "Some people run marathons. You run a marathon every day, just quieter.", author: "Unknown" },
  { text: "The courage it takes to ask for help is the same courage that keeps you going.", author: "Unknown" },
  { text: "You're proof that love isn't just a feeling. It's a thousand small actions.", author: "Unknown" },

  // For peace
  { text: "The small moments of peace are still peace.", author: "Unknown" },
  { text: "Not everything needs to be fixed today.", author: "Unknown" },
  { text: "This moment, right now, is yours.", author: "Unknown" },
  { text: "Breathe in. Breathe out. That's enough for this second.", author: "Unknown" },
  { text: "The quiet moments between the chaos are worth noticing.", author: "Unknown" },
  { text: "You don't need to solve everything. Just the next thing.", author: "Unknown" },
  { text: "Let this be a moment where nothing is required of you.", author: "Unknown" },
  { text: "Peace doesn't mean everything is perfect. It means you've found a pause.", author: "Unknown" },
  { text: "The world can wait for five minutes. Really, it can.", author: "Unknown" },
  { text: "Right now, nobody needs anything. Just sit with that.", author: "Unknown" },
  { text: "Stillness isn't doing nothing. It's recharging everything.", author: "Unknown" },
  { text: "There's nowhere you need to be right now except here.", author: "Unknown" },
  { text: "Let your shoulders drop. Let your jaw unclench. Let yourself just be.", author: "Unknown" },
  { text: "Even the busiest rivers have still pools. You're in one now.", author: "Unknown" },
  { text: "Close your eyes for ten seconds. That counted. That helped.", author: "Unknown" },

  // For hope
  { text: "Tomorrow might be easier. And if it's not, you'll handle it. You always do.", author: "Unknown" },
  { text: "Good days still come. Even now. Especially now.", author: "Unknown" },
  { text: "There are people who understand. You're not as alone as you feel.", author: "Unknown" },
  { text: "Things change. Seasons turn. This won't always look exactly like this.", author: "Unknown" },
  { text: "You've survived every hard day so far. That's a perfect record.", author: "Unknown" },
  { text: "Small joys are still joys. Don't let the hard stuff cancel them out.", author: "Unknown" },
  { text: "You're building something with your care. Even if you can't see it yet.", author: "Unknown" },
  { text: "Every day you show up is a day that mattered to someone.", author: "Unknown" },
  { text: "Kindness echoes. What you give comes back in ways you can't predict.", author: "Unknown" },
  { text: "The hard chapters make the gentle ones mean more.", author: "Unknown" },
  { text: "Somewhere in the future, you'll look back and be amazed at what you did.", author: "Unknown" },
  { text: "You are planting seeds in the dark. Trust that something is growing.", author: "Unknown" },
  { text: "Today's impossible task was last month's unimaginable one. You're growing.", author: "Unknown" },
  { text: "There is always another cup of tea. And that's not nothing.", author: "Unknown" },
  { text: "Dawn always comes. Even after the longest night.", author: "Unknown" },

  // For connection
  { text: "Someone out there is going through exactly what you're going through right now.", author: "Unknown" },
  { text: "You don't have to explain yourself to deserve support.", author: "Unknown" },
  { text: "Asking for help isn't failing. It's finally being honest.", author: "Unknown" },
  { text: "The people who get it, really get it. Find them.", author: "Unknown" },
  { text: "You're part of a quiet army of carers. Millions strong. All invisible. All heroes.", author: "Unknown" },
  { text: "Nobody fully understands your day. But some people are trying to.", author: "Unknown" },
  { text: "The right person at the right moment can change everything. Keep looking.", author: "Unknown" },
  { text: "Talking about it doesn't make you a burden. It makes you human.", author: "Unknown" },
  { text: "You'd never judge a friend for feeling this way. Don't judge yourself.", author: "Unknown" },
  { text: "Sometimes the kindest thing someone can say is: I see you.", author: "Unknown" },

  // For daily life
  { text: "Microwave meals still count as cooking.", author: "Unknown" },
  { text: "Pyjamas are acceptable daywear when you've been up since 4am.", author: "Unknown" },
  { text: "The washing up can wait. You can't.", author: "Unknown" },
  { text: "Good enough is good enough. Perfect was never the goal.", author: "Unknown" },
  { text: "Some days the greatest achievement is that everyone is alive and relatively clean.", author: "Unknown" },
  { text: "You don't have to enjoy every moment to be grateful for them.", author: "Unknown" },
  { text: "Ticking one thing off the list is still progress.", author: "Unknown" },
  { text: "The laundry will still be there tomorrow. Your sanity might not. Choose wisely.", author: "Unknown" },
  { text: "If the biggest decision you make today is what to have for tea, that's fine.", author: "Unknown" },
  { text: "Some days are survival. Some days are sunshine. You need both.", author: "Unknown" },
];

/**
 * Bundled fallback stories - uplifting short reads that work offline
 * 50 stories = 5 per day for 10 days without repeats
 */
export const FALLBACK_STORIES = [
  { id: 'story-b-001', title: 'Community Fridge Movement Feeds Thousands', description: 'Volunteers across the UK have set up community fridges where surplus food from shops and restaurants is shared freely. The initiative has saved millions of meals from landfill while helping families in need.' },
  { id: 'story-b-002', title: 'Retired Teacher Starts Free Tutoring for Struggling Students', description: 'After noticing children falling behind during lockdowns, a retired teacher opened her living room as a free after-school study space. Three years on, over 200 children have passed through her doors.' },
  { id: 'story-b-003', title: 'Dog Rescue Centre Reports Record Rehoming Numbers', description: 'A local animal rescue centre celebrated rehoming its 10,000th dog this year. Volunteers say the rise in remote working has made it easier for families to welcome rescue dogs.' },
  { id: 'story-b-004', title: 'Teenager Knits 500 Blankets for Care Home Residents', description: 'Starting during lockdown as a way to keep busy, a teenager taught herself to knit and has now donated over 500 handmade blankets to care homes across her county.' },
  { id: 'story-b-005', title: 'Park Volunteers Plant 10,000 Trees in One Weekend', description: 'A community tree-planting event brought together 300 volunteers who planted 10,000 native saplings. Organisers say the new woodland will be enjoyed by generations to come.' },
  { id: 'story-b-006', title: 'Library Introduces Cosy Reading Nooks for Carers', description: 'A thoughtful library has created dedicated quiet spaces specifically for unpaid carers, complete with comfortable seating, hot drinks, and a curated collection of uplifting reads.' },
  { id: 'story-b-007', title: 'Village Post Office Saved by Crowdfunding Campaign', description: 'Residents rallied together to save their village post office from closure, raising enough in just two weeks. The post office is a lifeline for elderly residents who rely on it for social contact.' },
  { id: 'story-b-008', title: 'Street Party Tradition Returns After 30 Years', description: 'Neighbours who hadn\'t spoken in years got together to organise a street party. The event was such a success that they\'ve now set up a monthly community lunch.' },
  { id: 'story-b-009', title: 'School Children Write Letters to Lonely Pensioners', description: 'Primary school children have been writing letters and drawing pictures for care home residents, forming pen-pal friendships that have brightened days on both sides.' },
  { id: 'story-b-010', title: 'Cancer Survivor Completes Coast-to-Coast Walk', description: 'Two years after finishing treatment, a cancer survivor completed a 200-mile walk across England, raising thousands for the nurses who cared for her during chemotherapy.' },
  { id: 'story-b-011', title: 'Community Garden Transforms Abandoned Car Park', description: 'What was once a derelict car park is now a thriving community garden with raised beds, fruit trees, and a wildflower meadow. Local families grow vegetables and share the harvest.' },
  { id: 'story-b-012', title: 'Deaf Girl Teaches Sign Language to Entire School', description: 'After feeling isolated at school, a deaf student started lunchtime sign language classes. Now her entire year group can sign basic conversations, and she has a whole playground of friends.' },
  { id: 'story-b-013', title: 'Pub Landlord Offers Free Christmas Dinner to Anyone Alone', description: 'A pub landlord opens his doors every Christmas Day, providing a full traditional dinner to anyone who would otherwise be eating alone. Last year he served over 100 meals.' },
  { id: 'story-b-014', title: 'Binman Saves Collection of Children\'s Drawings', description: 'A refuse collector who always waves at children on his route received so many drawings and letters that he\'s created a scrapbook. He says the pictures keep him smiling on early mornings.' },
  { id: 'story-b-015', title: 'Hospital Therapy Dog Programme Shows Remarkable Results', description: 'Regular visits from trained therapy dogs have reduced anxiety in hospital patients by over 40%, with staff reporting that the dogs bring comfort that medication sometimes can\'t.' },
  { id: 'story-b-016', title: 'Baker Leaves Unsold Bread on Wall for Those in Need', description: 'A baker has installed a shelf outside her shop where unsold bread and cakes are left each evening. No questions asked, no stigma attached. The community calls it the kindness wall.' },
  { id: 'story-b-017', title: 'Lollipop Lady Retires After 35 Years of Service', description: 'Three generations of families attended the retirement party of a beloved lollipop lady. Former pupils, now parents themselves, brought their own children to say thank you.' },
  { id: 'story-b-018', title: 'Bus Driver Learns Passengers\' Names Over 20-Year Route', description: 'A bus driver who has worked the same route for 20 years knows most of his regular passengers by name. Locals say he\'s the friendliest face in their morning routine.' },
  { id: 'story-b-019', title: 'Wildflower Verges Boost Bee Population in Town', description: 'A council\'s decision to stop mowing grass verges and plant wildflower seeds instead has led to a dramatic increase in bee and butterfly sightings across the town.' },
  { id: 'story-b-020', title: 'Man Walks Every Street in His City Over Five Years', description: 'After retirement, a man set himself the challenge of walking every single street in his city. Five years and 3,000 miles later, he says he\'s discovered corners he never knew existed.' },
  { id: 'story-b-021', title: 'Primary School Starts Breakfast Club for Working Parents', description: 'A school opened a free breakfast club so working parents wouldn\'t have to choose between their job and making sure their child ate. Attendance and concentration have both improved.' },
  { id: 'story-b-022', title: 'Neighbour Mows Elderly Couple\'s Lawn for Ten Years', description: 'Without ever being asked, a neighbour has quietly mowed the lawn of an elderly couple next door for over a decade. He says it takes him fifteen minutes and means the world to them.' },
  { id: 'story-b-023', title: 'Cathedral Opens Doors for Rough Sleepers During Cold Snap', description: 'During the coldest week of winter, a cathedral opened its doors to provide warm shelter, hot food, and blankets for people sleeping rough. Volunteers stayed overnight to help.' },
  { id: 'story-b-024', title: 'Teenage Inventor Creates Low-Cost Water Filter', description: 'A teenager developed an affordable water filter using locally available materials. Her design is now being tested in communities without access to clean drinking water.' },
  { id: 'story-b-025', title: 'Former Prisoner Opens Restaurant Employing Ex-Offenders', description: 'A man who served time in prison has opened a successful restaurant that specifically hires people with criminal records, giving them a second chance and a path to stability.' },
  { id: 'story-b-026', title: 'Children\'s Charity Delivers 1 Million Books', description: 'A charity that sends free books to children in low-income families has hit the milestone of one million books delivered. Organisers say reading for pleasure changes life chances.' },
  { id: 'story-b-027', title: 'Swimmers Clean Up Beach Every Sunday Morning', description: 'A group of wild swimmers combine their weekly swim with a beach clean, removing an average of 20kg of plastic and litter from the shoreline every week.' },
  { id: 'story-b-028', title: 'Grandad Becomes Viral Sensation with Cooking Videos', description: 'A grandfather who started filming simple cooking tutorials for his grandchildren during lockdown now has a following of millions. His catchphrase has become a household favourite.' },
  { id: 'story-b-029', title: 'NHS Nurse Receives Award After 40 Years of Service', description: 'A nurse who has spent her entire career on the same ward received a lifetime achievement award. Former patients travelled from across the country to celebrate with her.' },
  { id: 'story-b-030', title: 'Village Rallies to Save 300-Year-Old Oak Tree', description: 'When development threatened a 300-year-old oak tree, the village campaigned to protect it. The tree was given preservation status, and a bench now sits beneath its branches.' },
  { id: 'story-b-031', title: 'Knitting Group Makes Hats for Every Newborn at Hospital', description: 'A knitting group of retirees has been making tiny hats for every baby born at their local hospital. Over 15 years, they\'ve knitted more than 8,000 hats in every colour imaginable.' },
  { id: 'story-b-032', title: 'Man Cycles to Work and Raises Thousands for Charity', description: 'By cycling to work instead of driving, a man calculated he saved enough on petrol to donate the equivalent to charity each month. After ten years, the total is in the tens of thousands.' },
  { id: 'story-b-033', title: 'Care Home Residents and Nursery Children Share Garden', description: 'A care home and a nursery that share a boundary fence have opened a gate between their gardens. The intergenerational friendships that have formed have benefited everyone.' },
  { id: 'story-b-034', title: 'Abandoned Railway Line Becomes Popular Walking Trail', description: 'A disused railway line has been transformed into a beautiful walking and cycling trail. Wildflowers grow along the old platform, and the signal box is now a tiny tea room.' },
  { id: 'story-b-035', title: 'Farmer Opens Fields for Free Fruit Picking', description: 'A farmer opens her orchards to the public every autumn for free fruit picking, asking only that visitors take what they need and leave some for the birds.' },
  { id: 'story-b-036', title: 'Local Radio Station Broadcasts Bedtime Stories', description: 'A community radio station broadcasts a bedtime story every evening at 7pm. Parents say it\'s become a cherished part of their children\'s routine.' },
  { id: 'story-b-037', title: 'Coastguard Volunteer Completes 1,000th Rescue', description: 'A volunteer coastguard has been involved in their 1,000th rescue operation. Despite the demands, they say they wouldn\'t change a thing about their years of service.' },
  { id: 'story-b-038', title: 'Town Introduces Free Water Refill Points', description: 'A town has installed free water refill stations on every high street, reducing plastic bottle waste by an estimated 50,000 bottles per year.' },
  { id: 'story-b-039', title: 'Choir for People with Dementia Wins National Award', description: 'A choir specifically for people living with dementia and their carers has won a national community award. Members say singing together brings moments of pure joy.' },
  { id: 'story-b-040', title: 'Teenager Starts Repair Cafe to Fight Waste', description: 'Fed up with throwaway culture, a teenager started a monthly repair cafe where volunteers fix broken items for free. Toasters, bikes, and clothes all get a second life.' },
  { id: 'story-b-041', title: 'Postwoman Checks on Elderly Residents During Her Round', description: 'A postwoman who notices when elderly customers don\'t collect their mail has quietly been checking on them for years. Her vigilance has helped several people get medical attention in time.' },
  { id: 'story-b-042', title: 'Hedgehog Highway Connects 50 Gardens', description: 'Neighbours on one street cut small holes in their fences to create a hedgehog highway. Camera traps show hedgehog numbers on the street have tripled in two years.' },
  { id: 'story-b-043', title: 'Cafe Offers Pay-It-Forward Meals', description: 'A cafe lets customers buy an extra meal that\'s pinned to a board. Anyone who needs a free meal can simply take a ticket and order, no questions asked.' },
  { id: 'story-b-044', title: 'Retired Engineer Builds Free Wheelchair Ramps', description: 'A retired engineer spends his weekends building and installing wheelchair ramps for disabled people who can\'t afford adaptations. He\'s built over 200 ramps so far.' },
  { id: 'story-b-045', title: 'School Caretaker Retires as Most Popular Staff Member', description: 'When the school caretaker retired after 30 years, every child in the school signed his leaving card. Teachers say he knew every child\'s name and always had time for a chat.' },
  { id: 'story-b-046', title: 'Woman Leaves Encouraging Notes on Car Windscreens', description: 'A woman has been leaving handwritten notes of encouragement on car windscreens in hospital car parks. Recipients say finding an unexpected kind message brightened their hardest days.' },
  { id: 'story-b-047', title: 'Community Buys Local Woodland to Protect It Forever', description: 'When a beloved local woodland came up for sale, the community raised enough to buy it in just three months. It will now be protected as a community nature reserve.' },
  { id: 'story-b-048', title: 'Pensioner Learns to Read at 78 with Help from Library', description: 'After a lifetime of hiding his inability to read, a 78-year-old man finally learned with help from patient library volunteers. His first book was a children\'s story, and he cried with happiness.' },
  { id: 'story-b-049', title: 'Football Club Opens Training Sessions for Disabled Fans', description: 'A professional football club has started free weekly training sessions for fans with disabilities. Participants say it\'s the highlight of their week.' },
  { id: 'story-b-050', title: 'Secret Santa Campaign Delivers Gifts to Every Child in Town', description: 'An anonymous campaign ensures that every child in the town receives at least one Christmas present. Volunteers wrap and deliver gifts to families who might otherwise go without.' },
];

/**
 * Bundled longer reads - original short stories for a 10-minute break
 * Each has multiple paragraphs to fill a proper reading session
 */
export const LONG_READS = [
  {
    id: 'long-001',
    title: 'The Bench by the Canal',
    readTime: '8 min',
    paragraphs: [
      'Margaret hadn\'t sat on a bench in months. Not properly. Not without one eye on her phone, waiting for a call from the care agency, or mentally listing the things she still needed to pick up from the chemist.',
      'But today, the sun was out. Her mother was having a good morning — one of those mornings where she remembered Margaret\'s name, asked about the garden, and even laughed at something on the radio. The carer had arrived on time. There was nothing urgent.',
      'So Margaret walked. Past the post office, past the park where the children screamed on the swings, past the chip shop that still opened at 11am for reasons nobody questioned. She walked until she reached the canal.',
      'The bench was old. Wooden slats bleached pale by weather, the memorial plaque long since faded to nothing. She sat down and felt something she hadn\'t felt in a long time: the absence of urgency.',
      'A narrowboat chugged past, moving so slowly it seemed almost still. A man on deck raised a mug of tea in her direction. She nodded back. A duck led her ducklings in a line so perfect it looked rehearsed.',
      'Margaret realised she was smiling. Not the polite, reassuring smile she wore for doctors and social workers and the woman at the pharmacy who always asked how Mum was doing. A real smile. The kind that starts somewhere in your chest before it reaches your face.',
      'She sat there for twenty minutes. Maybe thirty. She didn\'t check. When she finally stood up, her knees creaked in protest, but something else had loosened too. Some knot behind her ribs that she\'d been carrying so long she\'d forgotten it was there.',
      'On the walk back, she stopped at the bakery and bought two scones. One for her, one for Mum. They\'d have them with butter and jam, the way they always used to on Sunday afternoons, back when Sundays were just Sundays and not another day to get through.',
      'She got home to find her mother asleep in the armchair, the cat on her lap, the radio playing something gentle. Margaret put the kettle on. She\'d warm the scones when Mum woke up.',
      'It wasn\'t a big day. Nothing changed. But Margaret would think about that bench by the canal for weeks afterwards. Not because anything happened there, but because for twenty minutes, nothing needed to.'
    ]
  },
  {
    id: 'long-002',
    title: 'The Night the Boiler Broke',
    readTime: '7 min',
    paragraphs: [
      'It was January. Of course it was January. Boilers never break in July.',
      'Dave heard the clunk at 2am — that particular mechanical sigh that means something expensive has given up. He lay in bed for a full minute, hoping he\'d imagined it. He hadn\'t.',
      'By morning, the house was properly cold. Not just no-heating cold, but the kind of cold that gets into your bones and makes you understand why people in old novels died of exposure. His dad, in the bedroom next door, was buried under four blankets and still shivering.',
      'Dave phoned three plumbers. Two didn\'t answer. The third said Thursday. It was Monday.',
      'He dragged the electric heater from the garage, positioned it next to his dad\'s chair, and wrapped a hot water bottle in a tea towel. His dad looked at him with that expression he\'d been wearing more often lately — a mixture of gratitude and something harder to name. Shame, perhaps. Or frustration at needing help with something as basic as keeping warm.',
      '"Remember when I fixed the boiler in Acacia Road?" his dad said. Dave nodded, though he didn\'t remember. His dad had been a plumber himself for forty years. The irony was thick enough to insulate a loft.',
      '"Thirty-two degrees outside and Mrs Henderson\'s boiler packed in," his dad continued, eyes brightening. "She was running it for the hot water, see. I told her, Mrs Henderson, you\'ve got more limescale in this system than the white cliffs of Dover."',
      'Dave made tea. He\'d heard this story before — maybe not this exact one, but something close enough. His dad\'s working life had been a series of boilers fixed, pipes unblocked, and grateful customers who pressed cups of tea and biscuits on him. He\'d been good at his job. More than good.',
      'By Tuesday afternoon, the house was still cold, but something had shifted. Dave had moved the sofa closer to the heater and found an old electric blanket in the airing cupboard. His dad was telling stories about every plumbing job he could remember, and Dave was writing them down on the back of envelopes.',
      '"Why are you doing that?" his dad asked.',
      '"Because they\'re good stories, Dad."',
      'The plumber came on Thursday, as promised. Young lad, couldn\'t have been more than twenty-five. Dave\'s dad watched him work from the kitchen doorway, offering advice that was sometimes relevant and sometimes about a completely different boiler from 1987.',
      'The young plumber was patient. He listened to every suggestion, nodded thoughtfully, and fixed the boiler in two hours.',
      '"Your dad knows his stuff," the plumber said to Dave on his way out.',
      '"Yeah," Dave said. "He does."',
      'That evening, with the heating finally on and the house warming up, Dave found his dad asleep in his chair, a half-smile on his face. The envelope covered in plumbing stories was tucked beside the cushion. Dave left it there. He\'d type them up tomorrow. Every last one.'
    ]
  },
  {
    id: 'long-003',
    title: 'The Recipe Book',
    readTime: '9 min',
    paragraphs: [
      'Sarah found it when she was clearing out the kitchen cupboard. Wedged between a fondue set nobody had used since 1982 and a stack of plastic containers that had long since lost their lids.',
      'A notebook. Ring-bound, the cover stained with something that might once have been gravy. Inside, in her grandmother\'s careful handwriting, were recipes.',
      'Not fancy recipes. Not the kind you see on cooking shows with towers of spun sugar and foams and things served on slates. These were real recipes. Shepherd\'s pie. Victoria sponge. Chicken soup. The margins were filled with notes in different coloured inks, added over years.',
      '"Bit more salt than you\'d think," said a note next to the soup recipe. "Arthur likes it with extra cheese on top," appeared beside the potato gratin. Next to the Christmas cake recipe, underlined twice: "START IN OCTOBER. I MEAN IT."',
      'Sarah sat on the kitchen floor and read every page. Her grandmother had died three years ago, and her grandfather — Arthur of the extra cheese — was now in the care home down the road, where Sarah visited every Tuesday and Thursday.',
      'He didn\'t always know who she was these days. Some visits he called her Janet, which was her mother\'s name. Some visits he didn\'t call her anything at all, just held her hand and looked at the garden through the window.',
      'But food. Food he remembered.',
      'Last week, Sarah had brought him a slice of shop-bought lemon drizzle cake, and he\'d taken one bite and said, very clearly, "Your nan made a better one than this." It was the most lucid thing he\'d said in months.',
      'So she decided to make the lemon drizzle. The recipe was on page 34, with a note that said: "Use unwaxed lemons. Waxed ones are for furniture."',
      'Sarah hadn\'t baked in years. She measured flour badly, forgot to grease the tin, and had to look up what "fold in gently" actually meant. The kitchen looked like a crime scene. But when she pulled the cake out of the oven and drizzled the lemon syrup over the top, the smell was so familiar it made her throat tight.',
      'She took it to the care home the next day, wrapped in foil, still slightly warm.',
      'Arthur was in his usual chair by the window. He looked at Sarah with the politely confused expression she\'d learned not to take personally.',
      '"I made you a cake, Grandad," she said, unwrapping it.',
      'He looked at it. Then he looked at her. And something shifted behind his eyes.',
      '"Lemon drizzle," he said. Not a question.',
      '"Nan\'s recipe."',
      'He took a bite. Chewed slowly. Then he said, very quietly: "She always put too much sugar in the syrup. Yours is just right."',
      'Sarah didn\'t know whether to laugh or cry, so she did both. The care assistant brought them tea, and they sat together eating lemon drizzle cake while Arthur told her about the first time her grandmother had baked it, in a tiny kitchen in a flat in Bermondsey, in 1961.',
      'He didn\'t remember her name that day. But he remembered the cake. And sometimes, Sarah thought, that was enough.',
      'She went home and started on the shepherd\'s pie.'
    ]
  },
  {
    id: 'long-004',
    title: 'The Dog and the Doorbell',
    readTime: '6 min',
    paragraphs: [
      'They got the dog because the consultant said it would help. "Routine," she said. "Something to care for. A reason to go outside." Easy for her to say. She didn\'t have to walk a lunatic terrier at 6am in the rain.',
      'The dog was called Brian. He\'d been named by the rescue centre, and by the time they realised it was a ridiculous name for a dog, it was too late. He responded to it. Brian the terrier.',
      'Brian was afraid of three things: the vacuum cleaner, bicycles, and the doorbell. The doorbell was the worst. Every time it rang, Brian would bark as if the house was under siege, then hide behind the sofa, then bark some more from behind the sofa, which made the whole thing worse.',
      'Tom\'s dad found it hilarious. Which was significant, because Tom\'s dad hadn\'t found much hilarious in the eighteen months since Tom\'s mum had died.',
      'The grief had settled into his dad like weather. Not dramatic storms, but a persistent grey. He\'d stopped going to the allotment. Stopped watching the cricket. Stopped doing the crossword, which he\'d done every single morning since before Tom was born.',
      'But Brian. Brian was different.',
      'Brian needed walking, so Dad walked. Brian needed feeding, so Dad got up. Brian was afraid of the doorbell, so Dad disconnected the doorbell and put a sign on the door that said "Please knock. Dog is an idiot."',
      'The sign made the postman laugh. Then the postman started knocking and waiting, and sometimes Dad would open the door and they\'d chat for a minute. Then it was two minutes. Then the postman started bringing dog treats.',
      'Brian got fatter. Dad got lighter. Not physically — he was still eating the same three meals on rotation (beans on toast, beans on toast, and for variety, cheese on toast) — but lighter in the way he moved through the house. He started leaving the curtains open. Started listening to the radio again.',
      'One morning, Tom came round to find his dad sitting at the kitchen table with the newspaper open at the crossword. Brian was asleep on his feet, twitching through a dream. Dad had a pencil in one hand and a cup of tea in the other.',
      '"Seven across," Dad said, without looking up. "Loyal companion, five letters."',
      '"Brian," Tom said.',
      'Dad looked up and smiled. A real smile.',
      '"Brian\'s got six letters," he said. "But I\'ll allow it."'
    ]
  },
  {
    id: 'long-005',
    title: 'Tuesday Afternoons',
    readTime: '8 min',
    paragraphs: [
      'Every Tuesday afternoon, Jenny drove to the care home. She\'d been doing it for two years, three months, and roughly six days, though she\'d stopped counting precisely because counting made it worse.',
      'The drive took seventeen minutes. She knew every pothole, every traffic light, every point where the speed limit changed. She could have done it blindfolded, which was fortunate, because some Tuesdays she cried for the first five minutes of the drive and couldn\'t see properly.',
      'Her mother was in Room 12. It was a nice room — south-facing, with a view of the garden where someone had planted roses that bloomed extravagantly every June. The staff were kind. The food was acceptable. The heating worked. It was all fine. Everything was fine.',
      'Except that her mother, who had once been the sharpest woman in any room, who had done the Telegraph crossword in pen, who had taught herself Italian at sixty just because she fancied going to Florence, was slowly, gently, irreversibly disappearing.',
      'Some Tuesdays were good. Her mother would recognise her, ask about the children, remember a story from thirty years ago in vivid detail. These visits left Jenny hopeful and exhausted in equal measure.',
      'Some Tuesdays were not good. Her mother would stare at her with polite curiosity, as if trying to place where she\'d seen this friendly stranger before. These visits left Jenny sitting in the car park afterwards, gripping the steering wheel.',
      'Today was a Tuesday that started badly and got better, which was the rarest kind.',
      'Jenny arrived to find her mother agitated, pulling at the blanket on her lap, asking for someone called Dorothy. There was no Dorothy in the family. Jenny didn\'t know what to do, so she did what she always did when she didn\'t know what to do: she made tea.',
      'The care home had a little kitchen at the end of the corridor with a kettle that took four minutes to boil and mugs with \'World\'s Best Nan\' and \'I\'d Rather Be Gardening\' on them. Jenny made two cups, added milk, carried them back to Room 12.',
      'Her mother was looking out of the window at the roses.',
      '"The Gertrude Jekylls are doing well," her mother said.',
      'Jenny nearly dropped the tea. Her mother hadn\'t identified a rose variety in over a year. She\'d been a passionate gardener her whole life, and the roses were one of the last things she\'d let go of.',
      '"You\'re right, Mum. They are."',
      '"Your father planted those, you know. Well, I told him where to put them. He did the digging. I did the thinking."',
      'This wasn\'t true — the roses had been planted by the care home\'s gardener — but it was so perfectly something her mother would say that Jenny laughed.',
      'They sat together drinking tea, looking at roses that somebody else had planted, and her mother talked about the garden at the old house. The sweet peas that grew up the trellis. The lavender by the path. The apple tree that produced so many apples one year that they gave bags of them to everyone on the street.',
      'Her mother didn\'t know what year it was. She thought Jenny was twenty-five, not fifty-three. She couldn\'t remember what she\'d had for lunch. But she remembered every flower she\'d ever grown, and she described them with such love and precision that Jenny could see them too.',
      'The drive home took seventeen minutes. Jenny didn\'t cry. She stopped at the garden centre and bought a potted lavender. She put it on the kitchen windowsill where she\'d see it every morning.',
      'Next Tuesday, she\'d bring her mother a sprig of it. Even if Mum didn\'t remember the visit, she\'d remember the smell. Some things go deeper than memory.'
    ]
  },
  {
    id: 'long-006',
    title: 'The Last Train Home',
    readTime: '7 min',
    paragraphs: [
      'It was the 10:47 from Paddington, and Mark was the last person in the carriage.',
      'He should have been on the 6:15. That was the plan. Hospital appointment at 2pm, a quick coffee with his sister (who lived near the hospital and always wanted to "catch up," which meant asking how he was coping and then telling him he wasn\'t), and home by dinnertime to relieve the evening carer.',
      'But the appointment had run late. Then his sister had cried. Then he\'d missed the 6:15, and the 7:30, and somehow ended up in a pub near the station eating a disappointing lasagne and wondering when his life had become a series of things he had to get through rather than things he wanted to do.',
      'Now it was nearly eleven o\'clock, and he was on a train, and it was dark outside, and the carriage smelled of coffee and rain, and everything was oddly peaceful.',
      'He called home. The evening carer, Precious, answered on the second ring.',
      '"All fine here," she said. "He ate most of his dinner. Watched Antiques Roadshow. Told me a vase was worth more than the expert said. Asleep now."',
      'Mark exhaled. Precious was magnificent. She\'d been coming three evenings a week for eight months, and his father adored her. She was firm without being bossy, patient without being patronising, and she made a cup of tea so good that his father had once declared it "better than your mother\'s," which was the highest praise available.',
      'Mark put his phone away and looked out of the window. His reflection stared back — tired, older than he expected, badly in need of a haircut. Behind his reflection, the countryside slid past in darkness, occasionally punctuated by the lit windows of houses where other people were living other lives.',
      'He thought about his dad. Not the complicated thoughts — the guilt, the logistics, the endless mental arithmetic of medication schedules and care rotas and money — but the simple thought. His dad. The man who taught him to ride a bike. Who built him a treehouse that leaned so badly they had to prop it up with a car jack. Who once drove three hours in the wrong direction on holiday because he refused to ask for directions.',
      'His dad, who now needed help getting dressed in the morning and sometimes forgot the name of the town he\'d lived in for forty years.',
      'Mark didn\'t cry. He\'d used up his crying allocation for the month, and it was only the fourteenth. Instead, he leaned his head against the window and watched England pass by in the dark.',
      'The train stopped at every station. Didcot. Swindon. Chippenham. At each one, the same ritual: doors opening onto empty platforms, a pause, doors closing. The train breathing.',
      'By the time he got to his stop, it was nearly midnight. The car park was empty except for his car, frosted and patient under a streetlight.',
      'He drove home. Let himself in quietly. Checked on his dad, who was sleeping, one hand on top of the blanket, the crossword book on the bedside table.',
      'Mark stood in the doorway for a moment. Then he went downstairs, made himself a cup of tea, and sat in the kitchen where the house was warm and the clock ticked and nothing at all needed doing.',
      'Sometimes the last train home is the one that gets you there.'
    ]
  },
  {
    id: 'long-007',
    title: 'The Allotment',
    readTime: '8 min',
    paragraphs: [
      'The allotment had been Reg\'s domain. Plot 14, halfway down the slope, with a wonky shed he\'d built from pallets and a water butt that collected rainwater with religious devotion. He grew runner beans, courgettes, potatoes, and an improbable quantity of lettuce that nobody in the family actually wanted.',
      'When Reg had his stroke, the allotment was the first casualty. Christine couldn\'t manage it. She could barely manage the house, the hospital visits, the occupational therapists, the parade of well-meaning neighbours who kept arriving with casseroles and sympathy and then leaving, taking the sympathy with them but unfortunately not the casseroles.',
      'By March, the allotment was overgrown. By May, Christine received a polite letter from the committee suggesting that if the plot wasn\'t being used, perhaps someone else could have it.',
      'She showed Reg the letter. He was in the wheelchair by then, his right side still not working properly, his speech slow but improving.',
      '"Tell them," he said, with enormous effort, "to mind their own ruddy business."',
      'It was the most words he\'d said in a row for weeks. Christine laughed so hard she cried.',
      'She wrote back to the committee and said the plot was being maintained, thank you very much. Then she put on Reg\'s wellies — four sizes too big — and went down to the allotment.',
      'It was worse than she\'d expected. The runner bean frame had collapsed. The courgettes had gone feral. Something had eaten all the lettuce, which was honestly a relief. The shed door was hanging off one hinge, and a family of mice had moved into the seed tray.',
      'Christine stood in the middle of Plot 14 and had absolutely no idea what to do. She\'d never gardened. Her relationship with the allotment had been purely administrative: Reg grew things, she ate them, and occasionally complained about the mud he tracked into the kitchen.',
      'She started by pulling up weeds. This seemed safe. If it wasn\'t in a row, it was a weed. After an hour, her back ached, her hands were filthy, and she\'d pulled up what turned out to be a perfectly healthy row of spring onions.',
      'The woman on the next plot — Plot 15, which was immaculate in a way that made Christine feel personally attacked — appeared with a flask of tea.',
      '"I\'m Pat," she said. "Those were spring onions."',
      '"I know that now," Christine said.',
      'Pat didn\'t offer advice or sympathy. She poured two cups of tea, handed one to Christine, and sat on Reg\'s upturned wheelbarrow.',
      '"My husband died four years ago," Pat said. "He didn\'t garden. Hated it. But I started coming here after, because I needed somewhere to be angry, and it turns out digging is very good for that."',
      'Christine drank her tea. It was the best cup of tea she\'d had in months, and she\'d had a lot of tea.',
      'From that day, Pat became her allotment mentor. She taught Christine which green things were vegetables and which were weeds. She showed her how to stake tomatoes and when to harvest potatoes. She lent tools, shared seeds, and never once asked how Reg was doing in a voice that implied he was already gone.',
      'Every Saturday, Christine spent the morning at the allotment and the afternoon with Reg. She brought him photos on her phone. Muddy carrots. Surprising courgettes. The shed door, finally fixed.',
      'Reg couldn\'t hold a trowel anymore, but he could hold a runner bean, and he did, turning it over in his good hand, feeling the weight of something he\'d planted months ago, grown now by someone who loved him enough to learn.',
      '"Not bad," he said. And from Reg, who had won three Best in Show ribbons at the county fair, that was high praise indeed.'
    ]
  },
  {
    id: 'long-008',
    title: 'Small Talk at the School Gate',
    readTime: '7 min',
    paragraphs: [
      'Priya hated the school gate. Not the physical gate — that was fine, a perfectly normal gate — but everything it represented. The performance of it. The standing around. The small talk.',
      'She was already carrying too much. Her mother-in-law\'s diagnosis. The consultant appointments. The medication schedule pinned to the fridge. The growing distance between her and Amit, who was trying his best but whose best was the kind of trying that involved working late and being very tired on weekends.',
      'The school gate required a version of Priya that she didn\'t have the energy to assemble. Cheerful Priya. Everything-is-fine Priya. Oh-yes-we-must-have-coffee-sometime Priya.',
      'She stood slightly apart from the main group, pretending to check her phone. The usual clusters formed: the PTA mums, the dads who came on Fridays and looked like they\'d been given directions to a foreign country, the childminder who somehow managed three children and a buggy without losing any of them.',
      'A woman she didn\'t recognise was standing nearby, also pretending to check her phone. New, maybe. Or just another one who\'d mastered the art of looking busy while being alone.',
      'Their eyes met. The woman smiled. Not the aggressive friendliness of someone who wanted to talk, but the quiet solidarity of someone who understood that sometimes a school gate was just a place you had to be.',
      'The bell rang. Children erupted. Priya\'s daughter, Maya, came running out with a painting.',
      '"I made this for Nani!" Maya said, holding up a picture of what was either a dog or a horse standing next to a rainbow. "Is Nani coming for dinner?"',
      'Priya crouched down. "Nani\'s not feeling very well, remember?"',
      '"I know. That\'s why I made her a painting. To make her feel better."',
      'Priya blinked hard. Six years old and already understanding something that most adults struggled with: that you don\'t need to fix someone\'s illness to make them feel better. Sometimes a painting of a questionable animal is enough.',
      'She was zipping Maya\'s coat when the new woman appeared beside her.',
      '"Your daughter\'s painting is lovely," she said. "Is it a horse?"',
      '"We think so," Priya said.',
      'The woman laughed. A real laugh, not a school-gate laugh.',
      '"I\'m Helen. My son Alfie just started in Year 1. He drew a self-portrait last week that looked like a potato with legs."',
      'Priya laughed too. And then, without planning to, she said: "I\'m Priya. My mother-in-law\'s ill and I\'m barely holding it together and I genuinely cannot face another conversation about the summer fair."',
      'There was a pause. The kind of pause where someone either backs away or steps closer.',
      'Helen stepped closer.',
      '"Right then," she said. "I know a cafe around the corner that does excellent cake and doesn\'t have a single poster about the summer fair. Shall we?"',
      'They went. The cake was excellent. Helen\'s son drew Priya a picture of a cat (or possibly a cloud). Maya drew Helen\'s son a rainbow. They stayed for an hour, and Priya talked about things she hadn\'t talked about to anyone: the exhaustion, the guilt, the way she felt invisible.',
      'Helen listened. She didn\'t offer solutions. She offered cake, and tea, and the radical kindness of paying attention.',
      'After that, the school gate wasn\'t so bad. Priya had someone to stand next to. Someone who\'d catch her eye and smile that small, knowing smile. Someone who, when they asked "how are you?", actually wanted to know.'
    ]
  },
  {
    id: 'long-009',
    title: 'The Radio',
    readTime: '6 min',
    paragraphs: [
      'The radio lived on the kitchen windowsill. It was the old kind — actual buttons, an actual aerial, a dial that you turned to find a station. It had been there for as long as anyone could remember, tuned permanently to Radio 2.',
      'When Michael\'s wife, Susan, started to need more help, the radio became the constant. Everything else changed — the hospital bed in the dining room, the stairlift that hummed like a geriatric spaceship, the parade of carers who came and went — but the radio stayed.',
      'Susan liked it on in the background. Not too loud. Just enough so the house had a pulse. Music and chat and the occasional traffic update for roads they\'d never drive on again. It filled the silences that had started to grow between them — the silences that weren\'t peaceful but heavy, full of things neither of them knew how to say.',
      'Michael found himself talking to the radio. Not to Susan, not exactly, but to the space between them that the radio occupied. He\'d comment on songs. Mock the weather forecast. Argue with the presenter about music he didn\'t recognise.',
      '"This isn\'t music," he\'d say to nobody in particular. "This is just noise with a good publicist."',
      'Susan would smile. Sometimes she\'d laugh. On good days, she\'d join in, adding her own commentary. On bad days, she\'d lie still with her eyes closed, and Michael would wonder if she could hear anything at all, or if the radio was just for him now.',
      'One afternoon, a song came on that Michael recognised immediately. Not a famous song — not one most people would know — but one they\'d danced to at a wedding in 1978. His brother\'s wedding. Susan had worn a yellow dress and Michael had worn a tie that was too wide, because it was 1978 and all ties were too wide.',
      'He didn\'t think. He just reached over and turned the volume up.',
      'Susan opened her eyes.',
      '"David\'s wedding," she said. Clear as a bell.',
      '"You remember."',
      '"You stepped on my foot."',
      '"I stepped on everyone\'s foot. I\'m not a good dancer."',
      '"You\'re a terrible dancer. But you tried."',
      'Michael took her hand. They didn\'t dance — she couldn\'t, and he wasn\'t about to try in the kitchen — but they held hands and listened to the song, and for three minutes and twenty seconds, they were twenty-six years old again in a church hall in Wolverhampton, and the future was nothing but a yellow dress and a too-wide tie and the certainty that everything would be fine.',
      'The song ended. A jingle played. The presenter said something about the M25.',
      'Michael turned the volume back down. Susan closed her eyes.',
      'The radio played on.'
    ]
  },
  {
    id: 'long-010',
    title: 'The Christmas List',
    readTime: '8 min',
    paragraphs: [
      'Every year, without fail, Dad made a Christmas list. Not a list of things he wanted — he\'d stopped wanting things years ago, claiming he had "too much stuff already" — but a list of things he needed to do before Christmas. A battle plan.',
      'The list lived on the back of an envelope, because Dad didn\'t believe in notebooks. ("Waste of money. Envelopes are free.") It covered everything: cards to send, presents to wrap, food to buy, the exact date the turkey needed ordering from the butcher, and — underlined three times — when to put the tree up.',
      'This year, the list was different. This year, Dad couldn\'t write it.',
      'His hands didn\'t work like they used to. The arthritis had been getting worse for years, but this winter it had crossed some invisible line. He could still hold things, mostly, but a pen was beyond him. Writing his own name took concentration that left him exhausted.',
      'So Karen wrote the list. She sat at the kitchen table with a biro and an envelope (still free, still the only acceptable stationery) and Dad dictated.',
      '"Cards," he said. "The Hendersons. The Patels. Jean from the post office. The woman at number seven — what\'s her name?"',
      '"Barbara."',
      '"Barbara. Barbara gets a robin one. She likes robins."',
      'Karen wrote it all down. Forty-three cards. Dad remembered every single person. His memory wasn\'t the problem — never had been. His body was just quietly, stubbornly refusing to keep up with his brain.',
      'The presents were next. Dad had always been a good present-giver. Not expensive things, but thoughtful things. The right book for the right person. A particular type of chocolate that someone mentioned liking once, in May, that he\'d remembered and filed away.',
      '"Karen gets the blue scarf from that shop in town," he said.',
      '"Dad, I\'m Karen. I\'m writing the list."',
      'He looked at her. "I know that. I\'m not daft. I\'m telling you what to buy yourself because I can\'t get to the shop."',
      'This was the worst part, she thought. Not that he needed help, but that he knew he needed help, and that knowing it cost him something every single time.',
      'They worked through the list. Turkey ordered. Crackers bought. Tree going up on the 15th, not a day before, because Dad was firm about this. ("Trees that go up in November are the work of lunatics.")',
      'When they finished, Karen stuck the list to the fridge with a magnet and made them both a cup of tea.',
      '"Do you want me to write the cards for you?" she asked, carefully, because she knew the answer might hurt.',
      'Dad looked at his hands. Then he looked at her.',
      '"You write them," he said. "I\'ll tell you what to put. The Hendersons get a nice message. The Patels get a long one because Raj likes a good read. Jean from the post office gets a short one because she\'ll be reading fifty of the things."',
      'So they wrote the cards together. Karen\'s handwriting, Dad\'s words. He knew something personal about every single person on the list, and he dictated messages with the care of someone composing letters to old friends, which is exactly what he was doing.',
      'It took all afternoon. By the end, Dad was tired, but he was smiling.',
      '"Next year," he said, "we\'ll start earlier."',
      'Karen didn\'t say anything about next year. She just addressed the envelopes, stamped them, and put them by the front door to post in the morning.',
      'Barbara was getting a robin one. Jean\'s would be short. The Patels would get a good read.',
      'Some traditions don\'t need hands. They just need someone to remember.'
    ]
  }
];

/**
 * Initialize fallback quotes and stories in DB if empty
 */
export async function initFallbackQuotes() {
  const existingQuotes = await getAll('quotes');
  if (existingQuotes.length === 0) {
    const quotes = FALLBACK_QUOTES.map((q, i) => ({
      id: `fallback-${i}`,
      text: q.text,
      author: q.author,
      fetchedAt: Date.now()
    }));
    await putMany('quotes', quotes);
  }

  const existingStories = await getAll('stories');
  if (existingStories.length === 0) {
    const stories = FALLBACK_STORIES.map(s => ({
      ...s,
      link: '',
      pubDate: '',
      fetchedAt: Date.now()
    }));
    await putMany('stories', stories);
  }
}

/**
 * Try to refresh all content (called on app open if online)
 */
export async function refreshAllContent() {
  if (!navigator.onLine) return;

  // Don't await these - let them happen in background
  fetchImages().catch(() => {});
  fetchStories().catch(() => {});
  fetchQuotes().catch(() => {});
}
