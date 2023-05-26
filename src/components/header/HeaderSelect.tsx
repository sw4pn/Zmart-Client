import { useDispatch, useSelector } from "react-redux";
import Select, { SingleValue, StylesConfig } from "react-select";
import { RootState } from "../../app/store";
import {
  categoryState,
  getCategories,
} from "../../features/category/categorySlice";
import { useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

const HeaderSelect = () => {
  const dispatch: any = useDispatch();

  const categoryState = useSelector<RootState, categoryState>(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryArr = categoryState?.categories
    ? Object.values(categoryState.categories).map((value) => ({
        value: value.slug,
        label: value.title,
      }))
    : [];

  const selectCategory = (val: SingleValue<Option>) => {
    console.log(val);
  };

  const options: Option[] = categoryArr;

  const colorStyles: StylesConfig<Option, false> = {
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
      color: "#444",
      backgroundColor: state.isFocused
        ? `rgb(240 240 240)`
        : `rgb(255 255 255)`,
      fontWeight: state.isSelected ? "600" : "400",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 220,
      display: `flex`,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#ddd",
    }),
  };

  return (
    <div>
      <Select
        options={options}
        className="p-1 text-sm text-white border cursor-pointer border-zinc-600"
        styles={colorStyles}
        onChange={(val) => selectCategory(val)}
        placeholder="All Categories"
      />
    </div>
  );
};

export default HeaderSelect;
