import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import { Product } from "../types";
import { FC } from "react";
import { scrollMeTop } from "../utils/ScrollToTop";
import { Rating } from "react-simple-star-rating";
import CustomTextarea from "./ui/CustomTextarea";
import CustomButton from "./ui/CustomButton";
import { addReview, resetProductState } from "../features/product/productSlice";
import { toast } from "react-hot-toast";

interface Props {
  product: Product;
}

const AddReview: FC<Props> = ({ product, handleReload }) => {
  const dispatch: any = useDispatch();
  const user = useSelector(selectAuthUser);

  const initialReviewState = {
    star: 0,
    review: "",
    postedBy: user?._id || null,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialReviewState,
    // validationSchema: schema,
    onSubmit: (values) => {
      if (values.star < 1) {
        toast.error("Please select rating.");
        return;
      }
      const currentDate = new Date();
      const data = {
        id: product?._id,
        ...values,
        date: currentDate,
      };

      dispatch(addReview(data))
        .then((res) => {
          // dispatch(resetProductState());
          const data = res?.payload;
          if (data?.success) {
            formik.resetForm();
            toast.success("Review added successfully.");
          } else {
            toast.error(data.message);
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
          handleReload(true);
        });

      // scrollMeTop();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-2 px-2">
          <span className="  font-semibold text-teal-600 flex gap-4 items-center justify-start">
            Rating:
            <Rating
              SVGclassName="inline-block"
              size={20}
              initialValue={0}
              value={formik.values.star}
              onClick={(value) => formik.setFieldValue("star", value)}
            />
          </span>
        </div>
        <div className="px-2">
          <span className="text-sm text-neutral-400 block my-2">
            Enter Review
          </span>
          <CustomTextarea
            id="add-review"
            className="md:max-w-sm"
            value={formik.values.review}
            onChange={formik.handleChange("review")}
          />
          <CustomButton type="submit" title="Add Review" width={200} />
        </div>
      </form>
    </>
  );
};

export default AddReview;
