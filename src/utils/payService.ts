import axios from "axios";
import { toast } from "react-hot-toast";
import { apiUrl } from "../config/config";
import { config } from "./axiosConfig";

type razorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

const RAZORPAY_KEY = import.meta.env.RAZORPAY_KEY;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const getClientSecret = () => {
  //
};

const checkoutHandler = async (data, reloadPage) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("Razropay SDK failed to load!! Are you online?");
    return;
  }

  const orderId = data.orderId;

  const result = await axios.get(
    `${apiUrl}payments/create/${orderId}`,
    // {
    //   orderId: orderId,
    // },
    config
  );

  if (!result) {
    toast.success("Server error. Are you online?");
  }

  const amount = result?.data?.amount;
  const order_id = result?.data?.id;

  const options = {
    key: RAZORPAY_KEY,
    amount: amount,
    currency: "INR",
    name: "ZMART E-COM",
    description: "Test Transaction:" + orderId,
    // "image": "https://example.com/your_logo",
    order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    notes: {
      address: "ZMART E-COM Corporate Office",
    },
    theme: {
      color: "#3399cc",
      // color: "#61dafb",
    },
    // "callback_url":"http://localhost:1769/verify",
    prefill: {
      name: data.user.firstName + " " + data.user.lastName, //"Soumya Dey",
      email: data.user.email, // "SoumyaDey@example.com",
      contact: "9999999999",
    },
    handler: async function (response: razorpayResponse) {
      const payData = {
        orderId: orderId,
        order_id: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      const handlerResult = await axios.post(
        `${apiUrl}payments/verification`,
        payData,
        config
      );

      const verified = handlerResult.data.signatureIsValid;

      if (verified) {
        toast.success("Payment successful.");
      } else {
        const msg = verified.error.description
          ? verified.error.description
          : "Payment not verified.";
        toast.error(msg);
      }
      reloadPage(`/order/${orderId}`);
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
};

const payService = {
  getClientSecret,
  checkoutHandler,
};

export default payService;
