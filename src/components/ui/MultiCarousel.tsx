import Slider from "react-slick";
import { ReactNode } from "react";

import "./css/slick.css";
import "./css/slick-theme.css";
// Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const MultiCarousel = ({ children }: { children: ReactNode }) => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-10">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default MultiCarousel;
