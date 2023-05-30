import { useSelector } from "react-redux";
import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import { selectAuthUser } from "../features/auth/authSlice";
import CartItem from "../components/CartItem";
import CustomButton from "../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  const cart = user?.cart;

  const cartItems = cart?.products?.map((item, i) => (
    <CartItem key={i} item={item} />
  ));

  const subtotal = cart?.totalPrice;

  // const savings = cart.totalPrice - subtotal;

  return (
    <Container className="">
      <HeadTitle title="Cart" className="px-10 py-10" />

      <div className="px-10">
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 ">
          <div className="">Product</div>
          <div className="">Price</div>
          <div className="">Quantity</div>
          <div className="">Total</div>
        </div> */}
        {cartItems}

        <div className="py-10">
          <CustomButton
            title="Continue shopping"
            outline
            width={220}
            onClick={() => navigate("/")}
          />

          <div className="flex items-start justify-between mx-4">
            <div className="mt-4 text-sm text-neutral-400">
              *Order special instructions
            </div>
            <div className="flex items-start justify-end gap-4 py-4 text-right text-red-800">
              <div className="text-lg font-bold">Subtotal</div>
              <div className="text-xl font-bold">
                ₹ {subtotal}
                {/* <span className="block text-sm font-normal">
                  Total Savings: ₹ {savings}
                </span> */}
              </div>
            </div>
          </div>
          <div className="py-2 mt-2 text-sm text-right text-gray-500">
            Taxes and Shipping calculated at checkout
          </div>

          <div className="flex items-center justify-end py-4">
            {/* <Link to="/checkout"> */}
            <CustomButton
              className="bg-orange-400 hover:bg-orange-600"
              title="Checkout"
              width={300}
              onClick={() => navigate("/checkout")}
            />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
