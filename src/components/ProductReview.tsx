import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { selectAuthUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import {
  deleteReview,
  resetProductState,
} from "../features/product/productSlice";

const ProductReview = ({ review, product, handleReload }) => {
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
      .then((res) => {
        // dispatch(resetProductState());
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
            className="border py-1 px-2 mx-2 border-teal-400 text-sm hover:bg-teal-100 cursor-pointer"
            onClick={editReview}>
            Edit
          </span> */}
          <span
            className="border py-1 px-2 mx-2 border-teal-400 text-sm hover:bg-teal-100 cursor-pointer"
            onClick={handleDelete}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
