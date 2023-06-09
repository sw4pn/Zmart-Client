import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  product: {
    image: string;
    isLink: boolean;
    link: string;
    dark?: boolean;
    isText?: boolean;
    text?: {
      category?: string;
      title?: string;
      text?: string;
    };
  };
}

const BigCard: FC<Props> = ({ product }) => {
  return (
    <Link
      to={product.link}
      className={`relative rounded-lg overflow-hidden hover:opacity-80 w-[90%]  md:w-80 2xl:w-[360px] group ${
        product.dark
          ? "bg-zinc-800 text-neutral-200"
          : "bg-neutral-100 text-zinc-800"
      }`}>
      <div className="absolute z-10 p-4 m-2">
        {product.isText && product.text && (
          <>
            <p className="text-sm uppercase opacity-70">
              {product.text.category}
            </p>
            <h2 className="my-2 text-xl font-bold capitalize">
              {product.text.title}
            </h2>
            <p className="opacity-80">{product.text.text}</p>
          </>
        )}
      </div>
      <img
        src={product.image}
        alt="BigCard"
        className="object-cover w-full h-full group-hover:brightness-105 "
      />
    </Link>
  );
};

export default BigCard;
