import moment from "moment";
import { Rating } from "react-simple-star-rating";

const ProductReview = ({ review }) => {
  const formatDate = moment(review.date).format("DD MMM YYYY HH:mm");

  const author = review.postedBy?.firstName + " " + review.postedBy?.lastName;

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
    </div>
  );
};

export default ProductReview;
