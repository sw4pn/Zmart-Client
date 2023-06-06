import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getFeaturedProducts,
  productState,
} from "../features/product/productSlice";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const FeaturedList = () => {
  const dispatch: any = useDispatch();

  const productState = useSelector<RootState, productState>(
    (state) => state.product
  );

  const featuredArr = Object.values(productState.featured).map(
    (value) => value
  );

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {featuredArr.map((product, i) => (
        <ProductCard product={product} key={i} />
      ))}
    </div>
  );
};

export default FeaturedList;
