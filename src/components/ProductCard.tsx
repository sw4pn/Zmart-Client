import React from "react";
import { Product } from "../types";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { thumbnail, title } = product;

  console.log(product);
  const isFavorite = false;

  return (
    <div className="bg-white border group w-[90%] sm:max-w-sm flex flex-col sm:flex-row ">
      <div className="flex-1">
        <img src={thumbnail?.url} alt={title} />
      </div>
      <div className="flex-1">
        {isFavorite ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        brand.title {title} desc rating price discountPrice Add to Cart
      </div>
    </div>
  );
};

export default ProductCard;
