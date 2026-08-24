import type { RestaurantInfo } from '@/types';

export const restaurant: RestaurantInfo = {
  name: 'The Doodle Table',
  tagline: 'Good Food. Good Mood. Gather Around.',
  description:
    'A modern dining room where contemporary Indian flavours meet playful craft. Seasonal ingredients, bold plates, and a table made for good conversations.',
  phone: '+91 98765 43210',
  email: 'hello@thedoodletable.in',
  address: {
    street: '42 Forest Lane, Saheed Nagar',
    city: 'Bhubaneswar',
    state: 'Odisha',
    postalCode: '751007',
    country: 'India',
  },
  hours: [
    { day: 'Monday', open: '11:30 AM', close: '10:30 PM' },
    { day: 'Tuesday', open: '11:30 AM', close: '10:30 PM' },
    { day: 'Wednesday', open: '11:30 AM', close: '10:30 PM' },
    { day: 'Thursday', open: '11:30 AM', close: '10:30 PM' },
    { day: 'Friday', open: '11:30 AM', close: '11:30 PM' },
    { day: 'Saturday', open: '11:30 AM', close: '11:30 PM' },
    { day: 'Sunday', open: '10:00 AM', close: '10:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/thedoodletable',
    facebook: 'https://facebook.com/thedoodletable',
    twitter: 'https://twitter.com/thedoodletable',
    youtube: 'https://youtube.com/@thedoodletable',
  },
  currency: 'INR',
  currencySymbol: '₹',
  taxRate: 0.05,
  serviceChargeRate: 0.1,
  deliveryFee: 49,
  freeDeliveryMinimum: 799,
};

export const chef = {
  name: 'Ananya Mehta',
  title: 'Executive Chef & Co-Founder',
  image:
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
  bio: 'Raised between Kolkata kitchens and European pastry counters, Chef Ananya believes every plate should tell a small story. She sources from 25 local farms and never serves a dish she has not tasted twice.',
  philosophy:
    'Cook with curiosity. Season with memory. Serve with warmth. The best meals are the ones that make people linger.',
  signatureDish: 'Tandoori Cauliflower Steak with Coconut Chutney',
  doodleNote: "Chef's secret: never stop tasting.",
};

export const stats = [
  { label: 'Years', value: 12, suffix: '+' },
  { label: 'Signature Dishes', value: 40, suffix: '+' },
  { label: 'Local Suppliers', value: 25, suffix: '' },
  { label: 'Happy Guests', value: 100, suffix: 'K+' },
];

export const timeSlots = [
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
];

export const occasions = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date-night', label: 'Date Night' },
  { value: 'family-dinner', label: 'Family Dinner' },
  { value: 'business-dinner', label: 'Business Dinner' },
  { value: 'other', label: 'Other' },
] as const;

export const categoryLabels: Record<string, string> = {
  starters: 'Starters',
  soups: 'Soups',
  salads: 'Salads',
  mains: 'Main Course',
  'indian-specials': 'Indian Specials',
  fusion: 'Fusion',
  vegetarian: 'Vegetarian',
  'non-vegetarian': 'Non-Vegetarian',
  desserts: 'Desserts',
  drinks: 'Drinks',
  coffee: 'Coffee',
};
