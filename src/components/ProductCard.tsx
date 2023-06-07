import { Product } from "../types";
import { FC, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CustomButton from "./ui/CustomButton";
import { Rating } from "react-simple-star-rating";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  loadUser,
  selectAuthUser,
  selectCart,
  toggleWishlist,
} from "../features/auth/authSlice";
import { stripHTML, truncateTitle } from "../utils/utils";
import { toast } from "react-hot-toast";

interface Props {
  product: Product;
  grid?: number;
}

const ProductCard: FC<Props> = ({ product, grid }) => {
  const dispatch: any = useDispatch();
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const { thumbnail, title, brand, price, discount, rating, slug } = product;

  const cart = useSelector(selectCart);
  const user = useSelector(selectAuthUser);

  const productId = product._id;
  const isFavorite =
    user?.wishlist &&
    user?.wishlist?.find((item) => item?._id?.toString() === productId);
  const alreadyInCart = cart?.products.some(
    (item) => item.product?._id?.toString() === product._id.toString()
  );

  const desc =
    grid === 0 ? truncateTitle(String(product?.description), 200) : "";

  const discountedPrice =
    discount > 0
      ? price - Math.ceil(price * (discount / 100))
      : Math.ceil(price);

  const productPrice =
    discount > 0 ? (
      <p className="">
        <span className="text-sm line-through font-rubik">₹ {price}</span>
        <span className="pl-1 text-lg font-kanit"> ₹ {discountedPrice}</span>
      </p>
    ) : (
      <p className="text-base">
        <span className="text-lg font-rubik">₹ {price}</span>
      </p>
    );

  const handleAddToCart = () => {
    const color = product.color[0];
    const variant =
      product.variant && product.variant[0]?.title
        ? product.variant[0]?.title
        : "";

    const finalPrice =
      product.discount > 0
        ? product.price - Math.ceil(product.price * (discount / 100))
        : product.price;

    const data = {
      productId,
      quantity: 1,
      color,
      variant,
      price: product.price,
      finalPrice,
    };

    dispatch(addToCart(data)).then(() => setReload(true));
  };

  useEffect(() => {
    if (reload && user) {
      dispatch(loadUser());
      setReload(false);
    }
  }, [reload]);

  const handleWishlist = (id: string) => {
    if (user) {
      dispatch(toggleWishlist({ productId: id })).then((res: any) => {
        const data = res.payload;
        if (data.success) {
          toast.success(data.message);
          setReload(true);
        }
      });
    } else {
      navigate("/login?auth=0");
    }
  };

  return (
    <>
      <div
        className={`relative flex  bg-white border  group  rounded-md px-4 drop-shadow-md ${
          grid === 0 ? "max-w-screen-md flex-row" : "w-80 flex-col"
        }`}>
        <div className="flex-1 p-2 overflow-hidden max-h-72">
          <img
            src={thumbnail?.url}
            alt={title}
            className="object-contain w-full h-full group-hover:scale-110 group-hover:duration-300 group-hover:ease-in-out"
          />
        </div>
        <div
          className="absolute cursor-pointer right-4 top-2 hover:text-orange-500"
          onClick={() => handleWishlist(productId)}>
          {isFavorite ? (
            <AiFillHeart size={24} />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </div>
        {product.discount > 0 && (
          <div className="absolute px-1.5 py-1 text-sm bg-orange-600 rounded-full top-4 font-semibold text-neutral-100">
            {product.discount}%
          </div>
        )}
        <div className="flex flex-col justify-between flex-1 py-4">
          <p className="text-orange-700 capitalize">{brand.title}</p>
          <h2 className="font-semibold ">
            <Link to={`/product/${slug}`} className=" hover:opacity-70">
              {title}
            </Link>
          </h2>
          <div className="">
            <Rating
              size={16}
              SVGclassName="inline-block"
              initialValue={rating}
              allowFraction
              readonly
            />
          </div>
          {grid === 0 && (
            <div className="py-2 text-neutral-400">{stripHTML(desc)}</div>
          )}
          {/* <Spacer size={40} /> */}
          <div className="flex flex-wrap items-center gap-2 py-2 text-sm">
            {productPrice}
          </div>
          <div className="py-2 pl-2 pr-4">
            {alreadyInCart ? (
              <CustomButton
                title="Go To Cart"
                className=" max-w-[260px] !border rounded-none !bg-neutral-100 hover:bg-neutral-200 hover:border-orange-700"
                outline
                onClick={() => navigate("/cart")}
              />
            ) : (
              <CustomButton
                title="Add To Cart"
                className="max-w-[260px] !bg-orange-300 !border rounded-none hover:bg-neutral-100 hover:border-orange-700"
                outline
                onClick={() => handleAddToCart()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
