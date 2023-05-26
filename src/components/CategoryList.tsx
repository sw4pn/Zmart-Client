import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  categoryState,
  getCategories,
} from "../features/category/categorySlice";
import CategoryItem from "./CategoryItem";
import { useEffect } from "react";

const CategoryList = () => {
  const dispatch: any = useDispatch();

  const categoryState = useSelector<RootState, categoryState>(
    (state) => state.category
  );

  const { categories } = categoryState;
  const categoryArr = Object.values(categories).map((value) => value);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const catList = categoryArr.map((category, i) => (
    <CategoryItem category={category} key={i} />
  ));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-8 md:gap-10 lg:gap-2 xl:gap-4 ">
      {catList}
    </div>
  );
};

export default CategoryList;
