import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { selectAuthUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { deleteReview } from "../features/product/productSlice";
import { FC } from "react";
import { Product, Review } from "../types";

interface Props {
  review: Review;
  product: Product;
  handleReload: (val: boolean) => void;
}

const ProductReview: FC<Props> = ({ review, product, handleReload }) => {
  const dispatch: any = useDispatch();
  const formatDate = moment(review.date).format("DD MMM YYYY HH:mm");

  const author = review.postedBy?.firstName + " " + review.postedBy?.lastName;

  const user = useSelector(selectAuthUser);
  const productId = product._id;
  const reviewId = review._id;
  const authorId = review.postedBy._id;

  // const editReview = () => {};
  const handleDelete = () => {
    const data = {
      id: productId,
      reviewId,
    };

    dispatch(deleteReview(data))
      .then((res: any) => {
        const data = res?.payload;
        if (data?.success) {
          toast.success("Review deleted successfully.");
        } else {
          toast.error(data.message);
        }
      })
      .finally(() => handleReload(true));
  };

  return (
    <div className="p-2 pl-4 my-2 rounded-md bg-gray-50">
      <Rating
        readonly
        SVGclassName="inline-block"
        size={16}
        initialValue={review.star}
        className="-mt-2"
      />
      <div className="py-1 pl-4 text-sm text-gray-500">{review.review}</div>
      <div className="py-1 pl-2 text-gray-700">
        - {author} <span className="ml-2 text-xs"> on: {formatDate}</span>
      </div>
      {user?._id === authorId && (
        <div className="my-2">
          {/* <span
            className="px-2 py-1 mx-2 text-sm border border-teal-400 cursor-pointer hover:bg-teal-100"
            onClick={editReview}>
            Edit
          </span> */}
          <span
            className="px-2 py-1 mx-2 text-sm border border-teal-400 cursor-pointer hover:bg-teal-100"
            onClick={handleDelete}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
