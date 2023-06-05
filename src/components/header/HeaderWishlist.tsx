import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const HeaderWishlist = () => {
  const user = useSelector(selectAuthUser);

  const wishlist = user?.wishlist || [];
  const wishlistItems = wishlist.length;

  return (
    <Link to="/wishlist" className="relative">
      <AiOutlineHeart
        size={32}
        className="text-neutral-200 hover:opacity-70 cursor-pointer"
      />
      <span className="absolute text-sm bg-neutral-500 p-1 rounded-full -top-3 -right-3">
        {wishlistItems}
      </span>
    </Link>
  );
};

export default HeaderWishlist;
