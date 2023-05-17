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

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-start gap-10 sm:grid sm:grid-rows-2 sm:grid-cols-2  md:grid-rows-1 md:grid-cols-4">
        {/* first column */}
        <div className=" flex flex-col">
          <img
            src="/images/zmart-logo.png"
            alt="zmart-logo"
            className="w-20 h-10 "
          />
          <div className="flex justify-start items-center ">
            <CiHeadphones size={40} />
            <div className="">
              <span className="block">Call us 24/7! </span>
              <span className="inline-block">(800) 8001-8888 </span>
            </div>
          </div>
          <div className="">Contact Info</div>
          <div className="flex justify-start items-start">
            <BiHomeAlt2 size={16} className="" />
            Dream Road, fake address,
            <br />
            Pune, Maharashtra, IN
          </div>

          <div className="flex justify-start items-center">
            <HiOutlineMail size={16} className="" />
            support@zmart.ecom
          </div>
        </div>
        {/* second column */}
        <div className="">
          <h3 className="">About Us</h3>
          <div className="flex flex-col">
            <Link to="/about-us">About Us</Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/frequently-asked-questions">FAQ&apos;s</Link>
            <Link to="/terms-and-conditions">Terms Of Service</Link>
          </div>
        </div>
        {/* third column */}
        <div className="">
          <h3 className="">Account</h3>
          <div className="flex flex-col">
            <Link to="/my-account">My Account</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/refund-policy">Return/Exchange</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>
        {/* fourth column */}
        <div className="">
          <h3 className="">Get Zmart App</h3>
          <div className="flex flex-col">
            <span>- Get better experience on your mobile</span>
            <span>- Quick & direct access</span>
            <span>- Save more on App</span>
            <div className="flex justify-center items-center">
              <img
                src="/images/ios-store.jpg"
                alt="apple-store"
                className="w-24"
              />
              <img
                src="/images/play-store.jpg"
                alt="play-store"
                className="w-24"
              />
            </div>
          </div>
          <div className="">Stay Connected</div>
          <div className="flex justify-start items-center">
            <a href="http://facebook.com/" target="_blank">
              <FaFacebook size={25} className="" />
            </a>
            <a href="http://google.com/" target="_blank">
              <AiOutlineGoogle size={25} className="" />
            </a>
            <a href="http://twitter.com/" target="_blank">
              <AiOutlineTwitter size={25} className="" />
            </a>
            <a href="http://github.com/" target="_blank">
              <AiOutlineGithub size={25} className="" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="">
          &copy; 2023, ZMart, <span>All rights reserved.</span>
        </div>
        <img
          src="/images/payments.jpg"
          alt="payment-modes"
          className="h-4 max-w-xs"
        />
      </div>
    </>
  );
};

export default Footer;
