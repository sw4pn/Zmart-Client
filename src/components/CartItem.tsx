import { FC, useEffect, useState } from "react";
import { CartItem } from "../types";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  loadUser,
  removeFromCart,
  updateCart,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";

interface Props {
  item: CartItem;
}

const CartItem: FC<Props> = ({ item }) => {
  const [loadCart, setLoadCart] = useState(false);
  const dispatch: any = useDispatch();
  const product = item.product;

  const thumb = product.thumbnail?.url
    ? product.thumbnail.url
    : "/images/product-sample.jpg";
  const totalPrice = item.finalPrice * item.quantity;

  const handleCart = (qty: number) => {
    const data = {
      productId: product._id,
      quantity: qty,
    };

    dispatch(updateCart(data)).then(() => setLoadCart(true));
  };

  const deleteCartItem = () => {
    const cartId = product._id;

    dispatch(removeFromCart(cartId)).then(() => setLoadCart(true));
  };

  useEffect(() => {
    if (loadCart) {
      dispatch(loadUser());
      setLoadCart(false);
    }
  }, [loadCart]);

  return (
    <>
      <div className="flex flex-col justify-between max-w-screen-lg gap-4 px-2 py-4 mx-auto my-4 border-b lg:gap-0 lg:flex-row">
        <div className="flex flex-wrap items-start justify-start flex-1 gap-4 py-4 sm:py-0 ">
          <img src={thumb} alt="image" className="w-16 h-16" />
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">
              <Link
                to={`/product/${product.slug}`}
                className="hover:opacity-70">
                {product.title}
              </Link>
            </h4>
            <div className="text-sm text-neutral-400">
              {item.color.title && <>Color: {item.color.title}</>}
            </div>
            <span className="text-sm text-neutral-400">
              {item.variant.title && <> {item.variant.title}</>}
            </span>
          </div>
          <div className="flex items-center self-center gap-2 ml-auto mr-10">
            <span className="text-neutral-400">Price</span>
            <span className="text-sm line-through text-neutral-500">
              ₹{item.price}
            </span>{" "}
            ₹ {item.finalPrice}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 sm:justify-center">
          <div className="flex items-center justify-center gap-2">
            <button
              className="w-8 h-8 m-2 font-bold border rounded-full cursor-pointer hover:bg-neutral-100 border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400"
              disabled={item.quantity <= 1}
              onClick={() => handleCart(item.quantity - 1)}>
              -
            </button>
            <span className="text-neutral-400">Qty: </span> {item.quantity}
            <button
              className="w-8 h-8 m-2 font-bold border rounded-full cursor-pointer hover:bg-neutral-100 border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400"
              disabled={item.quantity > 50}
              onClick={() => handleCart(item.quantity + 1)}>
              +
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-400">Total:</span>
            <span className="text-base font-semibold"> ₹ {totalPrice} </span>
          </div>
          <div
            className="px-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
            onClick={deleteCartItem}>
            <HiOutlineTrash size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
