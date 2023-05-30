import { Rating } from "react-simple-star-rating";
import LoaderContent from "./loaders/LoaderContent";
const ReviewStats = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <LoaderContent />;

  const stats = [];

  Array(5)
    .fill(null)
    .map((item, i) => {
      const count =
        reviews.length > 0
          ? reviews.filter((item) => item.star === i).length
          : 0;

      const percent = Math.round((count / reviews.length) * 100);

      stats.push(
        <div key={i} className="flex items-center justify-between">
          <Rating
            readonly
            SVGclassName="inline-block"
            size={18}
            initialValue={i}
            className="mr-2"
          />
          <div className="flex-1 h-4 max-w-xs mt-1 ml-5 bg-gray-300 rounded-full dark:bg-gray-700">
            <div
              className="h-4 rounded-full bg-sky-400"
              style={{
                width: `${percent}%`,
              }}></div>
          </div>
          <div className="mx-4">{count}</div>
        </div>
      );
    });

  return <>{stats}</>;
};

export default ReviewStats;
