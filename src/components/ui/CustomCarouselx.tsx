import React, { ReactNode, isValidElement } from "react";
import { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="inline-flex items-center justify-center text-white border carousel-item bg-fuchsia-500 h-80"
      style={{ width: "350px" }}>
      {children}
    </div>
  );
};

const CustomCarousel = ({ children }: { children: ReactNode }) => {
  const [breakPoints, setBreakpoints] = useState(null);
  const [responsiveMediaHandler, setResponsiveMediaHandler] = useState([]);

  const innerSliderRefHandler = (ref) => {
    //
  };

  const maxScrollWidth = useRef(0);
  const canRef = useRef(null);
  const cards = 2;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  useEffect(() => {
    maxScrollWidth.current = canRef.current
      ? canRef.current.scrollWidth - canRef.current.offsetWidth
      : 0;
  }, []);
  //   nextt
  // if (
  //     carousel.current !== null &&
  //     carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
  //   )

  if (canRef.current) {
    console.log(
      canRef.current.scrollLeft,
      canRef.current.scrollWidth,
      canRef.current.offsetWidth * activeIndex,
      maxScrollWidth.current
    );
  }

  return (
    <div {...handlers} className="overflow-hidden bg-yellow-400 carousel">
      <div
        ref={canRef}
        className="transition duration-300 inner whitespace-nowrap"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return React.cloneElement(child);
          }
          return null;
        })}
      </div>
      <div className="flex justify-center gap-4 indicators">
        <button
          className="m-1 active:bg-green-400 active:text-white"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}>
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`  ${
                index === activeIndex ? "bg-green-400 text-white" : ""
              }`}
              onClick={() => {
                updateIndex(index);
              }}>
              {index + 1}
            </button>
          );
        })}
        <button
          className="m-1 active:bg-green-400 active:text-white"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomCarousel;
