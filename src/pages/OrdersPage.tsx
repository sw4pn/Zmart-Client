import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import HeadTitle from "../components/HeadTitle";
import {
  selectOrderState,
  selectOrders,
  selectOrder,
  getUserOrders,
} from "../features/order";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "../components/helpers/Spacer";
import moment from "moment";
import CustomButton from "../components/ui/CustomButton";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const orderState = useSelector(selectOrderState);
  const orders = useSelector(selectOrders);
  const order = useSelector(selectOrder);

  const ordersArr = Object.values(orders);

  const ordersList =
    ordersArr.length > 0 ? (
      ordersArr.map((order, i) => (
        <div key={i} className="flex flex-col p-4 my-2 border-2 rounded-md ">
          <div className="max-w-sm py-2 mb-2 border-b text-neutral-500">
            Order ID:
            <span className="ml-4 font-semibold text-teal-600">
              {order.orderId}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 text-neutral-400 ">
            <div className="flex flex-col gap-2">
              Order placed:
              <span className="text-teal-600">
                {moment(order.orderTime).format("DD MMM YYYY, HH:MM")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              Order Status
              <span className="font-semibold text-teal-600">
                {order.status}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              Amount:
              <span className="text-teal-600 ">₹ {order.finalAmount}</span>
            </div>
            <div className="flex flex-col gap-2">
              Payment Status
              <span className="p-1 font-semibold text-center text-teal-600 border border-orange-400">
                {order.paymentInfo && order.paymentInfo.status}
              </span>
            </div>
            <div className="text-teal-600">
              {order.orderItems?.length} items
            </div>
            <CustomButton
              title="View Details"
              className=""
              width={150}
              onClick={() => navigate(`/order/${order._id}`)}
            />
          </div>
        </div>
      ))
    ) : (
      <div className="font-semibold text-gray-400 ">
        No orders,
        <Link
          to="/products/all"
          className="px-2 mx-0 text-blue-400 hover:underline">
          Start Shopping
        </Link>
        & place your first order.
      </div>
    );

  useEffect(() => {
    dispatch(getUserOrders()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <Container className="p-4">
      <HeadTitle title="Orders" className="p-4" />
      <Spacer size={20} />

      <div className="p-4 md:p-10">{ordersList}</div>
    </Container>
  );
};

export default OrdersPage;
