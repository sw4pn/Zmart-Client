import { MdClose } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";

interface Props {
  handleFilter: (key: any, value: any) => void;
}

const ProductFilters = ({ handleFilter }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const color = searchParams.get("colors");

  const colors = Array.isArray(color)
    ? color
    : color !== null
    ? color.split(",")
    : [];  


  // const searchColor = searchParams.get("colors");
  const searchBrand = searchParams.get("brand");
  const searchCategory = searchParams.get("category");

  // const searchColors = Array.isArray(searchColor)
  //   ? searchColor
  //   : searchColor !== null
  //   ? searchColor.split(",")
  //   : [];

  const searchBrandArr = Array.isArray(searchBrand)
    ? searchBrand
    : searchBrand !== null
    ? searchBrand.split(",")
    : [];

  const searchCategoryArr = Array.isArray(searchCategory)
    ? searchCategory
    : searchCategory !== null
    ? searchCategory.split(",")
    : [];

  const minPrice = parseInt(searchParams.get("minPrice", 10)) || "";
  const maxPrice = parseInt(searchParams.get("maxPrice", 10)) || "";

  const priceText = minPrice ? ` ₹ ${minPrice}` : "min";
  const priceOut = maxPrice ? ` ₹ ${maxPrice}` : "max";

  const colorFilterTags = colors.map((color, i) => {
    return (
      <span
        key={i}
        className="flex items-center justify-center px-2 capitalize bg-gray-200 cursor-pointer rounded-xl hover:bg-orange-200 "
        // onClick={() => handleColorChange(color)}
        onClick={() => handleArrChange("colors", color, colors)}>
        {color}
        <MdClose className="w-3 h-3 ml-2 text-gray-600 " />
      </span>
    );
  });

  const priceFilterTags = (minPrice || maxPrice) && (
    <span
      className="flex items-center justify-center px-2 bg-gray-200 cursor-pointer rounded-xl hover:bg-orange-200 "
      onClick={() => {
        handleFilter("minPrice", "");
        handleFilter("maxPrice", "");
      }}>
      {priceText} - {priceOut}
      <MdClose className="w-3 h-3 ml-2 text-gray-600 " />
    </span>
  );

  const brandFilterTags = searchBrandArr.map((brand, i) => {
    return (
      <span
        key={i}
        className="flex items-center justify-center px-2 capitalize bg-gray-200 cursor-pointer rounded-xl hover:bg-orange-200 "
        // onClick={() => handleColorChange(color)}
        onClick={() => handleArrChange("brand", brand, searchBrandArr)}>
        {brand}
        <MdClose className="w-3 h-3 ml-2 text-gray-600 " />
      </span>
    );
  });

  const categoryFilterTags = searchCategoryArr.map((category, i) => (
    <span
      key={i}
      className="flex items-center justify-center px-2 capitalize bg-gray-200 cursor-pointer rounded-xl hover:bg-orange-200 "
      // onClick={() => handleColorChange(color)}
      onClick={() => handleArrChange("category", category, searchCategoryArr)}>
      {category}
      <MdClose className="w-3 h-3 ml-2 text-gray-600 " />
    </span>
  ));

  const filterTags = [
    // ...sizeFilterTags.filter((item) => item !== undefined),
    ...colorFilterTags,
    ...brandFilterTags,
    ...categoryFilterTags,
    // ...priceFilterTags,
  ];

  const handleColorChange = (item) => {
    const color = item.toLowerCase();
    const index = colors.indexOf(color);
    const colorValue =
      index !== -1 ? colors.splice(index, 1) : colors.push(color);

    handleFilter(
      "colors",
      colors.filter((i) => i.length !== 0)
    );
  };

  const handleArrChange = (
    property: string,
    item: string,
    searchArray: Array<any>
  ) => {
    const myItem = item.toLowerCase();
    const index = searchArray.indexOf(myItem);

    index !== -1 ? searchArray.splice(index, 1) : searchArray.push(myItem);

    handleFilter(
      property,
      searchArray.filter((i) => i.length !== 0)
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 py-2 mt-2 ">
      {filterTags.length > 0 && (
        <Link
          to="/products/all"
          className="flex items-center justify-center px-3 py-1 text-sm text-gray-100 bg-gray-800 cursor-pointer rounded-xl hover:bg-gray-900 ">
          Clear All
        </Link>
      )}
      {/* {sizeFilterTags} */}
      {colorFilterTags}
      {brandFilterTags}
      {categoryFilterTags}
      {priceFilterTags}
    </div>
  );
};

export default ProductFilters;
