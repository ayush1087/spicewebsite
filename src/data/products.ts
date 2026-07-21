export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  weightOptions: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  discount: number;
  description: string;
  origin: string;
  pungency: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  ingredients: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    curcumin?: string;
  };
  storage: string;
  inStock: boolean;
  sku: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'kashmiri-red-chilli',
    name: 'Kashmiri Red Chilli Powder',
    hindiName: 'काश्मीरी लाल मिर्च',
    category: 'Chilli & Pepper',
    tagline: 'Vibrant natural crimson hue with mild authentic warmth.',
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 284,
    image: '/images/kashmiri-chilli.png',
    gallery: [
      '/images/kashmiri-chilli.png'
    ],
    weightOptions: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
    discount: 17,
    description: 'Sourced directly from the snow-capped valleys of Pampore, Kashmir. Sun-dried and cold-ground to preserve essential oils and produce a stunning natural deep red color without high heat pungency.',
    origin: 'Pampore Valley, Jammu & Kashmir',
    pungency: 'Mild',
    ingredients: ['100% Pure Kashmir Red Chillies (Capsicum annuum)'],
    nutrition: {
      calories: '282 kcal / 100g',
      protein: '12g',
      carbs: '56g',
      fat: '14g',
      fiber: '27g'
    },
    storage: 'Store in a cool, dry place away from direct sunlight. Seal airtight after opening.',
    inStock: true,
    sku: 'CROF-KRC-100'
  },
  {
    id: 'lakadong-turmeric',
    name: 'Lakadong High Curcumin Turmeric',
    hindiName: 'लकाडोंग हल्दी',
    category: 'Essential Spices',
    tagline: '7.5%+ Natural Curcumin content from Jaintia Hills.',
    price: 399,
    originalPrice: 480,
    rating: 5.0,
    reviewCount: 412,
    image: '/images/lakadong-turmeric.png',
    gallery: [
      '/images/lakadong-turmeric.png'
    ],
    weightOptions: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
    isNew: true,
    discount: 17,
    description: 'Famed globally as the world’s finest turmeric. Cultivated organically in Meghalaya, possessing an intense golden hue and potent natural antioxidant benefits.',
    origin: 'Jaintia Hills, Meghalaya',
    pungency: 'Mild',
    ingredients: ['100% Stone-Ground Lakadong Turmeric Root'],
    nutrition: {
      calories: '354 kcal / 100g',
      protein: '8g',
      carbs: '65g',
      fat: '10g',
      fiber: '21g',
      curcumin: '7.5% Minimum Certified'
    },
    storage: 'Keep in glass jar in dark pantry.',
    inStock: true,
    sku: 'CROF-LT-100'
  },
  {
    id: 'coriander-seed-powder',
    name: 'Royal Malwa Coriander Powder',
    hindiName: 'मालवा धनिया पाउडर',
    category: 'Essential Spices',
    tagline: 'Citrusy, aromatic ground seeds from Madhya Pradesh.',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 198,
    image: '/images/coriander-powder.png',
    gallery: [
      '/images/coriander-powder.png'
    ],
    weightOptions: ['100g', '250g', '500g', '1kg'],
    isBestSeller: false,
    discount: 16,
    description: 'Slow-milled green coriander seeds harvested at peak essential oil density in Kumbhraj, MP. Adds sweet floral depth and velvety body to gravies.',
    origin: 'Kumbhraj, Madhya Pradesh',
    pungency: 'Mild',
    ingredients: ['100% Milled Whole Coriander Seeds'],
    nutrition: {
      calories: '298 kcal / 100g',
      protein: '12.3g',
      carbs: '55g',
      fat: '17.8g',
      fiber: '41.9g'
    },
    storage: 'Store airtight in cool location.',
    inStock: true,
    sku: 'CROF-RMC-100'
  },
  {
    id: 'royal-garam-masala',
    name: 'Royal Mughal Garam Masala',
    hindiName: 'शाही गर्म मसाला',
    category: 'Artisanal Blends',
    tagline: '16 Whole Spice slow-roasted heritage recipe.',
    price: 499,
    originalPrice: 599,
    rating: 4.95,
    reviewCount: 350,
    image: '/images/garam-masala.png',
    gallery: [
      '/images/garam-masala.png'
    ],
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: true,
    discount: 16,
    description: 'Hand-selected whole black cardamom, green cardamom, mace, nutmeg, star anise, cinnamon, cloves, and bay leaf roasted in clay ovens and coarsely ground.',
    origin: 'Old Delhi Heritage Recipe',
    pungency: 'Medium',
    ingredients: ['Black Cardamom', 'Green Cardamom', 'Cloves', 'Cinnamon', 'Star Anise', 'Nutmeg', 'Mace', 'Black Pepper', 'Cumin'],
    nutrition: {
      calories: '320 kcal / 100g',
      protein: '10g',
      carbs: '50g',
      fat: '15g',
      fiber: '30g'
    },
    storage: 'Keep container closed tight to preserve aromatic top notes.',
    inStock: true,
    sku: 'CROF-RGM-100'
  },
  {
    id: 'unrefined-roasted-cumin',
    name: 'Cumin Seed Powder (Jeera)',
    hindiName: 'भुना हुआ जीरा पाउडर',
    category: 'Essential Spices',
    tagline: 'Earthy roasted Unjha Cumin from Gujarat.',
    price: 299,
    originalPrice: 350,
    rating: 4.7,
    reviewCount: 156,
    image: '/images/cumin-powder.png',
    gallery: [
      '/images/cumin-powder.png'
    ],
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    discount: 14,
    description: 'Cleaned, sorted, and lightly roasted on iron skillets to release warm piney aromas before traditional stone milling.',
    origin: 'Unjha, Gujarat',
    pungency: 'Mild',
    ingredients: ['100% Whole Roasted Cumin Seeds'],
    nutrition: {
      calories: '375 kcal / 100g',
      protein: '18g',
      carbs: '44g',
      fat: '22g',
      fiber: '10.5g'
    },
    storage: 'Store away from moisture.',
    inStock: true,
    sku: 'CROF-CJP-100'
  },
  {
    id: 'wayanad-black-pepper',
    name: 'Tellicherry Extra Bold Black Pepper',
    hindiName: 'वायनाड काली मिर्च',
    category: 'Whole Spices',
    tagline: 'World renowned 4.25mm jumbo peppercorns.',
    price: 549,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 220,
    image: '/images/black-pepper.png',
    gallery: [
      '/images/black-pepper.png'
    ],
    weightOptions: ['100g', '250g', '500g', '1kg'],
    isBestSeller: true,
    discount: 15,
    description: 'Left on the vine until fully ripened in the high hills of Wayanad, Kerala. Delivers sharp citrusy heat and complex woody aromas.',
    origin: 'Wayanad, Kerala',
    pungency: 'Hot',
    ingredients: ['100% Whole Tellicherry Black Peppercorns'],
    nutrition: {
      calories: '255 kcal / 100g',
      protein: '10g',
      carbs: '64g',
      fat: '3.3g',
      fiber: '25g'
    },
    storage: 'Grind fresh in pepper mill for best aroma.',
    inStock: true,
    sku: 'CROF-TBP-100'
  },
  {
    id: 'kashmiri-saffron-strands',
    name: 'Mongra Grade A1 Kashmiri Saffron',
    hindiName: 'केसर (मोंगरा)',
    category: 'Exotic Reserve',
    tagline: 'Pure deep maroon stigmas tested for high Crocin.',
    price: 1899,
    originalPrice: 2200,
    rating: 5.0,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1615485290177-3e19273c52e4?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1615485290177-3e19273c52e4?auto=format&fit=crop&q=80&w=1000'
    ],
    weightOptions: ['1g', '2g', '5g'],
    isBestSeller: true,
    isNew: true,
    discount: 13,
    description: '100% natural, unadulterated red Mongra threads hand-harvested at dawn in Pampore. Certified for intense natural fragrance and rich golden infusion.',
    origin: 'Pampore, Kashmir',
    pungency: 'Mild',
    ingredients: ['100% Pure Kashmiri Saffron Stigmas'],
    nutrition: {
      calories: '310 kcal / 100g',
      protein: '11g',
      carbs: '65g',
      fat: '6g',
      fiber: '3.9g'
    },
    storage: 'Store in moisture-sealed glass container in dark cabinet.',
    inStock: true,
    sku: 'CROF-KS-1G'
  },
  {
    id: 'green-cardamom-jumbo',
    name: 'Idukki Green Cardamom 8mm+',
    hindiName: 'इदुक्की हरी इलायची',
    category: 'Whole Spices',
    tagline: 'Sweet eucalyptus fragrance with full seed pods.',
    price: 699,
    originalPrice: 850,
    rating: 4.85,
    reviewCount: 180,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000'
    ],
    weightOptions: ['100g', '250g', '500g'],
    isBestSeller: false,
    discount: 18,
    description: 'Plucked from pristine estates in Idukki, Western Ghats. Plump green pods bursting with fragrant essential oils.',
    origin: 'Idukki, Kerala',
    pungency: 'Mild',
    ingredients: ['100% Whole Green Cardamom Pods'],
    nutrition: {
      calories: '311 kcal / 100g',
      protein: '11g',
      carbs: '68g',
      fat: '6.7g',
      fiber: '28g'
    },
    storage: 'Keep pods whole until crushing for cooking or chai.',
    inStock: true,
    sku: 'CROF-GC-100'
  }
];

export const CATEGORIES = [
  'All Spices',
  'Essential Spices',
  'Chilli & Pepper',
  'Artisanal Blends',
  'Whole Spices',
  'Exotic Reserve'
];
