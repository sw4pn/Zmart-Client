import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthState } from "../../features/auth/authSlice";
import { RootState } from "../../app/store";

const HeaderCart = () => {
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const cart = authState.user?.cart;
  const no = cart?.products ? cart.products.length : 0;
  const cartPrice = cart?.totalAfterDiscount
    ? `₹ ${cart?.totalAfterDiscount}`
    : ``;

  return (
    <Link to="/cart" className="flex justify-center items-center relative">
      <AiOutlineShoppingCart size={32} />
      <span className="">{no}</span>
      <div className="hidden lg:flex lg:flex-col">
        <span>Cart</span>
        <span>{cartPrice}</span>
      </div>
    </Link>
  );
};

export default HeaderCart;
