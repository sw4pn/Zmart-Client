import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Container from "../components/layouts/Container";
import HeadTitle from "../components/HeadTitle";
import { useFormik } from "formik";
import { loadUser, selectAuthUser } from "../features/auth/authSlice";
import { scrollMeTop } from "../utils/ScrollToTop";
import CustomTextarea from "../components/ui/CustomTextarea";
import CustomInput from "../components/ui/CustomInput";
import Spacer from "../components/helpers/Spacer";
import { AiOutlineTags } from "react-icons/ai";
import CustomButton from "../components/ui/CustomButton";
import { selectCoupon, validateCoupon } from "../features/coupon/couponSlice";
import { toast } from "react-hot-toast";
import { Coupon } from "../types";
import { createOrder } from "../features/order";

const schema = yup.object().shape({
  country: yup.string().required("Country is required."),
  state: yup.string().required("State is required."),
  city: yup.string().required("City is required."),
  postCode: yup.string().required("Postal Code is required."),
  //   bCountry: yup.string().required("Country is required."),
  //   bState: yup.string().required("State is required."),
  //   bCity: yup.string().required("City is required."),
  //   bPostCode: yup.string().required("Postal Code is required."),
  shipping: yup
    .string()
    .required("Address is required.")
    .min(5, "Minimum 5 characters required"),
  //   billing: yup.string().min(5, "Minimum 5 characters required"),
  //   payMode: yup.string().required("Payment Mode is required"),
});

const SHIPPING_COST = 50;

interface CouponType {
  valid: boolean;
  message: string;
  coupon: Coupon | undefined;
}

