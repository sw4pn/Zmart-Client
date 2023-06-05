import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "../components/ui/Accordion";
import ProductSidebar from "../components/ProductSidebar";
import {
  getAllProducts,
  getProductByBrand,
  getProductByCategory,
  selectProducts,
} from "../features/product/productSlice";
import ProductFilters from "../components/ProductFilters";
import Select from "react-select";
import { HiBars2, HiBars3, HiBars4 } from "react-icons/hi2";
import ProductCard from "../components/ProductCard";
import Spacer from "../components/helpers/Spacer";
import useMediaQuery from "../hooks/useMediqQuery";
import { AiOutlineMinus } from "react-icons/ai";
import CustomPagination from "../components/CustomPagination";
import { sortArray, truncateTitle } from "../utils/utils";
import { MdClose } from "react-icons/md";
import { scrollMeTop } from "../utils/ScrollToTop";
import CustomButton from "../components/ui/CustomButton";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "best", label: "Best Selling" },
  { value: "alpha-az", label: "A-Z Alphabetically" },
  { value: "price-lh", label: "Low to High, Price" },
  { value: "price-hl", label: "High to Low, Price" },
  { value: "date-new", label: "Recent First, Date" },
  { value: "date-old", label: "Oldest First, Date" },
];

const itemsPerPageOptions = [
  { value: "5", label: "5 items" },
  { value: "10", label: "10 items" },
  { value: "15", label: "15 items" },
  { value: "20", label: "20 items" },
];

const columnIcons = [
  {
    icon: <HiBars3 size={20} className="hidden rotate-90 2xl:block" />,
    cols: 3,
  },
  {
    icon: <HiBars2 size={20} className="hidden rotate-90 md:block" />,
    cols: 2,
  },
  {
    icon: <AiOutlineMinus size={20} className="rotate-90 2xl:hidden" />,
    cols: 1,
  },
  {
    icon: <HiBars4 size={20} className="" />,
    cols: 0,
  },
];

