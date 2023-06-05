import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import HeadTitle from "../components/HeadTitle";
import LoaderUI from "../components/loaders/LoaderUI";
import Loader from "../components/loaders/Loader";
import { getOrder, selectOrder } from "../features/order";
import CustomButton from "../components/ui/CustomButton";
import Spacer from "../components/helpers/Spacer";
import payService from "../utils/payService";
import { selectAuthUser } from "../features/auth/authSlice";

const PaymentPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const user = useSelector(selectAuthUser);
  const order = useSelector(selectOrder);

  const paymentStatus = order?.paymentInfo?.status
    ? order?.paymentInfo?.status
    : "Loading...";

  useEffect(() => {
    if (id || reload) {
      console.log("...reloading page...");
      dispatch(getOrder(id)).then(() => {
        setLoading(false);
        setReload(false);
      });
    }
  }, [id, reload]);

  const handlePayment = () => {
    if (order) {
      const data = {
        orderId: order._id,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
        },
      };
      payService.checkoutHandler(data, navigate);
    }
  };

  const reloadPage = () => setReload(false);

  return (
    <Container className=" bg-neutral-50">
      <HeadTitle
        title="Payment"
        className="w-full p-10 text-center bg-neutral-100"
      />

      <div className="p-10">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col flex-wrap justify-center max-w-screen-xl gap-4 p-4 mx-auto lg:flex-row">
            <div className="flex flex-col flex-1 gap-4 p-4 border-2 border-teal-200 rounded-lg">
              <div className="">
                <div className="text-neutral-400">Order Id:</div>
                <div className="py-1 font-semibold text-teal-600">
                  {order?.orderId}
                </div>
              </div>
              <div className="">
                <div className="text-neutral-400">Amount:</div>
                <div className="py-1 text-xl font-semibold text-orange-600 font-rubik">
                  ₹ {order?.finalAmount}
                </div>
              </div>
              <div className="">
                <CustomButton
                  title="Pay Now"
                  width={100}
                  onClick={handlePayment}
                />
              </div>
              <Spacer size={20} />
            </div>
            <div className="flex items-center justify-center flex-1 p-4 font-semibold text-orange-600 border rounded-lg">
              {paymentStatus}
              <div className="py-4">
                {paymentStatus === "Paid" && (
                  <Link to={`/order/${id}`} className="hover:opacity-60">
                    Payment Successful! View Order
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Spacer size={100} className="bg-teal-100" />
    </Container>
  );
};

export default PaymentPage;