const Checkout = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [validCoupon, setValidCoupon] = useState<CouponType>({
    valid: false,
    message: "",
    coupon: undefined,
  });

  const user = useSelector(selectAuthUser);
  const coupon = useSelector(selectCoupon);
  const cart = user?.cart || { products: [] };
  const shippingPrice = cart?.totalPrice > 499 ? 0 : SHIPPING_COST;

  const couponDiscount = coupon?.discount ?? 0;
  const couponCost =
    couponDiscount !== 0
      ? Math.ceil((cart?.totalPrice * couponDiscount) / 100)
      : 0;
  const totalCost = shippingPrice + cart?.totalPrice - couponCost;

  const productsArr = cart.products.length > 0 ? cart?.products : [];

  const orderList =
    productsArr.length > 0
      ? productsArr.map((item, index) => {
          const product = item.product;
          const thumb = product?.thumbnail?.url
            ? product.thumbnail.url
            : "images/product-image.png";

          return (
            <div
              key={index}
              className="flex justify-between rounded-md gap-4 my-2 px-2 py-2.5">
              <div className="flex justify-start text-sm ">
                <img src={thumb} alt="thumb" className="w-10 h-10 mr-2" />
                {product?.title}
                <span className="inline-block ml-1 text-neutral-400">
                  x {item.quantity}
                </span>
              </div>
              <div className="self-end pb-2 font-semibold">
                ₹ {item?.finalPrice * item?.quantity}
              </div>
            </div>
          );
        })
      : "No items found.";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      shipping: user?.address?.address || "",
      country: user?.address?.country || "",
      state: user?.address?.state || "",
      city: user?.address?.city || "",
      postCode: user?.address?.postCode || "",
      //   bCountry: user?.billing?.country || "",
      //   bState: user?.billing?.state || "",
      //   bCity: user?.billing?.city || "",
      //   billing: user?.billing?.address || "",
      //   bPostCode: user?.billing?.postCode || "",
      //   payMode: "",
      coupon: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const orderItems = [];
      productsArr.length > 0 &&
        productsArr.map((item) =>
          orderItems.push({
            product: item.product._id,
            price: item.finalPrice,
            quantity: item.quantity,
            color: item.color._id,
            variant: item.variant,
          })
        );

      const data = {
        id: user._id,
        shippingInfo: {
          address: values.shipping,
          city: values.city,
          pinCode: values.postCode,
          state: values.state,
          country: values.country,
        },
        orderedBy: user?._id,
        orderItems: orderItems,
      };

      dispatch(createOrder(data))
        .then((res: any) => {
          if (res.payload.success) {
            const ord_id = res.payload._id;

            dispatch(loadUser());

            navigate(`/payment/${ord_id}`);
          } else {
            // console.log(res.payload.message);
            toast.error(res.payload.message);
          }
        })
        .catch((err: any) => {
          // console.log(err);
          toast.error(err.response.message);
        })
        .finally(() => {
          formik.setSubmitting(false);
          scrollMeTop();
        });
    },
  });

  const applyCoupon = () => {
    const code = couponCode?.toUpperCase();

    dispatch(validateCoupon(code)).then((res: any) => {
      const data = res.payload;
      const msg = data?.message ? data.message : "Invalid Coupon";
      if (data.success) {
        const { success, message, ...restData } = data;
        const coupon: Coupon = restData;
        toast.success("Coupon validated.");

        setValidCoupon({
          valid: true,
          message: "Coupon validated.",
          coupon: coupon,
        });
      } else {
        toast.error(msg);
        setValidCoupon((prev) => ({ ...prev, message: msg }));
      }
    });
  };

  const errors =
    formik.errors.shipping ||
    formik.errors.country ||
    formik.errors.state ||
    formik.errors.city ||
    formik.errors.postCode;

  return (
    <Container className="px-8 py-4">
      <HeadTitle title="Checkout" />
      <Spacer size={40} />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col flex-wrap justify-between w-full max-w-screen-xl gap-4 py-10 mx-auto md:flex-row">
          <div className="flex-1 p-8 border">
            <h2 className="my-4 text-lg font-semibold text-gray-800 lg:text-xl">
              Shipping Address
            </h2>
            <div className="py-4 md:max-w-sm">
              <CustomTextarea
                label="Address"
                id="shipping-address"
                value={formik.values.shipping}
                onChange={formik.handleChange("shipping")}
                errors={formik.touched.shipping && formik.errors.shipping}
              />
              <CustomInput
                id="shipping-city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange("city")}
                errors={formik.touched.city && formik.errors.city}
              />
              <CustomInput
                type="number"
                id="shipping-postcode"
                label="Postal Code"
                value={formik.values.postCode}
                onChange={formik.handleChange("postCode")}
                errors={formik.touched.postCode && formik.errors.postCode}
              />
              <CustomInput
                id="shipping-state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange("state")}
                errors={formik.touched.state && formik.errors.state}
              />
              <CustomInput
                id="shipping-country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange("country")}
                errors={formik.touched.country && formik.errors.country}
              />
            </div>
          </div>
          <div className="flex-1 w-full p-4 bg-neutral-100 md:max-w-sm">
            <h2 className="py-2 text-lg font-semibold text-gray-800">
              Apply Coupon
            </h2>
            <div className="flex items-center justify-start p-2 mx-2 my-2 text-xs border">
              <AiOutlineTags className="mr-2" size={16} />
              <div className="text-sm">
                Have a promo code? Enter below and apply the code.
              </div>
            </div>
            <Spacer size={20} />

            <div className="flex flex-col items-start justify-center py-2 md:flex-row md:gap-2">
              <CustomInput
                id="coupon-code"
                label="Coupon"
                //   className="md:max-w-[150px] uppercase "
                className="uppercase"
                onChange={(e) => {
                  const val = e.target?.value.toUpperCase();
                  setCouponCode(val);
                }}
              />
              <CustomButton
                //   className="md:mt-1.5 px-8 bg-orange-400 hover:bg-orange-500 "
                className="!bg-orange-400 hover:bg-orange-500"
                title="Apply"
                onClick={() => applyCoupon()}
                width={160}
                disabled={couponCode?.length < 1}
              />
            </div>
            <span className="pb-2">{validCoupon.message}</span>

            <h2 className="py-2 my-2 text-lg font-semibold text-gray-800">
              Your Order
            </h2>
            <div className="p-2 bg-green-200 rounded-md">
              <div className="flex justify-between gap-4 p-2 mb-2 text-sm font-semibold border-b border-neutral-400/40 text-neutral-600">
                <div className="">Product</div>
                <div className="">Total</div>
              </div>
              {orderList}

              <div className="flex justify-between gap-4 p-2 mt-4 text-sm font-semibold border-t border-b border-neutral-400/40 text-neutral-600">
                <div className="">Subtotal</div>
                <div className="">₹ {cart?.totalPrice}</div>
              </div>

              <div className="flex justify-between gap-5 p-2 mt-5 text-sm font-semibold text-gray-500 border-b border-gray-300">
                <div className="">Shipping </div>
                <div className="">+ ₹ {shippingPrice}</div>
              </div>

              {coupon && (
                <div className="flex justify-between gap-5 p-2 mt-5 text-sm font-semibold text-gray-700 border-b border-gray-300">
                  <div className="font-light text-gray-500">Coupon </div>
                  <div className="text-orange-700">- ₹ {couponCost}</div>
                </div>
              )}

              <div className="flex justify-between gap-5 px-2 py-2 mt-8 text-sm font-semibold text-teal-800">
                <div className="text-lg">Total </div>
                <div className="text-lg font-semibold text-green-700">
                  ₹ {totalCost}
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4 ">
              <CustomButton
                type="submit"
                className="text-lg !bg-orange-400 my-4 w-2/3"
                title="Place Order"
              />
            </div>
            {errors && <div className="text-red-600">{errors.toString()}</div>}
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Checkout;
