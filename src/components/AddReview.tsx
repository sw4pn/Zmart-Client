const AddReview = () => {
  return <div>AddReview</div>;
};

export default AddReview;

// <form onSubmit={formik.handleSubmit}>
//                   <div className="py-3 pl-1">
//                     <span className="mr-3 text-sm font-semibold text-teal-600">
//                       Rating:
//                     </span>
//                     <Rating
//                       SVGclassName="inline-block"
//                       size={20}
//                       initialValue={0}
//                       value={formik.values.star}
//                       className="mr-2"
//                       // onClick={formik.handleChange("star")}
//                       onClick={(value) => formik.setFieldValue("star", value)}
//                     />
//                   </div>
//                   <div className="py-1">
//                     <CustomTextarea
//                       label="Your Review"
//                       classes="md:!max-w-sm"
//                       value={formik.values.review}
//                       change={formik.handleChange("review")}
//                     />
//                   </div>
//                   <CustomButton type="submit" text="Add Review" />
//                 </form>
