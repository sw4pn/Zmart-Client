import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getPopularProducts,
  productState,
} from "../features/product/productSlice";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PopularList = () => {
  const dispatch: any = useDispatch();

  const popularState = useSelector<RootState, productState>(
    (state) => state.product
  );
  // Object.values(categories).map((value) => value);
  const popularArr = Object.values(popularState.popular).map((value) => value);

  useEffect(() => {
    dispatch(getPopularProducts());
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {popularArr.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </>
  );
};

export default PopularList;
