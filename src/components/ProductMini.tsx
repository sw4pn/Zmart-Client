import { Link } from "react-router-dom";
import { Product } from "../types";
import { FC } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface Props {
  onClose?: () => void;
  product: Product;
}

const ProductMini: FC<Props> = ({ product, onClose }) => {
  const thumb = product?.thumbnail?.url
    ? product.thumbnail.url
    : "/images/product-image.png";

  const { discount, price } = product;

  // const totalPrice =
  //   product?.discount && product?.discount > 0
  //     ? Math.ceil(price - (100 - discount) / 100)
  //     : Math.ceil(price);

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

  return (
    <div className="relative w-64 p-4 border shadow-md">
      <div className="w-24 h-24 mx-auto overflow-hidden">
        <div
          className="absolute rounded-full -top-4 -right-4 p-1.5 border cursor-pointer bg-neutral-100 hover:bg-neutral-200 duration-200 transition ease-in-out"
          onClick={onClose}>
          <HiOutlineXMark size={20} />
        </div>
        <img
          src={thumb}
          alt="product"
          className="w-full h-full duration-500 bg-cover rounded-md hover:scale-110"
        />
      </div>
      <div className="flex flex-col px-2 py-2 basis-2/3">
        <Link
          to={`/product/${product.slug}`}
          className="my-2 font-semibold capitalize hover:opacity-70 text-neutral-500">
          {product.title}
        </Link>
        <div className=""> {productPrice} </div>
        <div className="">
          {discount > 0 && (
            <div className="inline text-xs  ml-1 px-2 rounded-full bg-orange-300 py-0.5 font-semibold uppercase">
              {Math.ceil(discount)} % OFF
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductMini;
