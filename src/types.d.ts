export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  isActive?: boolean;
  cart?: Cart;
  role?: string;
  address?: Address;
  wishlist?: Product[];
  orders?: number;
};

export type Product = {
  _id: string;
  thumbnail: {
    public_ic: string;
    url: string;
  };
  slug: string;
  title: string;
  images: [
    {
      public_id: string;
      url: string;
    }
  ];
  brand: Brand;
  color: Color[];
  rating: number;
  quantity: number;
  price: number;
  discount: number;
  reviews: Review[];
  category?: Category;
  variant?: Array<{ id?: number; title?: string }>;
  description?: string;
  specification?: {
    extra: Extra;
  };
  extra?: Extra[];
};

interface Extra {
  name?: string;
  feature?: string;
}

interface Address {
  address?: string;
  city?: string;
  pinCode?: string | number;
  state?: string;
  country?: string;
}

export interface Review {
  _id: string;
  star: number;
  review: string;
  postedBy: User;
  date: Date;
}

export interface Category {
  _id?: string;
  title?: string;
  imageUrl?: string;
  slug?: string;
  status?: boolean;
}

export interface Brand {
  title: string;
  imageUrl: string;
  slug: string;
  status: boolean;
}

export interface Color {
  _id: string;
  title: string;
  value: string;
}

export interface Cart {
  products: CartItem[];
  totalPrice: number;
  totalAfterDiscount: number;
}

export interface Coupon {
  name: string;
  expire: Date;
  discount: number;
  isActive: boolean;
}

export interface CartItem {
  product?: Product;
  quantity?: number;
  color?: Color;
  variant?: Variant | string;
  price?: number;
  finalPrice?: number;
}

type Variant = {
  _id?: string;
  title?: string;
};

export interface OrderItems {
  product: string;
  price: number;
  quantity: number;
  color: string;
  variant: string;
}

export interface Order {
  _id?: string;
  id?: string;
  orderId?: string;
  shippingInfo: Address;
  orderItems: OrderItem[];
  orderedBy: string;
  orderPrice?: number;
  taxPrice?: number;
  status?: string;
  paymentInfo?: PaymentInfo;
  deliveryStatus?: string;
  finalAmount?: number;
  orderTime?: string;
}

interface PaymentInfo {
  id: string;
  status: string;
  payTime: string;
  razorpay: {
    order: object;
    razOrderId: string;
    razPaymentId: string;
    verified: boolean;
  };
}

export interface Transition {
  duration?: string;
  timingFunction?: string;
}

export interface Items {
  [key: string]: (value: boolean) => void;
}
