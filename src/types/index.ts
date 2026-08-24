export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free';
export type SpiceLevel = 0 | 1 | 2 | 3;
export type MenuCategory =
  | 'starters'
  | 'soups'
  | 'salads'
  | 'mains'
  | 'indian-specials'
  | 'fusion'
  | 'vegetarian'
  | 'non-vegetarian'
  | 'desserts'
  | 'drinks'
  | 'coffee';

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  category: MenuCategory[];
  dietary: DietaryTag[];
  spiceLevel: SpiceLevel;
  ingredients: string[];
  allergens: string[];
  prepTime: number;
  isPopular?: boolean;
  isNew?: boolean;
  isSignature?: boolean;
  calories?: number;
  addOns?: AddOn[];
  rating?: number;
  reviewCount?: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  addOns: CartAddOn[];
  specialInstructions?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type PaymentMethod = 'card' | 'upi' | 'cash';

export interface DeliveryAddress {
  address: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: CustomerInfo;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  tableNumber?: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedTime: number;
  notes?: string;
}

export type Occasion =
  | 'birthday'
  | 'anniversary'
  | 'date-night'
  | 'family-dinner'
  | 'business-dinner'
  | 'other';

export interface Reservation {
  id: string;
  reservationNumber: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion: Occasion;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  dish?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'restaurant' | 'kitchen' | 'people' | 'events';
  width: number;
  height: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price?: number;
  image: string;
  category: string;
  capacity?: number;
  isSoldOut?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  badge?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  favorites: string[];
  createdAt: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  currency: string;
  currencySymbol: string;
  taxRate: number;
  serviceChargeRate: number;
  deliveryFee: number;
  freeDeliveryMinimum: number;
}
