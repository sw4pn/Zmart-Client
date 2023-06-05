import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const CustomCarousel = ({ children }: { children: ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translate, setTranslate] = useState(0);
  const maxScrollWidth = useRef(0);
  const [width, setWidth] = useState(200);
  const carouselRef = useRef(null);

  const dataArr = arr.map((item, i) => (
    <div
      key={i}
      className="left-0 m-0 mr-5 transition duration-500 bg-red-200 rounded-md product h-80 min-w-[200px] max-w-[200px]">
      {item}
    </div>
  ));

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setActiveIndex(newIndex);
  };

  const movePrev = () => {
    if (carouselRef.current) {
      const nextWidth = carouselRef.current.offsetWidth;

      const next = carouselRef.current.scrollLeft - 200;

      console.log("offsetWidth: ", carouselRef.current.offsetWidth);
      console.log("scrollLeft: ", carouselRef.current.scrollLeft);
      setTranslate(-next);
      //   carouselRef.current.scrollLeft = next;
    }
  };

  const moveNext = () => {
    if (carouselRef.current) {
      const nextWidth = carouselRef.current.offsetWidth;

      const next = carouselRef.current.scrollLeft + 200;

      console.log("offsetWidth: ", carouselRef.current.offsetWidth);
      console.log("scrollLeft: ", carouselRef.current.scrollLeft);
      setTranslate(-next);
      //   carouselRef.current.scrollLeft = next;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mx-auto my-0 border-2 header ">
        <h1>Top Products</h1>
        <p>
          <span
            className="inline-block w-8 h-8 p-2 mx-4 my-0 text-center rounded-md cursor-pointer hover:bg-neutral-200"
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}>
            prev
          </span>
          <span
            className="inline-block w-8 h-8 p-2 mx-4 my-0 text-center rounded-md cursor-pointer hover:bg-neutral-200"
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}>
            next
          </span>
        </p>
      </div>
      <motion.div
        ref={carouselRef}
        className="flex items-center justify-start overflow-hidden">
        {children}
      </motion.div>
    </>
  );
};

export default CustomCarousel;
