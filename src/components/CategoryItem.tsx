import { Link } from "react-router-dom";
import { Category } from "../types";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  category: Category;
}

const child = {
  hover: {
    scale: 1.2,
  },
};

const text = {
  hover: {
    opacity: 0.7,
  },
};

const CategoryItem: FC<Props> = ({ category }) => {
  return (
    <motion.div whileHover="hover" className=" flex-0   group hover:   ">
      <Link to="/" className="flex flex-col justify-between items-center">
        <div className="items-center flex justify-center h-24 w-24  overflow-hidden cursor-pointer ">
          <motion.img
            variants={child}
            src={category.imageUrl}
            alt={category.title}
            className="w-full h-auto blur-0 transition-[filter] duration-200 ease-linear"
            //   fill={true}
          />
        </div>
        <motion.div
          // text-lg
          className=" leading-7 mt-2 py-0 px-2 text-center capitalize tracking-[0.01em] "
          variants={text}>
          {category.title}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;
