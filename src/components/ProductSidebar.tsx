import { useMemo, useCallback, useEffect, FC } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "./ui/Accordion";
import ColorCheckbox from "./ui/ColorCheckbox";
import { MdCurrencyRupee } from "react-icons/md";
import { ArrowLeft, ChevronRight } from "react-feather";
import CustomInput from "./ui/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllColors, selectAllColors } from "../features/color/colorSlice";
import { getBrands, selectAllBrands } from "../features/brand/brandSlice";
import CustomCheckbox from "./ui/CustomCheckbox";
import {
  getCategories,
  selectCategories,
} from "../features/category/categorySlice";
import { useSearchParams } from "react-router-dom";
import useScrollDisabler from "../hooks/useScrollDisabler";

interface Props {
  handleFilter: (key: any, value: any) => void;
  overlay: boolean;
  page: string;
  toggleBar?: () => void;
}

const ProductSidebar: FC<Props> = ({
  handleFilter,
  overlay,
  toggleBar,
  page,
}) => {
  const [searchParams] = useSearchParams();
  const dispatch: any = useDispatch();

  const minPrice = parseInt(searchParams.get("minPrice") || "", 10) || null;
  const maxPrice = parseInt(searchParams.get("maxPrice") || "", 10) || null;

  const searchColor = searchParams.get("colors");
  const searchBrand = searchParams.get("brand");
  const searchCategory = searchParams.get("category");

  const searchColors = Array.isArray(searchColor)
    ? searchColor
    : searchColor !== null
    ? searchColor.split(",")
    : [];

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

  const colors = useSelector(selectAllColors);
  const colorsArr = Object.values(colors).map((color) => color);

  const brands = useSelector(selectAllBrands);
  const brandsArr = Object.values(brands).map((brand) => brand);

  const categories = useSelector(selectCategories);
  const categoryArr = Object.values(categories).map((category) => category);

  useEffect(() => {
    dispatch(getAllColors());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const sideMenu = [
    {
      title: "Price",
      content: (
        <>
          <div className="flex items-center justify-center gap-2 py-4">
            <MdCurrencyRupee size={28} />
            <CustomInput
              id="min-price"
              type="number"
              label="Min Price"
              className="mr-2"
              min={0}
              // value={minPrice}
              value={minPrice !== null ? minPrice : undefined}
              onChange={(e) => {
                console.log("min-", minPrice, maxPrice);
                handleFilter("minPrice", (e.target as HTMLInputElement).value);
              }}
            />
            <MdCurrencyRupee size={28} />
            <CustomInput
              id="max-price"
              type="number"
              label="Max Price"
              min={0}
              // value={maxPrice}
              value={maxPrice !== null ? maxPrice : undefined}
              onChange={(e) =>
                handleFilter("maxPrice", (e.target as HTMLInputElement).value)
              }
            />
          </div>
        </>
      ),
    },
    {
      title: "Colors",
      content: (
        <div className="flex flex-wrap items-center justify-center gap-2 py-2">
          {colorsArr.map((color, i) => (
            <ColorCheckbox
              key={i}
              id={`color-${color?.value?.toLowerCase()}`}
              // isSelected={colors.includes(item.title)}
              isSelected={searchColors.includes(color?.title?.toLowerCase())}
              onChange={() =>
                handleArrChange("colors", color.title, searchColors)
              }
              name="color">
              {color.value}
            </ColorCheckbox>
          ))}
        </div>
      ),
    },
    {
      title: "Brands",
      content: (
        <div className="py-2 overflow-hidden overflow-y-scroll h-80">
          {brandsArr.map((brand, i) => (
            <CustomCheckbox
              key={i}
              id={`brand-${brand.slug}`}
              name="brand"
              isSelected={searchBrandArr.includes(brand?.title.toLowerCase())}
              onChange={() =>
                handleArrChange("brand", brand.title, searchBrandArr)
              }>
              {brand.title}
            </CustomCheckbox>
          ))}
        </div>
      ),
    },
    {
      title: "Categories",
      content: (
        <div className="py-2 overflow-hidden overflow-y-scroll h-80">
          {categoryArr.map((category, i) => (
            <CustomCheckbox
              key={i}
              id={`category-${category.slug}`}
              name="category"
              isSelected={
                category.title
                  ? searchCategoryArr.includes(category?.title.toLowerCase())
                  : false
              }
              onChange={() => {
                if (category.title) {
                  const cat = category.title.toLowerCase();
                  handleArrChange("category", cat, searchCategoryArr);
                }
              }}>
              {category.title}
            </CustomCheckbox>
          ))}
        </div>
      ),
    },
  ];

  const sideMenuSize = useMemo(() => {
    return sideMenu.length;
  }, [sideMenu.length]);

  const generateHeaderClass = useCallback(
    (open: boolean, position: number) => {
      const background = open ? "bg-gray-300/30" : "bg-white";
      const border =
        position === sideMenuSize ? (open ? "border-b" : "") : "border-b";

      return `transition-[background] flex items-center justify-between w-full px-4 py-3 ${border} ${background}`;
    },
    [sideMenuSize]
  );

  const generateBodyClass = useCallback(
    (open: boolean, position: number) => {
      return position === sideMenuSize ? "" : open ? "border-b" : "";
    },
    [sideMenuSize]
  );

  // const handleColorChange = (item: any) => {
  //   const color = item.toLowerCase();
  //   const index = searchColors.indexOf(color);
  //   const colorValue =
  //     index !== -1 ? searchColors.splice(index, 1) : searchColors.push(color);

  //   handleFilter(
  //     "colors",
  //     searchColors.filter((i) => i.length !== 0)
  //   );
  // };

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

  useScrollDisabler(overlay);

  return (
    <>
      <div className="">
        {overlay && (
          <div className="flex items-center justify-end py-2 mb-4 mr-4">
            <ArrowLeft
              size={40}
              className="cursor-pointer border rounded-full p-1.5 hover:bg-neutral-100"
              onClick={toggleBar}
            />
          </div>
        )}
        <h2 className="px-2 mb-4 text-lg font-semibold">Filters</h2>

        <Accordion className="overflow-hidden rounded-md" alwaysOpen={true}>
          {sideMenu.map((item, index) => {
            if (page === "category" && item.title === "Categories")
              return <></>;
            if (page === "brand" && item.title === "Brands") return <></>;
            return (
              <AccordionItem key={index} className="py-2">
                {({ open }) => (
                  <>
                    <AccordionHeader
                      className={generateHeaderClass(open, index + 1)}>
                      <span className="text-sm font-semibold text-gray-600">
                        {item.title}
                      </span>
                      <ChevronRight
                        className={`w-6 h-6 text-gray-500 transition duration-300 ${
                          open ? "rotate-90" : ""
                        }`}
                      />
                    </AccordionHeader>
                    <AccordionBody
                      className={generateBodyClass(open, index + 1)}>
                      <div className="p-4 text-sm text-gray-500">
                        {item.content}
                      </div>
                    </AccordionBody>
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default ProductSidebar;
