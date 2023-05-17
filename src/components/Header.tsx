import { Link } from "react-router-dom";
import { HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import HeaderSearch from "./header/HeaderSearch";
import HeaderCart from "./header/HeaderCart";
import HeaderUser from "./header/HeaderUser";
import Navigation from "./navigation/Navigation";
import Spacer from "./helpers/Spacer";

const Header = () => {
  return (
    <>
      <div className="bg-red-300 fixed inset-x-0 top-0 h-20">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="/images/zmart-logo.png"
              alt="zmart-logo"
              className="w-20 h-auto lg:w-28 lg:h-12"
            />
          </Link>

          <div className="hidden lg:block">
            <HeaderSearch />
          </div>

          <div className="flex justify-center items-center">
            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <HiOutlinePhone size={28} />
              <div className="lg:flex lg:flex-col pointer-events-none">
                <span>Helpline 24/7</span>
                <span>(+911) 4578-4578</span>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <HiOutlineUser size={32} />
              <div className="lg:flex lg:flex-col">
                <HeaderUser />
              </div>
            </div>
            <HeaderCart />
            <Navigation />
          </div>
        </div>
      </div>

      <Spacer size={80} />

      <div className="lg:hidden">
        <HeaderSearch />
      </div>
    </>
  );
};

export default Header;
