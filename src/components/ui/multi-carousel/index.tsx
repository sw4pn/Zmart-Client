import { useState, useRef } from "react";
import { constants } from "./constnts";
import PrevNaxButton from "./PrevNaxButton";

const CustomCarousel = ({ children, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLUListElement | null>(null);

  //   const height = constants.autoHeight ? "" : undefined;
  const transition = `transform 0ms ease 0ms`;

  const slides = children ? (children.length ? children : [children]) : items;
  const itemsCount = slides.length;

  const startIndex = itemsCount;

  const handleSlideTo = ({ currentIndex = 0, eventType }) => {
    
    if(activeIndex === currentIndex) {
      const event = eventType ? { eventObject, type: eventType};
      onSlideChange(event)
    }
  };

  const slidePrev = (e?: Event | MouseEvent) => {
    const currentIndex = activeIndex - 1;

    handleSlideTo({ currentIndex });
  };

  const slideNext = () => {};

  return (
    <>
      <div className="relative w-full mx-10 my-auto alice-carousel ">
        <div className="">
          <PrevNaxButton
            name="prev"
            onClick={() => console.log("prev")}
            isDisabled={false}
          />
          <PrevNaxButton
            name="next"
            onClick={() => console.log("next")}
            isDisabled={false}
          />
        </div>
        <div className="" ref={rootRef}>
          <div
            className="alice-carousel__wrapper"
            style={
              {
                //   height: height,
                //   transition: "",
                //   paddingLeft: `0px`,
                //   paddingRight: `0px`,
              }
            }

            // onMouseEnter={this._handleMouseEnter}
            // onMouseLeave={this._handleMouseLeave}
          >
            <ul
              className="alice-carousel__stage"
              ref={stageRef}
              style={
                {
                  //stageStyles
                }
              }>
              {slides.map((item, i) => (
                <li key={i} style={{}} className="alice-carousel__stage-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCarousel;
