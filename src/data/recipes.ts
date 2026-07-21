export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Masterclass';
  image: string;
  featuredSpice: string;
  ingredients: string[];
  instructions: string[];
  chefTip: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'kashmiri-rogan-josh',
    title: 'Heritage Kashmiri Rogan Josh',
    subtitle: 'Classic slow-cooked aromatic gravy rich with Kashmiri red chilli and saffron infusion.',
    category: 'Main Course',
    prepTime: '20 mins',
    cookTime: '60 mins',
    servings: '4-6 Servings',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000',
    featuredSpice: 'Kashmiri Red Chilli Powder & Mongra Saffron',
    ingredients: [
      '800g tender lamb chops or shoulder, cut into cubes',
      '3 tbsp mustard oil',
      '2 tbsp CROF Kashmiri Red Chilli Powder',
      '1 tsp CROF High Curcumin Lakadong Turmeric',
      '1/2 tsp CROF Mongra Saffron strands steeped in 2 tbsp warm milk',
      '1 tsp CROF Royal Mughal Garam Masala',
      '1 cup whisked plain yogurt',
      'Whole spices: 2 bay leaves, 1 cinnamon stick, 4 green cardamom pods'
    ],
    instructions: [
      'Heat mustard oil in a heavy brass degchi until smoking point, then reduce heat.',
      'Add whole spices and let them crackle for 30 seconds to infuse aromatics into the oil.',
      'Add lamb pieces and sear on medium-high flame until light golden on all edges.',
      'Mix CROF Kashmiri Red Chilli Powder with 3 tbsp warm water to form a smooth paste and pour over lamb.',
      'Stir in whisked yogurt gently on low flame to prevent curdling, followed by Lakadong Turmeric.',
      'Cover and simmer on low heat for 45-50 minutes until meat is butter tender.',
      'Finish with CROF Saffron milk and Royal Garam Masala. Rest for 10 minutes before serving.'
    ],
    chefTip: 'The secret to authentic Rogan Josh is using pure Kashmiri Chilli paste instead of onion-tomato puree, creating a silky crimson sauce.'
  },
  {
    id: 'golden-turmeric-latte',
    title: 'Royal Lakadong Golden Elixir',
    subtitle: 'Warm nourishing turmeric latte with black pepper bioavailability activation.',
    category: 'Beverage',
    prepTime: '5 mins',
    cookTime: '5 mins',
    servings: '2 Cups',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=1000',
    featuredSpice: 'Lakadong High Curcumin Turmeric',
    ingredients: [
      '500ml whole milk or almond milk',
      '1 tsp CROF Lakadong High Curcumin Turmeric',
      '1/4 tsp CROF Tellicherry Black Pepper (freshly cracked)',
      '1 pinch CROF Green Cardamom Powder',
      '1 tbsp wild raw honey or maple syrup',
      '1 tsp pure cold-pressed coconut oil or A2 Ghee'
    ],
    instructions: [
      'Pour milk into a small heavy saucepan over low-medium heat.',
      'Whisk in Lakadong Turmeric, cracked Tellicherry Black Pepper, and Cardamom powder.',
      'Simmer gently for 4-5 minutes without boiling over.',
      'Remove from heat, whisk in honey and coconut oil/ghee until creamy froth forms.',
      'Pour into luxury ceramic mugs and dust with extra cardamom.'
    ],
    chefTip: 'Black pepper contains piperine, which boosts curcumin absorption by up to 2,000%!'
  },
  {
    id: 'dal-tadka-malwa',
    title: 'Smoked Malwa Dal Tadka',
    subtitle: 'Yellow lentils infused with stone-ground cumin, garlic ghee tadka, and fresh coriander.',
    category: 'Comfort Food',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000',
    featuredSpice: 'Cumin Seed Powder & Royal Malwa Coriander',
    ingredients: [
      '1 cup Toor Dal (pigeon peas) washed',
      '1 tsp CROF Lakadong Turmeric',
      '1 tbsp CROF Royal Malwa Coriander Powder',
      '1 tsp CROF Cumin Seed Powder',
      '2 tbsp pure A2 Ghee',
      '4 garlic cloves slivered, 2 red dry chillies'
    ],
    instructions: [
      'Pressure cook washed lentils with 3.5 cups water, salt, and CROF Turmeric for 4 whistles.',
      'Whisk cooked lentils to a velvety texture and bring to a gentle boil with coriander powder.',
      'In a tadka pan, melt A2 Ghee. Add cumin seeds, slivered garlic, and dry chillies until fragrant.',
      'Pour sizzling tempering immediately over dal and cover with lid to trap smoked aroma.'
    ],
    chefTip: 'Dungar method: Place a glowing piece of charcoal in a small bowl inside the dal pot, drop 1/2 tsp ghee on it, and close the lid for 2 minutes for hotel-style charcoal smokiness.'
  }
];
