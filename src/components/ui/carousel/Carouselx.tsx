import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { ChevronLeft } from "react-feather";
import { BiChevronRight } from "react-icons/bi";

const collapsedAspectRatio = 1 / 3;
const fullAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;

const Carousel = ({ images }: { images: Array<string> }) => {
  //
  const [index, setIndex] = useState(0);
  // ---
  //
  const slideArr = images.map((image, i) => (
    <motion.img
      key={i}
      src={image}
      className="object-cover aspect-[3/2]"
      animate={{ opacity: i === index ? 1 : 0.3 }}
    />
  ));

  //
  //   animate={{ x: `-${index * 100}%` }}
  //   transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="flex flex-col justify-center h-full mx-auto max-w-7xl">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {slideArr}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  className="absolute flex items-center justify-center w-8 h-8 -mt-4 bg-white rounded-full left-2 top-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setIndex(index - 1)}>
                  <ChevronLeft size={24} className="" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  className="absolute flex items-center justify-center w-8 h-8 -mt-4 bg-white rounded-full right-2 top-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setIndex(index + 1)}>
                  <BiChevronRight size={24} className="" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 flex justify-center overflow-hidden bottom-6 h-14">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`,
              }}
              className="flex">
              {images.map((image, i) => (
                <motion.button
                  onClick={() => setIndex(i)}
                  initial={false}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5,
                    },
                  }}
                  className="shrink-0"
                  key={image}>
                  <img src={image} className="object-cover h-full" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Carousel;
