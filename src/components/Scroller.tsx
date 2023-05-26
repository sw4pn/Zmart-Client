import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BiUpArrow } from "react-icons/bi";
import ArrowUp from "../svg/ArrowUp";
const Scroller = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed right-10 bottom-10 ">
          <div
            onClick={scrollToTop}
            className="cursor-pointer hover:opacity-80">
            {/* <BiUpArrow size={30} className="text-neutral-900" /> */}
            <ArrowUp size={40} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Scroller;
