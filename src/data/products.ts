export interface ProductVariant {
  weight: string;
  sku: string;
  price: number;
  salePrice: number;
  currentStock: number;
  reservedStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out Of Stock';
  barcode?: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: string[];
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
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
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "kashmiri-red-chilli",
    name: "Kashmiri Red Chilli Powder",
    hindiName: "काश्मीरी लाल मिर्च",
    category: [
      "Chilli & Pepper"
    ],
    tagline: "Vibrant natural crimson hue with mild authentic warmth.",
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 284,
    image: "/images/kashmiri-chilli.png",
    gallery: [
      "/images/kashmiri-chilli.png"
    ],
    isBestSeller: true,
    discount: 17,
    description: "Sourced directly from the snow-capped valleys of Pampore, Kashmir. Sun-dried and cold-ground to preserve essential oils and produce a stunning natural deep red color without high heat pungency.",
    origin: "Pampore Valley, Jammu & Kashmir",
    pungency: "Mild",
    ingredients: [
      "100% Pure Kashmir Red Chillies (Capsicum annuum)"
    ],
    nutrition: {
      calories: "282 kcal / 100g",
      protein: "12g",
      carbs: "56g",
      fat: "14g",
      fiber: "27g"
    },
    storage: "Store in a cool, dry place away from direct sunlight. Seal airtight after opening.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-KRC-100G",
        price: 420,
        salePrice: 349,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123450138"
      },
      {
        weight: "250g",
        sku: "CROF-KRC-250G",
        price: 1008,
        salePrice: 838,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123484277"
      },
      {
        weight: "500g",
        sku: "CROF-KRC-500G",
        price: 1890,
        salePrice: 1571,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123474002"
      },
      {
        weight: "1kg",
        sku: "CROF-KRC-1KG",
        price: 3360,
        salePrice: 2792,
        currentStock: 15,
        reservedStock: 1,
        status: "Low Stock",
        barcode: "89012343977"
      }
    ]
  },
  {
    id: "lakadong-turmeric",
    name: "Lakadong High Curcumin Turmeric",
    hindiName: "लकाडोंग हल्दी",
    category: [
      "Essential Spices"
    ],
    tagline: "7.5%+ Natural Curcumin content from Jaintia Hills.",
    price: 399,
    originalPrice: 480,
    rating: 5,
    reviewCount: 412,
    image: "/images/lakadong-turmeric.png",
    gallery: [
      "/images/lakadong-turmeric.png"
    ],
    isBestSeller: true,
    isNew: true,
    discount: 17,
    description: "Famed globally as the world’s finest turmeric. Cultivated organically in Meghalaya, possessing an intense golden hue and potent natural antioxidant benefits.",
    origin: "Jaintia Hills, Meghalaya",
    pungency: "Mild",
    ingredients: [
      "100% Stone-Ground Lakadong Turmeric Root"
    ],
    nutrition: {
      calories: "354 kcal / 100g",
      protein: "8g",
      carbs: "65g",
      fat: "10g",
      fiber: "21g",
      curcumin: "7.5% Minimum Certified"
    },
    storage: "Keep in glass jar in dark pantry.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-LT-100G",
        price: 480,
        salePrice: 399,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "89012343115"
      },
      {
        weight: "250g",
        sku: "CROF-LT-250G",
        price: 1152,
        salePrice: 958,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123484649"
      },
      {
        weight: "500g",
        sku: "CROF-LT-500G",
        price: 2160,
        salePrice: 1796,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123476336"
      },
      {
        weight: "1kg",
        sku: "CROF-LT-1KG",
        price: 3840,
        salePrice: 3192,
        currentStock: 15,
        reservedStock: 1,
        status: "Low Stock",
        barcode: "890123469685"
      }
    ]
  },
  {
    id: "coriander-seed-powder",
    name: "Royal Malwa Coriander Powder",
    hindiName: "मालवा धनिया पाउडर",
    category: [
      "Essential Spices"
    ],
    tagline: "Citrusy, aromatic ground seeds from Madhya Pradesh.",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 198,
    image: "/images/coriander-powder.png",
    gallery: [
      "/images/coriander-powder.png"
    ],
    isBestSeller: false,
    discount: 16,
    description: "Slow-milled green coriander seeds harvested at peak essential oil density in Kumbhraj, MP. Adds sweet floral depth and velvety body to gravies.",
    origin: "Kumbhraj, Madhya Pradesh",
    pungency: "Mild",
    ingredients: [
      "100% Milled Whole Coriander Seeds"
    ],
    nutrition: {
      calories: "298 kcal / 100g",
      protein: "12.3g",
      carbs: "55g",
      fat: "17.8g",
      fiber: "41.9g"
    },
    storage: "Store airtight in cool location.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-RMC-100G",
        price: 299,
        salePrice: 249,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123477662"
      },
      {
        weight: "250g",
        sku: "CROF-RMC-250G",
        price: 718,
        salePrice: 598,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123475589"
      },
      {
        weight: "500g",
        sku: "CROF-RMC-500G",
        price: 1346,
        salePrice: 1121,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123413477"
      },
      {
        weight: "1kg",
        sku: "CROF-RMC-1KG",
        price: 2392,
        salePrice: 1992,
        currentStock: 15,
        reservedStock: 1,
        status: "Low Stock",
        barcode: "890123454874"
      }
    ]
  },
  {
    id: "royal-garam-masala",
    name: "Royal Mughal Garam Masala",
    hindiName: "शाही गर्म मसाला",
    category: [
      "Artisanal Blends"
    ],
    tagline: "16 Whole Spice slow-roasted heritage recipe.",
    price: 499,
    originalPrice: 599,
    rating: 4.95,
    reviewCount: 350,
    image: "/images/garam-masala.png",
    gallery: [
      "/images/garam-masala.png"
    ],
    isBestSeller: true,
    discount: 16,
    description: "Hand-selected whole black cardamom, green cardamom, mace, nutmeg, star anise, cinnamon, cloves, and bay leaf roasted in clay ovens and coarsely ground.",
    origin: "Old Delhi Heritage Recipe",
    pungency: "Medium",
    ingredients: [
      "Black Cardamom",
      "Green Cardamom",
      "Cloves",
      "Cinnamon",
      "Star Anise",
      "Nutmeg",
      "Mace",
      "Black Pepper",
      "Cumin"
    ],
    nutrition: {
      calories: "320 kcal / 100g",
      protein: "10g",
      carbs: "50g",
      fat: "15g",
      fiber: "30g"
    },
    storage: "Keep container closed tight to preserve aromatic top notes.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-RGM-100G",
        price: 599,
        salePrice: 499,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123412465"
      },
      {
        weight: "250g",
        sku: "CROF-RGM-250G",
        price: 1438,
        salePrice: 1198,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123467871"
      },
      {
        weight: "500g",
        sku: "CROF-RGM-500G",
        price: 2696,
        salePrice: 2246,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123499799"
      }
    ]
  },
  {
    id: "unrefined-roasted-cumin",
    name: "Cumin Seed Powder (Jeera)",
    hindiName: "भुना हुआ जीरा पाउडर",
    category: [
      "Essential Spices"
    ],
    tagline: "Earthy roasted Unjha Cumin from Gujarat.",
    price: 299,
    originalPrice: 350,
    rating: 4.7,
    reviewCount: 156,
    image: "/images/cumin-powder.png",
    gallery: [
      "/images/cumin-powder.png"
    ],
    isBestSeller: false,
    discount: 14,
    description: "Cleaned, sorted, and lightly roasted on iron skillets to release warm piney aromas before traditional stone milling.",
    origin: "Unjha, Gujarat",
    pungency: "Mild",
    ingredients: [
      "100% Whole Roasted Cumin Seeds"
    ],
    nutrition: {
      calories: "375 kcal / 100g",
      protein: "18g",
      carbs: "44g",
      fat: "22g",
      fiber: "10.5g"
    },
    storage: "Store away from moisture.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-CJP-100G",
        price: 350,
        salePrice: 299,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123468848"
      },
      {
        weight: "250g",
        sku: "CROF-CJP-250G",
        price: 840,
        salePrice: 718,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123495549"
      },
      {
        weight: "500g",
        sku: "CROF-CJP-500G",
        price: 1575,
        salePrice: 1346,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123425115"
      }
    ]
  },
  {
    id: "wayanad-black-pepper",
    name: "Tellicherry Extra Bold Black Pepper",
    hindiName: "वायनाड काली मिर्च",
    category: [
      "Whole Spices"
    ],
    tagline: "World renowned 4.25mm jumbo peppercorns.",
    price: 549,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 220,
    image: "/images/black-pepper.png",
    gallery: [
      "/images/black-pepper.png"
    ],
    isBestSeller: true,
    discount: 15,
    description: "Left on the vine until fully ripened in the high hills of Wayanad, Kerala. Delivers sharp citrusy heat and complex woody aromas.",
    origin: "Wayanad, Kerala",
    pungency: "Hot",
    ingredients: [
      "100% Whole Tellicherry Black Peppercorns"
    ],
    nutrition: {
      calories: "255 kcal / 100g",
      protein: "10g",
      carbs: "64g",
      fat: "3.3g",
      fiber: "25g"
    },
    storage: "Grind fresh in pepper mill for best aroma.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-TBP-100G",
        price: 650,
        salePrice: 549,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123425047"
      },
      {
        weight: "250g",
        sku: "CROF-TBP-250G",
        price: 1560,
        salePrice: 1318,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123477634"
      },
      {
        weight: "500g",
        sku: "CROF-TBP-500G",
        price: 2925,
        salePrice: 2471,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123479436"
      },
      {
        weight: "1kg",
        sku: "CROF-TBP-1KG",
        price: 5200,
        salePrice: 4392,
        currentStock: 15,
        reservedStock: 1,
        status: "Low Stock",
        barcode: "890123426796"
      }
    ]
  },
  {
    id: "kashmiri-saffron-strands",
    name: "Mongra Grade A1 Kashmiri Saffron",
    hindiName: "केसर (मोंगरा)",
    category: [
      "Exotic Reserve"
    ],
    tagline: "Pure deep maroon stigmas tested for high Crocin.",
    price: 1899,
    originalPrice: 2200,
    rating: 5,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1615485290177-3e19273c52e4?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1615485290177-3e19273c52e4?auto=format&fit=crop&q=80&w=1000"
    ],
    isBestSeller: true,
    isNew: true,
    discount: 13,
    description: "100% natural, unadulterated red Mongra threads hand-harvested at dawn in Pampore. Certified for intense natural fragrance and rich golden infusion.",
    origin: "Pampore, Kashmir",
    pungency: "Mild",
    ingredients: [
      "100% Pure Kashmiri Saffron Stigmas"
    ],
    nutrition: {
      calories: "310 kcal / 100g",
      protein: "11g",
      carbs: "65g",
      fat: "6g",
      fiber: "3.9g"
    },
    storage: "Store in moisture-sealed glass container in dark cabinet.",
    variants: [
      {
        weight: "1g",
        sku: "CROF-KS-1G",
        price: 2200,
        salePrice: 1899,
        currentStock: 50,
        reservedStock: 5,
        status: "In Stock",
        barcode: "890123457986"
      },
      {
        weight: "2g",
        sku: "CROF-KS-2G",
        price: 4180,
        salePrice: 3608,
        currentStock: 12,
        reservedStock: 1,
        status: "Low Stock",
        barcode: "890123468447"
      },
      {
        weight: "5g",
        sku: "CROF-KS-5G",
        price: 9900,
        salePrice: 8546,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "89012344833"
      }
    ]
  },
  {
    id: "green-cardamom-jumbo",
    name: "Idukki Green Cardamom 8mm+",
    hindiName: "इदुक्की हरी इलायची",
    category: [
      "Whole Spices"
    ],
    tagline: "Sweet eucalyptus fragrance with full seed pods.",
    price: 699,
    originalPrice: 850,
    rating: 4.85,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000"
    ],
    isBestSeller: false,
    discount: 18,
    description: "Plucked from pristine estates in Idukki, Western Ghats. Plump green pods bursting with fragrant essential oils.",
    origin: "Idukki, Kerala",
    pungency: "Mild",
    ingredients: [
      "100% Whole Green Cardamom Pods"
    ],
    nutrition: {
      calories: "311 kcal / 100g",
      protein: "11g",
      carbs: "68g",
      fat: "6.7g",
      fiber: "28g"
    },
    storage: "Keep pods whole until crushing for cooking or chai.",
    variants: [
      {
        weight: "100g",
        sku: "CROF-GC-100G",
        price: 850,
        salePrice: 699,
        currentStock: 120,
        reservedStock: 12,
        status: "In Stock",
        barcode: "890123457256"
      },
      {
        weight: "250g",
        sku: "CROF-GC-250G",
        price: 2040,
        salePrice: 1678,
        currentStock: 42,
        reservedStock: 4,
        status: "In Stock",
        barcode: "890123439675"
      },
      {
        weight: "500g",
        sku: "CROF-GC-500G",
        price: 3825,
        salePrice: 3146,
        currentStock: 0,
        reservedStock: 0,
        status: "Out Of Stock",
        barcode: "890123495640"
      }
    ]
  }
];

export const CATEGORIES = [
  'All Products',
  'Spice Powders',
  'Whole Spices',
  'Masalas',
  'Combo Packs'
];
