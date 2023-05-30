import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import LoaderContent from "./loaders/LoaderContent";

interface Props {
  images:
    | [
        {
          public_id: string;
          url: string;
        }
      ]
    | undefined;
  loading: boolean;
}

const imageVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const ProductImage: FC<Props> = ({ images, loading }) => {
  const [index, setIndex] = useState(0);

  const handleClick = (newIndex: number) => {
    const direction = newIndex > index ? 1 : -1;
    setIndex(newIndex);
    // Perform any additional logic or state updates here
  };

  return (
    <div className="border select-none">
      {!loading && images ? (
        <>
          <div className=" h-[400px] lg:h-[512px]  max-w-[400px] lg:max-w-[512px]  mx-auto flex flex-col justify-between gap-4">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                src={images[index].url}
                alt="product-image"
                // variants={imageVariants}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className=" w-full h-full object-contain p-2  lg:p-4"
              />
            </AnimatePresence>

            <div className="flex items-center justify-center w-full gap-4 px-2">
              <div
                className={`p-1 border hover:bg-neutral-200 hover:text-orange-800  ${
                  index === 0 ? "opacity-50" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (index > 0) {
                    handleClick(index - 1);
                  }
                }}>
                <AiFillCaretLeft size={20} />
              </div>
              {images?.map((item, i) => (
                <div
                  className={`w-16 h-16 ${
                    index === i ? "border border-neutral-500" : "border"
                  }`}
                  key={i}
                  onClick={() => handleClick(i)}>
                  <img
                    src={item.url}
                    alt="preview"
                    className="w-full h-full object-contain p-2 cursor-pointer"
                  />
                </div>
              ))}

              <div
                className={`p-1 border hover:bg-neutral-200 hover:text-orange-800   ${
                  index === images.length - 1 ? "opacity-50" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (index < images.length - 1) {
                    handleClick(index + 1);
                  }
                }}>
                <AiFillCaretRight size={20} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoaderContent />
      )}
    </div>
  );
};

export default ProductImage;
