export type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    url: string;
  };
  isActive: boolean;
  cart: Cart;
  role: string;
  wishlist: Product[];
};
// color: string;
// variant: string;
// count: number;
// finalPrice: number;

export type Product = {
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
  reviews: [];
};

export interface Category {
  title: string;
  imageUrl: string;
  slug: string;
  status: boolean;
}

export interface Brand {
  title: string;
  imageUrl: string;
  slug: string;
  status: boolean;
}

export interface Color {
  title: string;
  value: string;
}

export interface Cart {
  products: CartItem[];
  totalPrice: number;
  totalAfterDiscount: number;
}

export interface CartItem {
  product?: Product;
  quantity?: number;
  color?: Color;
  variant?: string;
  price?: number;
  finalPrice?: number;
}

export interface Transition {
  duration?: string;
  timingFunction?: string;
}

export interface Items {
  [key: string]: (value: boolean) => void;
}
