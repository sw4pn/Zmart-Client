import { Link } from "react-router-dom";
import {  HiOutlineUser } from "react-icons/hi";
import HeaderSearch from "./header/HeaderSearch";
import HeaderCart from "./header/HeaderCart";
import HeaderSelect from "./header/HeaderSelect";
import HeaderUser from "./header/HeaderUser";
import Navigation from "./navigation/Navigation";
import Spacer from "./helpers/Spacer";
import Container from "./layouts/Container";

const Header = () => {
  return (
    <>
      <Container className="fixed inset-x-0 top-0 z-20 text-gray-100 shadow bg-zinc-700">
        <div className="">
          <div className="flex items-center justify-between h-20 p-4 lg:p-10">
            <Link to="/">
              <img
                src="/images/zmart-logo-dark.png"
                alt="zmart-logo"
                className="w-20 h-auto lg:w-28 lg:h-12"
              />
            </Link>

            <div className="hidden lg:items-center lg:justify-center lg:flex lg:gap-4">
              <HeaderSelect />
              <HeaderSearch />
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* <div className="hidden lg:flex lg:justify-center lg:items-center">
              <HiOutlinePhone size={28} />
              <div className="pointer-events-none lg:flex lg:flex-col">
                <span>Helpline 24/7</span>
                <span>(+911) 4578-4578</span>
              </div>
            </div> */}

              <div className="hidden lg:flex lg:justify-center lg:items-center lg:gap-4">
                <HiOutlineUser size={32} className="text-neutral-400" />
                <div className="lg:flex lg:flex-col">
                  <HeaderUser />
                </div>
              </div>
              <HeaderCart />
              <Navigation />
            </div>
          </div>
        </div>
      </Container>

      <Spacer size={100} />

      <div className="py-6 lg:hidden">
        <HeaderSearch />
      </div>
    </>
  );
};

export default Header;
