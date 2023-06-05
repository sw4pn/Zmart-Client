import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const HeaderOrders = () => {
  return (
    <Link to="/orders" className="relative">
      <FiShoppingBag
        size={32}
        className="text-neutral-200 hover:opacity-70 cursor-pointer"
      /> 
    </Link>
  );
};

export default HeaderOrders;
