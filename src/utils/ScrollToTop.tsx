import React from "react";
import { useLocation } from "react-router-dom";
import scrollMeTop from "./scrollMeTop";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    scrollMeTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
