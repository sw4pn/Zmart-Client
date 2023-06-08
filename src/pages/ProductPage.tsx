import { useDispatch, useSelector } from "react-redux";
import {
  getProductByCategory,
  getProductBySlug,
  selectAProduct,
  selectProducts,
} from "../features/product/productSlice";
import {
  addToCart,
  loadUser,
  selectAuthUser,
} from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import ProductImage from "../components/ProductImage";
import { Rating } from "react-simple-star-rating";
import { BiBookmark, BiCheckShield } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderContent from "../components/loaders/LoaderContent";
import CustomButton from "../components/ui/CustomButton";
import Container from "../components/layouts/Container";
import Spacer from "../components/helpers/Spacer";

import HTMLReactParser from "html-react-parser";
import ReviewStats from "../components/ReviewStats";
import AddReview from "../components/AddReview";
import ProductReview from "../components/ProductReview";
import ProductCard from "../components/ProductCard";
import ColorCheckbox from "../components/ui/ColorCheckbox";
import { Color, Extra } from "../types";
import { toast } from "react-hot-toast";

const tabs = [
  {
    title: "Description",
    slug: "desc",
  },
  {
    title: "Specifications",
    slug: "spec",
  },
  {
    title: "Reviews",
    slug: "reviews",
  },
];

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("desc");
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [qty, setQty] = useState(1);
  const [selectVariant, setSelectVariant] = useState("");

  const user = useSelector(selectAuthUser);
  const product = useSelector(selectAProduct);
  const products = useSelector(selectProducts);
  // const productState = useSelector(selectProductState);

  // const { productLoading } = productState;

  useEffect(() => {
    if (slug || reload) {
      dispatch(getProductBySlug(slug ? slug : ""))
        .then(() => setLoading(false))
        .finally(() => setReload(false));
    }
  }, [slug, reload, dispatch]);

  const cart = user?.cart;
  // const wishlist = user?.wishlist;

  const productId = product?._id;
  const discount = product?.discount;
  const price = product?.price ?? 0;
  const reviews = product?.reviews;
  const brand = product?.brand;
  const category = product?.category;
  const colors = product?.color || [];
  const variants = product?.variant || [];
  const description = product?.description || "";
  const spec = product?.specification;
  const extra = spec && spec?.extra;
  const totalReviews = reviews && reviews.length > 0 ? reviews.length : 0;
  const specArr = spec ? Object.entries(spec) : [];
  const extraArr = extra ? (Object.entries(extra) as Extra[]) : [];

  const isSelected = selectedColor
    ? selectedColor
    : colors?.length > 0
    ? colors[0]
    : null;

  const featuresArr: Array<{ name?: string; feature?: string }> = [];
  const specificationArr: Array<{ name: string; feature: string }> = [];
  const maxItems = 5;

  extraArr?.forEach((item) => {
    if (item?.name && item?.feature) {
      featuresArr.push({ name: item.name, feature: item.feature });
      specificationArr.push({ name: item.name, feature: item.feature });
    }
  });

  specArr?.forEach((feature) => {
    const [key, value] = feature;

    if (featuresArr.length < maxItems && key !== "model" && key !== "os") {
      featuresArr.push({ name: feature[0], feature: String(value) });
    }
    if (
      value !== undefined &&
      String(value) !== "" &&
      key !== "model" &&
      key !== "os" &&
      key !== "extra"
    ) {
      specificationArr.push({ name: key, feature: String(value) });
    }
  });

  const featureList = featuresArr?.map((item, i) => (
    <div key={i}>
      {/* <span>{item.name} :</span> */}
      <span className="text-neutral-400"> {item.feature}</span>
    </div>
  ));

  const specificationList = specificationArr?.map((item, i) => (
    <div key={i} className="flex gap-4 py-2 capitalize">
      <span className="font-semibold text-neutral-500 ">{item?.name} :</span>
      <span className="text-neutral-500">{item?.feature}</span>
    </div>
  ));

  useEffect(() => {
    if (category) {
      const catSlug = category?.slug;
      if (catSlug) dispatch(getProductByCategory(catSlug));
    }
  }, [category, dispatch]);

  const productsArr = Object.values(products).map((val) => val);
  const relatedProducts = productsArr.map(
    (product, i) => i < 6 && <ProductCard key={i} product={product} />
  );

  const isInCart = cart?.products?.some(
    (item) => item?.product?._id === productId
  );

  // const isFavorite =
  //   wishlist &&
  //   wishlist?.find((product) => product._id?.toString() === productId);

  const discountedPrice =
    discount && discount > 0
      ? Math.ceil(price * (discount / 100))
      : Math.ceil(price);

  const productPrice =
    discount && discount > 0 ? (
      <p className="">
        <span className="line-through font-rubik">₹ {price}</span>
        <span className="pl-1 text-xl font-kanit"> ₹ {discountedPrice}</span>
      </p>
    ) : (
      <p className="text-base">
        <span className="text-lg font-rubik">₹ {price}</span>
      </p>
    );

  const handleQty = (val: number) => {
    if (val > 0 && val < 11) {
      setQty(val);
    }
  };

  const reloadPage = (val: boolean) => {
    setReload(val);
  };

  const handleAddToCart = () => {
    if (!product?.color) {
      toast.error("Please choose color");
    }
    if (!product?.variant) {
      toast.error("Please choose variant");
    }

    const color = selectedColor ? selectedColor : product?.color[0];

    const defaultVariant =
      product?.variant && product.variant[0]?.title
        ? product.variant[0].title
        : "";

    const variant = selectVariant ? selectVariant : defaultVariant;
    const quantity = qty;
    const finalPrice =
      discount && discount > 0 ? Math.ceil(price * (discount / 100)) : price;

    const data = {
      productId,
      quantity,
      color,
      variant,
      price: price,
      finalPrice,
    };

    dispatch(addToCart(data)).then(() => {
      dispatch(loadUser()).then(() => setReload(true));
    });
  };

  return (
    <Container className="p-2 md:p-4">
      <div className="flex flex-col justify-center gap-10 md:gap-4 md:flex-row lg:gap-10 ">
        <div className="flex-1 ">
          <ProductImage loading={loading} images={product?.images} />
        </div>

        <div className="flex flex-col flex-1 gap-2 px-4 py-2">
          <div className="flex flex-col flex-1 ">
            {!loading ? (
              <>
                <Link
                  to={`/brand/${brand?.slug}`}
                  className="text-orange-600 capitalize hover:underline ">
                  {product?.brand?.title}
                </Link>
                <h1 className="py-2 mt-2 text-2xl font-semibold">
                  {product?.title}
                </h1>
              </>
            ) : (
              <LoaderContent />
            )}

            <div className="flex items-center justify-start gap-2">
              {!loading ? (
                <>
                  <Rating
                    allowFraction
                    readonly
                    SVGclassName="inline-block"
                    size={16}
                    initialValue={product?.rating}
                    className=""
                  />
                  <span className="mt-1 font-kanit text-neutral-600">
                    ( {totalReviews} )
                  </span>
                </>
              ) : (
                <LoaderContent />
              )}
            </div>

            {!loading ? (
              <>
                {discount && (
                  <div className="py-1 font-semibold text-orange-600">
                    {product?.discount} % OFF
                  </div>
                )}
                <div className="py-2 text-lg text-orange-800">
                  {productPrice}
                </div>
                <div className="py-4 ml-2 leading-7">{featureList}</div>
                <div className="flex items-center justify-start gap-2">
                  <span className="">Color: </span>{" "}
                  <span className="">{isSelected?.title}</span>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <div className="flex flex-wrap items-center justify-start gap-2 py-2 mb-2">
                    {colors?.length > 0 &&
                      colors.map((color, i) => (
                        <ColorCheckbox
                          key={i}
                          id={`color-${color?.value?.toLowerCase()}`}
                          isSelected={color.title === isSelected?.title}
                          onChange={() => setSelectedColor(color)}
                          name="color"
                          // className="block w-8 h-8 m-1 border-4 rounded-full border-neutral-400 border-spacing-40"
                          // style={{ backgroundColor: `${color.value}` }}
                        >
                          {color.value}
                        </ColorCheckbox>
                      ))}
                  </div>
                </div>
                <div className="">
                  <div className="">Variants:</div>
                  <div className="flex flex-wrap p-2 ">
                    {variants?.length > 0 &&
                      variants.map((item: any, i) => (
                        <span
                          key={i}
                          onClick={() => setSelectVariant(item.title)}
                          className={`block p-2 m-1   text-neutral-500 ${
                            selectVariant === item.title
                              ? "bg-neutral-100 border-orange-400 border-2 cursor-default"
                              : "border-neutral-500 border hover:bg-neutral-100 cursor-pointer"
                          }`}>
                          {item.title}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="">
                  <div className="">Quantity: </div>
                  <div className="flex items-center justify-start gap-4 py-4">
                    <span
                      className="px-3 py-1 font-semibold border-2 rounded-full cursor-pointer select-none hover:bg-neutral-100 border-neutral-300"
                      onClick={() => handleQty(qty - 1)}>
                      -
                    </span>
                    <span className="w-16 py-2 font-semibold text-center border-2 cursor-default select-none border-neutral-300">
                      {qty}
                    </span>
                    <span
                      className="px-3 py-1 font-semibold border-2 rounded-full cursor-pointer select-none hover:bg-neutral-100 border-neutral-300"
                      onClick={() => handleQty(qty + 1)}>
                      +
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <LoaderContent />
            )}
          </div>
          <div className="">
            <div className="flex max-w-md gap-4 py-4 mx-2 ">
              {isInCart ? (
                <CustomButton
                  title="Go to Cart"
                  className="!bg-orange-400"
                  width={300}
                  onClick={() => navigate("/cart")}
                />
              ) : (
                <CustomButton
                  title="Add To Cart"
                  width={300}
                  className="bg-orange-400"
                  onClick={() => handleAddToCart()}
                />
              )}
              {/* <CustomButton title="Buy Now" onClick={() => handleBuyItem} /> */}
            </div>
          </div>
        </div>
      </div>

      <Spacer size={20} />

      <div className="flex justify-between w-full border border-b border-b-neutral-200 border-neutral-400">
        {tabs.map((item, i) => (
          <div
            key={i}
            className={` flex-1 py-4 pl-8 font-semibold border-2 border-neutral-400 ${
              tab === item.slug
                ? "border-b-0 cursor-default"
                : "cursor-pointer border border-b-2 bg-neutral-200 hover:bg-neutral-400/50"
            } `}
            onClick={() => setTab(item.slug)}>
            {item.title} {item.slug === "reviews" && <>({totalReviews})</>}
          </div>
        ))}
      </div>
      <div className="w-full p-4 border-2 border-t-0 border-neutral-400 md:p-10">
        {tab === "desc" && (
          <div className="">{description && HTMLReactParser(description)}</div>
        )}
        {tab === "spec" && <div className="">{specificationList}</div>}
        {tab === "reviews" && (
          <div className="">
            <div className="flex flex-wrap items-start justify-between pb-4 border-b-2 border-orange-200">
              <div className="w-full p-2 md:w-2/5">
                <h4 className="text-2xl font-bold">
                  {product?.rating && product.rating.toFixed(2)}
                </h4>
                <span className="block font-semibold">overall</span>

                <ReviewStats reviews={reviews} />
              </div>

              <div className="flex-1 w-full p-2 pl-10 md:w-3/5">
                <h4 className="pb-2 mb-2 font-semibold border-b text-neutral-400">
                  Add Review
                </h4>
                {product && user ? (
                  <AddReview product={product} handleReload={reloadPage} />
                ) : (
                  <div className="py-4 text-sm">
                    You need to be logged in to add review to this product.
                  </div>
                )}
              </div>
            </div>

            <div className="p-2 bg-red-100">
              {product &&
                reviews?.map((review, i) => (
                  <ProductReview
                    key={i}
                    product={product}
                    review={review}
                    handleReload={reloadPage}
                  />
                ))}

              {totalReviews < 1 && (
                <div className="flex items-center justify-center p-4 ">
                  No reviews, Be the first one to add review.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-neutral-100">
        <div className="flex flex-col items-start justify-center pt-1 pb-2 text-sm text-gray-700">
          <span className="my-1">
            <BiBookmark className="inline w-4 h-4 " />
            <span className="pl-2 font-semibold text-gray-800">
              1 year
            </span>{" "}
            warranty.
          </span>
          <span className="my-1">
            <BiCheckShield className="inline w-4 h-4 " />
            <span className="pl-2 font-semibold text-gray-800">100%</span>{" "}
            Authentic products.
          </span>
          <span className="my-1">
            <HiArrowPath className="inline w-4 h-4 " />
            <span className="pl-2 font-semibold text-gray-800">30 days</span>
            Return.
          </span>
        </div>
      </div>

      {!loading && (
        <div className="px-2 py-4">
          <h2 className="py-2 text-lg font-semibold">Related Products</h2>
          <div className="flex flex-wrap justify-start gap-4 px-2 ">
            {relatedProducts}
          </div>
        </div>
      )}

      <Spacer size={100} className="bg-neutral-100" />
    </Container>
  );
};

export default ProductPage;
