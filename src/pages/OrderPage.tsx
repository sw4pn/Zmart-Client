import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAllOrders,
  getOrder,
  selectOrder,
  selectOrderState,
  selectOrders,
} from "../features/order";
import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import HeadTitle from "../components/HeadTitle";
import moment from "moment";
import Spacer from "../components/helpers/Spacer";
import { AiFillBackward, AiFillCaretLeft } from "react-icons/ai";

const OrderPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const order = useSelector(selectOrder);

  useEffect(() => {
    dispatch(getOrder(id)).then(() => setLoading(false));
  }, []);

  const orderTime = order
    ? moment(order.orderTime).format(" DD MMM YYYY - HH:mm")
    : "- - -";

  const productList = order?.orderItems?.map((item, i) => {
    const product = item.product;
    const thumb = product?.thumbnail?.url
      ? product.thumbnail.url
      : "/images/product-image.png";

    return (
      <div
        key={i}
        className="flex justify-between max-w-screen-xl py-2 my-2 border-b">
        <div className="border border-teal-200 rounded-sm bg-neutral-50">
          <img src={thumb} alt="thumb" className="w-20 h-20 p-2" />
        </div>
        <div className="flex flex-col flex-1 px-2 ml-2 ">
          <span className="pb-1 text-lg font-semibold">
            <Link to={`/product/${product.slug}`} className="hover:opacity-70">
              {product.title}
            </Link>
          </span>
          <span className="text-neutral-400">
            {item.color && <>Color: {item.color.title}</>}
          </span>
          <span className="text-neutral-400">
            {item.variant && <>Variant: {item.variant}</>}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">₹ {item.price}</div>
          <div className="">Qty: {item.quantity}</div>
        </div>
      </div>
    );
  });

  return (
    <Container className="">
      <HeadTitle title="Order Details" className="p-10" />

      <div className="px-10">
        <Link to="/orders" className="hover:opacity-70">
          <AiFillCaretLeft size={20} className="inline mx-2" /> Back To All
          Orders
        </Link>
      </div>
      <Spacer size={40} />
      <div className="px-4 md:px-10 ">
        <div className="flex flex-col justify-start gap-2 p-4 text-teal-600 bg-neutral-100">
          <div className="">
            Order ID:
            <span className="pl-4 font-semibold">{order?.orderId}</span>
          </div>
          <div className="">
            Order status:
            <span className="pl-4 font-semibold">{order?.status}</span>
          </div>
          <div className="">
            Order date: <span className="pl-4">{orderTime}</span>
          </div>
        </div>

        {productList}

        <div className="p-4 bg-neutral-50 text-neutral-500">
          <div className="py-2">
            Payment Status:
            <span className="pl-4 font-semibold text-teal-600">
              {order?.paymentInfo.status && (
                <>
                  {order?.paymentInfo.status}

                  {(order.paymentInfo.status === "Not Paid" ||
                    order.paymentInfo.status === "Failed") && (
                    <Link
                      to={`/payment/${order._id}`}
                      className="pb-2 pl-4 border-b text-sky-600 hover:text-orange-400">
                      Proceed To Payment
                    </Link>
                  )}
                </>
              )}
            </span>
          </div>
          <div className="py-2 text-teal-600">
            <div className="max-w-xs pb-2 text-teal-600 border-b ">
              Delivery:
            </div>
            <div className="px-4 py-2">
              {order?.shippingInfo?.address}
              <br /> {order?.shippingInfo?.city}
              <br /> {order?.shippingInfo?.pinCode}
              <br /> {order?.shippingInfo?.state}
              <br /> {order?.shippingInfo?.country}
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-100">
          <div className="font-semibold text-teal-500">Order Summary:</div>
          <div className="flex flex-col gap-2 p-4">
            <div className="text-neutral-400">
              Order Price: ₹ {order?.orderPrice}
            </div>
            <div className="text-neutral-400">
              Tax Amount: ₹ {order?.taxPrice} (18%)
            </div>
            <div className="max-w-xs pt-2 text-lg border-t">
              Total:
              <span className="px-4 py-2 font-semibold text-orange-600 font-rubik">
                ₹ {order?.finalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Spacer size={200} className="bg-neutral-200" />
    </Container>
  );
};

export default OrderPage;
