export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

export const BLOGS: BlogPost[] = [
  {
    id: 'the-curcumin-revolution',
    title: 'The Lakadong Secret: Why High Curcumin Content Matters',
    excerpt: 'Discover why Meghalaya’s rare high-altitude turmeric outperforms standard store-bought varieties in health benefits and flavor.',
    category: 'Spice Science',
    readTime: '4 min read',
    date: 'July 18, 2026',
    author: 'Dr. Ananya Sharma (Food Scientist)',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1000',
    content: `Turmeric has been prized for millennia in Ayurveda, but not all turmeric is created equal. Most commercial turmeric contains 2% to 3% curcumin—the primary bio-active anti-inflammatory compound.

    Nestled in the pristine Jaintia Hills of Meghalaya, Lakadong turmeric produces an extraordinary 7.5% to 9% natural curcumin due to unique glacial soil composition and traditional organic farming.

    At CROF, we harvest Lakadong roots at peak maturity and cold-grind them under 30°C to ensure zero volatilization of essential oils.`
  },
  {
    id: 'cold-milling-vs-high-speed-grinding',
    title: 'Why High-Speed Industrial Grinding Destroys Spice Aromas',
    excerpt: 'Industrial spice processing reaches temperatures above 90°C, evaporating essential oils. Here is how CROF stone milling preserves true aroma.',
    category: 'Heritage Craft',
    readTime: '6 min read',
    date: 'June 29, 2026',
    author: 'Vikramaditya Roy (Master Blender)',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000',
    content: `When spices are ground in fast commercial steel pulverizers, friction heat rises drastically. Essential oils—the volatile aromatic terpenes responsible for flavor and smell—evaporate into the air.

    CROF utilizes traditional granite stone mills operating at low RPMs. This keeps grinding temperature low, locking in essential oils directly into the light-proof seal packaging.`
  },
  {
    id: 'saffron-purity-testing',
    title: 'How to Detect Counterfeit Saffron at Home',
    excerpt: 'Saffron is the world’s most expensive spice. Learn 3 simple laboratory-backed tests to verify 100% pure Mongra Kashmiri saffron.',
    category: 'Guide & Purity',
    readTime: '5 min read',
    date: 'June 12, 2026',
    author: 'Priya Nair (Quality Director)',
    image: 'https://images.unsplash.com/photo-1615485290177-3e19273c52e4?auto=format&fit=crop&q=80&w=1000',
    content: `Due to its high value, fake saffron dyed with corn silk or synthetic color is rampant. Here is how to test pure CROF Mongra Saffron:

    1. Warm Water Test: Pure saffron releases color slowly over 15-20 minutes, turning water golden yellow (not dark red instantly).
    2. Thread Integrity: Genuine threads remain intact and do not disintegrate when rubbed between fingers.
    3. Aroma: Pure saffron smells sweet and earthy like honey and hay, but tastes slightly bitter.`
  }
];
