export const SITE = {
  name:      'Seven Sides',
  tagline:   'Home of Red Tenders',
  slogan:    'Bold Flavors. Memories Worth Sharing.',
  url:       'https://sevensides.pk',
  phone:     '+92 319 6481040',
  email:     'sevensides.pk@gmail.com',
  instagram: 'https://www.instagram.com/sevensides.pk',
  facebook:  'https://www.facebook.com/SevenSides.pk',
  whatsapp:  'https://wa.me/c/923196481040',
};

export const BRANCHES = [
  {
    id:      'dha-p5',
    name:    'DHA Phase 5',
    address: '15-A Street 2, Sector A, Phase 5, D.H.A, Lahore',
    phone:   '+92 319 6481040',
    hours:   '12:00 PM – 12:00 AM',
    note:    null,
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+DHA+Phase+5+Lahore',
  },
  {
    id:      'cantt',
    name:    'Girja Chowk Cantt',
    address: 'Bagh Ali Road, Girja Chowk, Cantt, Lahore',
    phone:   '+92 322 7694926',
    hours:   '12:00 PM – 01:00 AM',
    note:    'Takeaway & Delivery only',
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Girja+Chowk+Cantt+Lahore',
  },
  {
    id:      'lake-city',
    name:    'Lake City',
    address: 'Lake City, Lahore',
    phone:   '+92 370 7743936',
    hours:   '12:00 PM – 01:00 AM',
    note:    null,
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Lake+City+Lahore',
  },
  {
    id:      'model-town',
    name:    'Model Town',
    address: 'Model Town, Lahore',
    phone:   null,
    hours:   '12:00 PM – 01:00 AM',
    note:    'Newest location',
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Model+Town+Lahore',
  },
];

export const HEAT_LEVELS = [
  { id:'none',     label:'No Heat',      emoji:'☁️',      desc:'Crispy, zero heat',         color:'text-blue-400',  bg:'bg-blue-900/30',  border:'border-blue-800'  },
  { id:'country',  label:'Country Heat', emoji:'🔥',      desc:'Gentle, building warmth',   color:'text-amber-400', bg:'bg-amber-900/30', border:'border-amber-800' },
  { id:'screamer', label:'Screamer',     emoji:'🔥🔥🔥', desc:'Full fire — for the brave', color:'text-heat',      bg:'bg-heat/10',      border:'border-heat/40'   },
] as const;

export type HeatLevel = typeof HEAT_LEVELS[number]['id'];

export const SAUCES = [
  { name: 'Comeback',    desc: 'The signature sauce. Creamy, tangy, addictive.', color: 'bg-amber-500', num: '01' },
  { name: 'Salsa',       desc: 'Fresh, zesty, tomato-forward.',                  color: 'bg-heat',      num: '02' },
  { name: 'Garlic Mayo', desc: 'Rich, garlicky, pairs with everything.',         color: 'bg-yellow-500',num: '03' },
  { name: 'Chipotle',    desc: 'Smoky with a slow, building heat.',              color: 'bg-orange-700',num: '04' },
];

export const NAV_LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/menu',     label: 'Menu'     },
  { href: '/branches', label: 'Branches' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
];

export const SS_CATEGORIES = [
  { label: 'Bird Menu',  slug: 'bird-menu',  emoji: '🥪' },
  { label: 'Sliders',    slug: 'sliders',    emoji: '🍔' },
  { label: 'Tenders',    slug: 'tenders',    emoji: '🍗' },
  { label: 'Wraps',      slug: 'wraps',      emoji: '🌯' },
  { label: 'Fries',      slug: 'fries',      emoji: '🍟' },
  { label: 'Shakes',     slug: 'shakes',     emoji: '🥤' },
  { label: 'SS Treats',  slug: 'ss-treats',  emoji: '🍮' },
  { label: 'Extras',     slug: 'extras',     emoji: '➕' },
  { label: 'Drinks',     slug: 'drinks',     emoji: '🧃' },
];

export const CATEGORY_EMOJI: Record<string, string> = {
  'bird-menu': '🥪', 'sliders': '🍔', 'tenders': '🍗', 'wraps': '🌯',
  'fries': '🍟', 'shakes': '🥤', 'ss-treats': '🍮', 'extras': '➕', 'drinks': '🧃',
};