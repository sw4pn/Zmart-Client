import { Product } from "../types";
import { FC, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CustomButton from "./ui/CustomButton";
import { Rating } from "react-simple-star-rating";
import Spacer from "./helpers/Spacer";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  loadUser,
  selectAuthUser,
  selectCart,
  toggleWishlist,
} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  product: Product;
  className?: string;
}

const SpecialCard: FC<Props> = ({ product }) => {
  const [reload, setReload] = useState(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { thumbnail, title, brand, price, discount, rating, slug } = product;

  const cart = useSelector(selectCart);
  const user = useSelector(selectAuthUser);

  const productId = product._id;
  const isFavorite =
    user?.wishlist &&
    user?.wishlist?.find((item) => item?._id?.toString() === productId);

  const alreadyInCart = cart?.products.some(
    (item) => item?.product?._id?.toString() === product?._id.toString()
  );

  const discountedPrice =
    discount > 0 ? Math.ceil(price * (discount / 100)) : Math.ceil(price);

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
    const productId = product._id;

    const color = product.color[0];
    const variant =
      product.variant && product.variant[0]?.title
        ? product.variant[0]?.title
        : "";

    const finalPrice =
      product.discount > 0
        ? Math.ceil(product.price * (discount / 100))
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
    if (reload) {
      dispatch(loadUser());
      setReload(false);
    }
  }, [reload, dispatch]);

  const handleWishlist = (id: string) => {
    if (user) {
      dispatch(toggleWishlist({ productId: id })).then(() => setReload(true));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative text-center bg-white border group sm:max-w-sm ">
      <div className="flex flex-col bg-white border group sm:flex-row">
        {/* <div className="w-96"> */}
        <div className="flex-1 p-2 overflow-hidden">
          <img
            src={thumbnail?.url}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 group-hover:duration-300 group-hover:ease-in-out"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 px-1 py-4">
          <div
            className="absolute cursor-pointer right-4 top-2 hover:text-orange-500"
            onClick={() => handleWishlist(productId)}>
            {isFavorite ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </div>
          <p className="text-orange-700 capitalize">{brand.title}</p>
          <h2 className="text-lg font-semibold">
            <Link to={`/product/${slug}`} className="hover:opacity-70">
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
          <Spacer size={40} />
          <div className="flex flex-wrap items-center gap-2 py-2 text-sm">
            Price: {productPrice}
          </div>
          <div className="py-2 pl-2 pr-4">
            {alreadyInCart ? (
              <CustomButton
                title="Go To Cart"
                className="!p-1  !border rounded-none !bg-neutral-100 hover:bg-neutral-200 hover:border-orange-700"
                outline
                onClick={() => navigate("/cart")}
              />
            ) : (
              <CustomButton
                title="Add To Cart"
                className="!p-1  !border rounded-none hover:bg-neutral-100 hover:border-orange-700"
                outline
                onClick={() => handleAddToCart()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCard;