const ProductsPage = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const [colCount, setColCount] = useState(3);
  const [showFilter, setShowFilter] = useState(false);
  const [perPage, setPerPage] = useState({ value: 10, label: "10 items" });
  const [overlay, setOverlay] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isSmallScreen = useMediaQuery("(min-width:768px)");
  const isLargeScreen = useMediaQuery("(min-width:1536px)");

  const locationArr = location.pathname.split("/");
  const pageType = locationArr[1];
  const slug = locationArr[2];

  const pageTitle =
    pageType === "category" || pageType === "brand"
      ? `${slug}`
      : "All products";

  const sort = searchParams.get("sort") || "best";
  const minPrice = parseInt(searchParams.get("minPrice", 10)) || "";
  const maxPrice = parseInt(searchParams.get("maxPrice", 10)) || "";
  const searchColor = searchParams.get("colors");

  const sortBy = sortOptions.find((option) => option.value === sort);

  let currentPage = parseInt(searchParams.get("page", 10) || 1);
  currentPage = currentPage < 1 ? 1 : currentPage;

  const products = useSelector(selectProducts);
  const productsArr = Object.values(products).map((product) => product);

  useEffect(() => {
    if (pageType === "category") {
      dispatch(getProductByCategory(slug));
    } else if (pageType === "brand") {
      dispatch(getProductByBrand(slug));
    } else {
      dispatch(getAllProducts());
    }
  }, [pageType, location]);

  /*  sort the array */
  /*** Filter array  ***/
  let sortedArr = sortArray(productsArr, sort);

  if (Number.isInteger(minPrice)) {
    sortedArr =
      //@ts-ignore
      minPrice > 0
        ? sortedArr.filter((product) => product.price > minPrice)
        : sortedArr;
  }
  if (Number.isInteger(maxPrice)) {
    sortedArr =
      //@ts-ignore
      maxPrice > 0
        ? sortedArr.filter((product) => product.price < maxPrice)
        : sortedArr;
  }

  if (searchColor && searchColor !== "") {
    const colorValues = searchColor.split(",");

    sortedArr = sortedArr.filter(
      (product) =>
        product.color.some((color) => colorValues.includes(color.title))
      // product.color.some((color) => color.title === searchColor)
    );
    //   const filteredArr = sortedArr.filter((product) =>
    //   product.color.some((color) => color.title === "silver")
    // );
  }
  // sortedArr.map((product) => console.log(product.color.title));

  const gridCount = isLargeScreen
    ? colCount
    : isSmallScreen
    ? colCount > 2
      ? 2
      : colCount
    : 1;

  const totalItems = sortedArr?.length ? sortedArr.length : 0;
  const colsIcons = columnIcons.map((item, i) => (
    <div
      key={i}
      // className={`${gridCount < item.cols && "hidden"} `}
      className={` p-2 rounded-lg ${
        colCount === item.cols
          ? "bg-neutral-400 "
          : "bg-neutral-200 hover:bg-neutral-300 cursor-pointer"
      } `}
      onClick={() => toggleGrid(item.cols)}>
      {item.icon}
    </div>
  ));

  const itemsPerPage = perPage.value;
  const startItemIndex = itemsPerPage * (currentPage - 1);
  const allProducts =
    sortedArr.length > 0
      ? sortedArr
          .slice(startItemIndex, itemsPerPage + startItemIndex)
          .map((product, i) => {
            return (
              <ProductCard
                key={i}
                product={product}
                // store={item}
                grid={colCount}
              />
            );
          })
      : "No products found.";

  const toggleBar = () => {
    setOverlay(!overlay);
  };

  const toggleGrid = (col: number) => {
    setColCount(col);
  };

  const handleSort = (item) => {
    setSearchParams((params) => {
      params.set("sort", item.value);
      return params;
    });
  };

  const handlePageChange = (page) => {
    setSearchParams((params) => {
      params.set("page", page);
      return params;
    });
  };

  const handleFilterChange = (key: any, value: any) => {
    setSearchParams((searchParams) => {
      searchParams.set(key, value);

      if (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        searchParams.delete(key);
      }
      return searchParams;
    });
  };

  const pageLast = itemsPerPage * currentPage;
  const pageLastCount = pageLast > totalItems ? totalItems : pageLast;

  return (
    <>
      <Container className="p-4">
        <HeadTitle title={pageTitle} className="px-10 py-4 mb-10 capitalize " />

        <div className="gap-4 lg:grid lg:grid-cols-11 xl:grid-cols-12">
          {/* <div className="hidden px-2 py-4 border shadow lg:block lg:col-span-3 xl:col-span-3">
            <ProductSidebar handleFilter={handleFilterChange} />
          </div> */}
          {overlay && (
            <div className="fixed inset-0 z-20 bg-black/60 backdrop-blur-md"></div>
          )}
          <div
            className={`  border     ${
              overlay
                ? "fixed left-0 top-0 bottom-0 z-20 max-w-sm bg-white py-4 overflow-y-scroll px-4"
                : "px-2 py-4  hidden lg:block lg:col-span-3 xl:col-span-3 shadow"
            } `}>
            <ProductSidebar
              handleFilter={handleFilterChange}
              overlay={overlay}
              toggleBar={toggleBar}
              page={pageType}
            />
          </div>
          <div className=" lg:col-span-8 xl:col-span-9">
            {/* top bar */}
            <div className="flex items-center justify-end lg:hidden">
              <CustomButton
                title="Filter"
                width={160}
                className="my-4"
                onClick={() => toggleBar()}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between px-4 py-2 border shadow">
              {/* {overlay && ( */}
              {/* )} */}
              <div className="flex flex-wrap items-center justify-center gap-2 ">
                <span className="text-sm">Sort By:</span>
                <Select
                  className="w-40 text-sm"
                  classNamePrefix="select"
                  defaultValue={sortBy}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={false}
                  name="sort-products"
                  onChange={(item) => handleFilterChange("sort", item?.value)}
                  options={sortOptions}
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 ">
                <span className="text-sm">Show :</span>
                <Select
                  className="w-40 text-sm"
                  classNamePrefix="select"
                  defaultValue={perPage}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={false}
                  name="items-per-page"
                  onChange={(item) => setPerPage(item)}
                  options={[
                    { value: 5, label: "5 items" },
                    { value: 10, label: "10 items" },
                    { value: 15, label: "15 items" },
                    { value: 20, label: "20 items" },
                  ]}
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <span className="text-sm text-neutral-400">
                  {totalItems} products
                </span>
                {colsIcons}
              </div>
            </div>

            <div className="">
              <ProductFilters handleFilter={handleFilterChange} />
            </div>

            <div className="flex justify-center flex-1 lg:justify-start ">
              <div
                className={`grid justify-center py-8 gap-4 lg:gap-10 `}
                style={{
                  gridTemplateColumns: `repeat(${
                    gridCount === 0 ? 1 : gridCount
                  }, minmax(0,1fr))`,
                }}>
                {allProducts}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg flex justify-between items-center px-5 py-2.5 text-sm ">
              <div className="bg-gray-100 py-1.5 px-2 rounded-lg text-gray-500 ">
                Showing [{(currentPage - 1) * itemsPerPage + 1} -{pageLastCount}
                ] of [{totalItems}]
              </div>
              <CustomPagination
                onPageChange={(page) => {
                  scrollMeTop();
                  handleFilterChange("page", page);
                }}
                currentPage={currentPage}
                totalCount={totalItems}
                pageSize={itemsPerPage}
              />
            </div>
          </div>
        </div>
        <Spacer size={50} />
        <div className="hidden grid-cols-1 2xl:bg-green-600 sm:grid-cols-2 lg:gird-cols-3"></div>
      </Container>
    </>
  );
};

export default ProductsPage;
