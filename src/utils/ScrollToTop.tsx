import React from "react";
import { useLocation } from "react-router-dom";

export const scrollMeTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    scrollMeTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
