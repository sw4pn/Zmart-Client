import { CiHeadphones } from "react-icons/ci";
import { BiHomeAlt2 } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineGithub,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import ShortTitle from "./ShortTitle";
import Scroller from "./Scroller";

const Footer = () => {
  return (
    <>
      <Container className="p-10 text-gray-400 bg-zinc-800">
        <Scroller />
        <div className="flex flex-col items-start justify-center gap-10 sm:grid sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 ">
          {/* first column */}
          <div className="flex flex-col w-3/4 gap-4 ">
            <Link to="/">
              <img
                src="/images/zmart-logo-dark.png"
                alt="zmart-logo"
                className="w-20 h-10 ml-4 hover:opacity-70"
              />
            </Link>

            <div className="flex items-center justify-start gap-2 ">
              <CiHeadphones size={40} />
              <div className="">
                <span className="block">Call us 24/7! </span>
                <span className="inline-block">(800) 8001-8888 </span>
              </div>
            </div>
            <ShortTitle
              title="Contact Info"
              className="text-gray-600 border-b-neutral-700"
            />
            <div className="">
              <div className="flex items-start justify-start gap-2">
                <BiHomeAlt2 size={16} className="mt-2" />
                Dream Road, fake address,
                <br />
                Pune, Maharashtra, IN
              </div>
              <div className="flex items-center justify-start gap-2">
                <HiOutlineMail size={16} className="" />
                support@zmart.ecom
              </div>
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col w-3/4 gap-4 sm:w-full">
            <ShortTitle
              title="Help"
              className="text-gray-600 border-b-neutral-700"
            />
            <div className="flex flex-col gap-2">
              <Link to="/about-us" className="hover:opacity-70">
                About Us
              </Link>
              <Link to="/refund-policy" className="hover:opacity-70">
                Refund Policy
              </Link>
              <Link to="/privacy-policy" className="hover:opacity-70">
                Privacy Policy
              </Link>
              <Link
                to="/frequently-asked-questions"
                className="hover:opacity-70">
                FAQ&apos;s
              </Link>
              <Link to="/terms-and-conditions" className="hover:opacity-70">
                Terms Of Service
              </Link>
            </div>
          </div>
          {/* third column */}
          <div className="flex flex-col w-3/4 gap-4 sm:w-full">
            <ShortTitle
              title="Account"
              className="text-gray-600 border-b-neutral-700"
            />
            <div className="flex flex-col gap-2 ">
              <Link to="/my-account" className="hover:opacity-70">
                My Account
              </Link>
              <Link to="/orders" className="hover:opacity-70">
                Orders
              </Link>
              <Link to="/wishlist" className="hover:opacity-70">
                Wishlist
              </Link>
              <Link to="/refund-policy" className="hover:opacity-70">
                Return/Exchange
              </Link>
              <Link to="/contact-us" className="hover:opacity-70">
                Contact Us
              </Link>
            </div>
          </div>
          {/* fourth column */}
          <div className="flex flex-col w-3/4 gap-4 sm:w-full">
            <ShortTitle
              title="Get ZMart App"
              className="text-gray-600 border-b-neutral-700"
            />
            <div className="flex flex-col gap-1 text-gray-500">
              <span>- Get better experience on your mobile</span>
              <span>- Quick & direct access</span>
              <span>- Save more on App</span>
              <div className="flex items-center justify-center gap-4 py-4">
                <a
                  href="https://www.apple.com/in/app-store/"
                  target="_blank"
                  className="hover:opacity-70">
                  <img
                    src="/images/ios-store.jpg"
                    alt="apple-store"
                    className="w-32"
                  />
                </a>
                <a
                  href="https://www.apple.com/in/app-store/"
                  target="_blank"
                  className="hover:opacity-70">
                  <img
                    src="/images/play-store.jpg"
                    alt="play-store"
                    className="w-32"
                  />
                </a>
              </div>
            </div>
            <ShortTitle
              title="Stay Connected"
              className="text-gray-600 border-b-neutral-700"
            />
            <div className="flex flex-wrap items-center justify-start gap-4">
              <a href="http://facebook.com/" target="_blank">
                <FaFacebook size={25} className="hover:opacity-70" />
              </a>
              <a href="http://google.com/" target="_blank">
                <AiOutlineGoogle size={25} className="hover:opacity-70" />
              </a>
              <a href="http://twitter.com/" target="_blank">
                <AiOutlineTwitter size={25} className="hover:opacity-70" />
              </a>
              <a href="http://github.com/" target="_blank">
                <AiOutlineGithub size={25} className="hover:opacity-70" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:justify-center sm:items-center">
          <div className="text-gray-500">
            &copy; 2023, ZMart, <span>All rights reserved.</span>
          </div>
          {/* <img
            src="/images/payments.jpg"
            alt="payment-modes"
            className="h-4 max-w-xs -z-10 "
          /> */}
        </div>
      </Container>
    </>
  );
};

export default Footer;
