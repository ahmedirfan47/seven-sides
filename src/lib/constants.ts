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
    tag:     null,
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+DHA+Phase+5+Lahore',
  },
  {
    id:      'cantt',
    name:    'Girja Chowk Cantt',
    address: 'Bagh Ali Road, Girja Chowk, Cantt, Lahore',
    phone:   '+92 322 7694926',
    hours:   '12:00 PM – 01:00 AM',
    note:    'Takeaway & Delivery only',
    tag:     null,
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Girja+Chowk+Cantt+Lahore',
  },
  {
    id:      'lake-city',
    name:    'Lake City',
    address: 'Lake City, Lahore',
    phone:   '+92 370 7743936',
    hours:   '12:00 PM – 01:00 AM',
    note:    null,
    tag:     null,
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Lake+City+Lahore',
  },
  {
    id:      'model-town',
    name:    'Model Town',
    address: 'Model Town, Lahore',
    phone:   null,
    hours:   '12:00 PM – 01:00 AM',
    note:    'Newest location',
    tag:     'New',
    mapsUrl: 'https://maps.google.com/?q=Seven+Sides+Model+Town+Lahore',
  },
];

export const HEAT_LEVELS = [
  {
    id:     'none',
    label:  'No Heat',
    emoji:  '☁️',
    desc:   'Crispy, bold flavour — zero burn',
    color:  'text-sky-400',
    bg:     'bg-sky-900/30',
    border: 'border-sky-800',
  },
  {
    id:     'country',
    label:  'Country Heat',
    emoji:  '🔥',
    desc:   'Gentle warmth, slow build',
    color:  'text-amber-400',
    bg:     'bg-amber-900/30',
    border: 'border-amber-800',
  },
  {
    id:     'screamer',
    label:  'Screamer',
    emoji:  '🔥🔥🔥',
    desc:   'Full fire. For the brave only.',
    color:  'text-fire',
    bg:     'bg-fire/10',
    border: 'border-fire/40',
  },
] as const;

export type HeatLevel = typeof HEAT_LEVELS[number]['id'];

export const SAUCES = [
  {
    id:    'comeback',
    name:  'Comeback',
    desc:  'The house signature. Creamy, tangy and completely addictive.',
    dot:   'bg-amber-500',
    ring:  'ring-amber-500/30',
  },
  {
    id:    'salsa',
    name:  'Salsa',
    desc:  'Fresh, zesty, tomato-forward heat.',
    dot:   'bg-fire',
    ring:  'ring-fire/30',
  },
  {
    id:    'garlic-mayo',
    name:  'Garlic Mayo',
    desc:  'Rich, garlicky — pairs with absolutely everything.',
    dot:   'bg-yellow-400',
    ring:  'ring-yellow-400/30',
  },
  {
    id:    'chipotle',
    name:  'Chipotle',
    desc:  'Smoky with a slow, building fire.',
    dot:   'bg-orange-600',
    ring:  'ring-orange-600/30',
  },
];

export const NAV_LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/menu',     label: 'Menu'     },
  { href: '/branches', label: 'Branches' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
];

/* Categories matching the Instagram menu board order */
export const CATEGORIES = [
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

export const CAT_EMOJI: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.emoji]),
);