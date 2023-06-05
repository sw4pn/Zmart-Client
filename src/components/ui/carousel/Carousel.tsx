import React, { CSSProperties } from "react";
import { useState, useEffect, FC } from "react";
import Swipe from "react-easy-swipe";
import { Link } from "react-router-dom";

interface Props {
  data: Array<any>;
  time?: number;
  width?: number;
  height?: number;
  captionStyle?: React.CSSProperties;
  slideNumberStyle?: React.CSSProperties;
  radius?: string;
  slideNumber?: number;
  style?: React.CSSProperties;
  captionPosition?: string;
  dots?: boolean;
  automatic?: boolean;
  pauseIconColor?: string;
  pauseIconSize?: number;
  slideBackgroundColor?: string;
  slideImageFit?: React.CSSProperties["objectFit"] | undefined;
  thumbnails?: boolean;
  thumbnailWidth?: number;
  showNavBtn?: boolean;
}

const Carousel: FC<Props> = ({
  data,
  time,
  width,
  height,
  captionStyle,
  slideNumberStyle,
  radius,
  slideNumber,
  style,
  captionPosition,
  dots,
  automatic,
  pauseIconColor,
  pauseIconSize,
  slideBackgroundColor,
  slideImageFit,
  thumbnails,
  thumbnailWidth,
  showNavBtn = true,
}) => {
  //Initialize States
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [change, setChange] = useState(false);

  //Function to change slide
  const addSlide = (n: number) => {
    if (slide + n >= data.length) setSlide(0);
    else if (slide + n < 0) setSlide(data.length - 1);
    else setSlide(slide + n);
  };

  //Start the automatic change of slide
  useEffect(() => {
    if (automatic) {
      let index = slide;
      const interval = setInterval(
        () => {
          if (!isPaused) {
            setSlide(index);
            index++;
            if (index >= data.length) index = 0;
            if (index < 0) index = data.length - 1;
          }
        },
        time ? time : 2000
      );
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPaused, change]);

  function scrollTo(el: HTMLElement | null) {
    if (el === null) return;
    const elLeft = el.offsetLeft + el.offsetWidth;
    const elParent = el.parentNode as HTMLElement;
    if (elParent) {
      const elParentLeft = elParent.offsetLeft + elParent.offsetWidth;
      // check if element not in view
      if (elLeft >= elParentLeft + elParent.scrollLeft) {
        elParent.scroll({
          left: elLeft - elParentLeft,
          behavior: "smooth",
        });
      } else if (elLeft <= elParent.offsetLeft + elParent.scrollLeft) {
        elParent.scroll({
          left: el.offsetLeft - elParent.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }

  //Listens to slide state changes
  useEffect(() => {
    const slides = document.getElementsByClassName(
      "carousel-item"
    ) as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("dot");

    const slideIndex = slide;
    let i;
    for (i = 0; i < data.length; i++) {
      if (slides[i]) {
        slides[i].style.display = "none";
      }
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    //If thumbnails are enabled
    if (thumbnails) {
      const thumbnailsArray = document.getElementsByClassName("thumbnail");
      for (i = 0; i < thumbnailsArray.length; i++) {
        thumbnailsArray[i].className = thumbnailsArray[i].className.replace(
          " active-thumbnail border-[#476ff1] border-[3px]",
          ""
        );
        // border: #476ff1 solid 3px;
      }
      if (thumbnailsArray[slideIndex] !== undefined)
        thumbnailsArray[slideIndex].className += " active-thumbnail";
      scrollTo(document.getElementById(`thumbnail-${slideIndex}`));
    }

    if (slides[slideIndex] !== undefined)
      slides[slideIndex].style.display = "block";
    if (dots[slideIndex] !== undefined) dots[slideIndex].className += " active";
  }, [slide, isPaused]);

  const commonPos = `text-[#f2f2f2] py-2 px-0 w-full absolute text-center`;
  const captionPos =
    (captionPosition === "top"
      ? `top-2 `
      : captionPosition === "center"
      ? ` top-[45%] bottom-1/2 `
      : `bottom-8 `) + commonPos;

  return (
    <div style={style} className="w-full mx-auto box ">
      <div
        style={{
          maxWidth: width ? width : "600px",
          maxHeight: height ? height : "400px",
        }}>
        <Swipe
          onSwipeRight={() => {
            addSlide(-1);
            setChange(!change);
          }}
          onSwipeLeft={() => {
            addSlide(1);
            setChange(!change);
          }}>
          <div
            className="relative m-auto caroused-container"
            style={{
              maxWidth: width ? width : "600px",
              height: height ? height : "400px",
              backgroundColor: slideBackgroundColor
                ? slideBackgroundColor
                : "darkgrey",
              borderRadius: radius,
            }}>
            {data.map((item, index) => {
              return (
                <div
                  className="w-full h-full carousel-item fade animate-fade"
                  style={{
                    maxWidth: width ? width : "600px",
                    maxHeight: height ? height : "400px",
                  }}
                  onMouseDown={(e) => {
                    automatic && setIsPaused(true);
                  }}
                  onMouseUp={(e) => {
                    automatic && setIsPaused(false);
                  }}
                  onMouseLeave={(e) => {
                    automatic && setIsPaused(false);
                  }}
                  onTouchStart={(e) => {
                    automatic && setIsPaused(true);
                  }}
                  onTouchEnd={(e) => {
                    automatic && setIsPaused(false);
                  }}
                  key={index}>
                  {slideNumber && (
                    <div
                      className="absolute top-0 px-3 py-2 text-xs slide-number text-[#f2f2f2]"
                      style={slideNumberStyle}>
                      {index + 1}/ {data.length}
                    </div>
                  )}
                  {item.isLink ? (
                    <Link to={item.link}>
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full align-middle carousel-image"
                        style={{
                          borderRadius: radius,
                          objectFit: slideImageFit ? slideImageFit : "cover",
                        }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full align-middle carousel-image"
                      style={{
                        borderRadius: radius,
                        objectFit: slideImageFit ? slideImageFit : "cover",
                      }}
                    />
                  )}
                  {isPaused && (
                    <div
                      className="absolute opacity-100 pause-icon pause left-4 bottom-1 animate-pause"
                      style={{
                        color: pauseIconColor ? pauseIconColor : "white",
                        fontSize: pauseIconSize ? pauseIconSize : "40px",
                      }}>
                      II
                    </div>
                  )}
                  <div
                    className={`carousel-caption- ${captionPos}`}
                    style={{
                      ...captionStyle,
                      textShadow: `0px 0px 10px rgba(0,0,0,0.8)`,
                    }}
                    dangerouslySetInnerHTML={{ __html: item.caption }}></div>
                </div>
              );
            })}

            {showNavBtn && (
              <a
                className="absolute w-auto p-4 -mt-5 text-lg font-bold text-white transition duration-500 ease-linear cursor-pointer select-none prev top-1/2 hover:bg-[rgba(0,0,0,0.3)] left-0 bg-neutral-600/20 backdrop-blur-md"
                onClick={(e) => {
                  addSlide(-1);
                  setChange(!change);
                }}>
                &#10094;
              </a>
            )}
            {showNavBtn && (
              <a
                className="next absolute w-auto p-4 -mt-5 text-lg font-bold text-white transition duration-500 ease-linear cursor-pointer select-none prev top-1/2 hover:bg-[rgba(0,0,0,0.3)] right-0 bg-neutral-600/20 backdrop-blur-md"
                onClick={(e) => {
                  addSlide(1);
                  setChange(!change);
                }}>
                &#10095;
              </a>
            )}
            {dots && (
              <div className="dots mt-2.5 text-center absolute bottom-2.5 w-full">
                {data.map((item, index) => {
                  return (
                    <span
                      className={`w-2 h-2 mx-0.5 my-0 cursor-pointer dot rounded-full inline-block transition-[background-color] duration-500 ease-linear  hover:bg-[#717171] ${
                        index === slide ? "bg-white" : "bg-[#bbb]"
                      } `}
                      key={index}
                      onClick={(e) => {
                        setSlide(index);
                        setChange(!change);
                      }}></span>
                  );
                })}
              </div>
            )}
          </div>
        </Swipe>
      </div>
      {thumbnails && (
        <div
          className="thumbnails flex mt-2.5 items-center overflow-scroll"
          id="thumbnail-div"
          style={{ maxWidth: width }}>
          {data.map((item, index) => {
            return (
              <img
                width={thumbnailWidth ? thumbnailWidth : "100px"}
                src={item.image}
                alt={item.caption}
                className="thumbnail my-0 mx-1.5"
                key={index}
                id={`thumbnail-${index}`}
                onClick={(e) => {
                  setSlide(index);
                  setChange(!change);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;
