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
