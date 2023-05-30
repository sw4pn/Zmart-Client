import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getProductByCategory,
  getProductBySlug,
  productState,
  selectAProduct,
  selectProducts,
} from "../features/product/productSlice";
import { selectAuthUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ProductImage from "../components/ProductImage";
import { Rating } from "react-simple-star-rating";
import { BiBookmark, BiCheckShield } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import LoaderContent from "../components/loaders/LoaderContent";
import CustomButton from "../components/ui/CustomButton";
import Container from "../components/layouts/Container";
import Spacer from "../components/helpers/Spacer";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "../components/ui/Accordion";
import HTMLReactParser from "html-react-parser";
import ReviewStats from "../components/ReviewStats";
import AddReview from "../components/AddReview";
import ReviewList from "../components/ProductReview";
import ProductReview from "../components/ProductReview";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const user = useSelector(selectAuthUser);
  const product = useSelector(selectAProduct);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug)).then(() => setLoading(false));
    }
  }, [slug]);

  const cart = user?.cart;
  const wishlist = user?.wishlist;

  const productId = product?._id;
  const discount = product?.discount;
  const price = product?.price;
  const reviews = product?.reviews;
  const totalReviews = reviews && reviews.length > 0 ? reviews.length : 0;

  useEffect(() => {
    if (product) {
      const catSlug = product.category?.slug;
      dispatch(getProductByCategory(catSlug));
    }
  }, [product]);

  const relatedProducts = products;

  const isInCart = cart?.products?.some(
    (product) => product._id?.toString() === productId?.toString()
  );

  const isFavorite =
    wishlist &&
    wishlist?.find((product) => product._id?.toString() === productId);

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

  return (
    <Container className="p-2 md:p-4">
      <div className="flex flex-col justify-center gap-4 md:flex-row lg:gap-10 ">
        <div className="flex-1">
          <ProductImage loading={loading} images={product?.images} />
        </div>

        <div className="flex flex-col flex-1 gap-2 px-4 py-2">
          <div className="flex flex-col flex-1 ">
            {!loading ? (
              <>
                <Link to="" className="text-orange-600 capitalize">
                  {product?.brand?.title}
                </Link>
                <h1 className="text-2xl font-semibold">{product?.title}</h1>
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
                  <span className="mt-1 font-kanit">( {reviews} )</span>
                </>
              ) : (
                <LoaderContent />
              )}
            </div>

            {!loading ? (
              <>
                {product?.discount && (
                  <div className="font-semibold text-orange-600">
                    {product?.discount} % OFF
                  </div>
                )}
                <div className="py-2 text-lg text-orange-800">
                  {productPrice}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <div className="font-semibold">Color:</div>
                  <div className="inline-block p-2">
                    {product?.color?.length > 0 &&
                      product.color.map((color, i) => (
                        <span
                          key={i}
                          className="block w-8 h-8 m-1 border-4 rounded-full border-neutral-400 border-spacing-40"
                          style={{ backgroundColor: `${color.value}` }}
                        />
                      ))}
                  </div>
                </div>

                <div className="">
                  <div className="">Variants:</div>
                  <div className="flex flex-wrap p-2 ">
                    {product?.variant?.length > 0 &&
                      product.variant.map((item, i) => (
                        <span
                          key={i}
                          className="block p-2 m-1 border border-neutral-500 text-neutral-500">
                          {item.title}
                        </span>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <LoaderContent />
            )}
            <div className="">{!loading && <></>}</div>
          </div>
          <div className="">
            <div className="">
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
                  <span className="pl-2 font-semibold text-gray-800">
                    100%
                  </span>{" "}
                  Authentic products.
                </span>
                <span className="my-1">
                  <HiArrowPath className="inline w-4 h-4 " />
                  <span className="pl-2 font-semibold text-gray-800">
                    30 days
                  </span>
                  Return.
                </span>
              </div>
            </div>

            <div className="flex max-w-md gap-4 py-4 mx-2 ">
              <CustomButton
                title="Add To Cart"
                outline
                onClick={() => console.log("add cart")}
              />
              <CustomButton
                title="Buy Now"
                onClick={() => console.log("buy")}
              />
            </div>
          </div>
        </div>
      </div>

      <Spacer size={50} />
      {/* 
      <div className="px-10 mb-10">
        <Accordion>
          <AccordionItem className="w-full border">
            <AccordionHeader className="w-full px-10 py-4 bg-neutral-100">
              <h2 className="text-lg font-semibold text-start">Description</h2>
            </AccordionHeader>
            <AccordionBody className="">
              <div className="p-10">
                {product?.description && HTMLReactParser(product?.description)}
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="">
        <h2 className="text-lg">Reviews</h2>
        <div className="flex flex-wrap items-start justify-between bg-green-100 border-b-2 border-orange-300">
          <div className="w-full p-2 md:w-2/5">
            <h4 className="text-2xl font-bold">
              {product?.rating && product.rating.toFixed(2)}
            </h4>
            <span className="block font-semibold">overall</span>

            <ReviewStats reviews={product?.reviews} />
          </div>
          <div className="flex-1 w-full p-2 pl-10 md:w-3/5">
            <h4 className="pb-2 border-b">Add Review</h4>
            {user ? (
              <AddReview />
            ) : (
              <div className="py-4 text-sm">
                You need to be logged in to add review to this product.
              </div>
            )}
          </div>
        </div>

        <div className="p-2 bg-red-100">
          {product?.reviews?.map((review, i) => (
            <ProductReview key={i} review={review} />
          ))}
        </div>
      </div> */}
      {/* 
      <div className="">
        {relatedProducts?.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div> */}
    </Container>
  );
};

export default ProductPage;
