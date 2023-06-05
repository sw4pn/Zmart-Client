import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getSpecialProducts,
  productState,
} from "../features/product/productSlice";
import { useEffect } from "react";
import SpecialCard from "./SpecialCard";
import MultiCarousel from "./ui/MultiCarousel";
import ProductCard from "./ProductCard";

const SpecialList = () => {
  const dispatch: any = useDispatch();

  const productState = useSelector<RootState, productState>(
    (state) => state.product
  );

  const specialArr = Object.values(productState.special).map((value) => value);

  useEffect(() => {
    dispatch(getSpecialProducts());
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {specialArr.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </>
  );
};

export default SpecialList;

/* <div className="flex flex-wrap justify-center gap-8">
{specialArr.map((product, i) => (
  <SpecialCard product={product} key={i} />
))}
</div> */
