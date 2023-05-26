export type User = {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  cart: {
    products: Array<any>;
    totalPrice: number;
    totalAfterDiscount: number;
  };
};
// color: string;
// variant: string;
// count: number;
// price: number;
// finalPrice: number;

export type Product = {
  thumbnail: {
    public_ic: string;
    url: string;
  };
  title: string;
  images: Array<string>;
  rating: number;
  quantity: number;
  price: number;
};

export interface Category {
  title: string;
  imageUrl: string;
  slug: string;
  status: boolean;
}

export interface Transition {
  duration?: string;
  timingFunction?: string;
}

export interface Items {
  [key: string]: (value: boolean) => void;
}
