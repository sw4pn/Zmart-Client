import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import RefundPage from "../pages/RefundPage";
import PrivacyPage from "../pages/PrivacyPage";
import ContactPage from "../pages/ContactPage";
import TermsPage from "../pages/TermsPage";
import FaqPage from "../pages/FaqPage";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import MyAccountPage from "../pages/MyAccountPage";
import OrdersPage from "../pages/OrdersPage";
import OrderPage from "../pages/OrderPage";
import Authenticate from "../components/Authenticate";
import AccountDetails from "../pages/AccountDetails";
import AccountSettings from "../pages/AccountSettings";
import ChangePass from "../pages/ChangePass";
import AccountEdit from "../pages/AccountEdit";
import Checkout from "../pages/Checkout";
import PaymentPage from "../pages/PaymentPage";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="refund-policy" element={<RefundPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="frequently-asked-questions" element={<FaqPage />} />

          {/* EveryOne */}
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="products/all" element={<ProductsPage />} />
          <Route path="category/:slug" element={<ProductsPage />} />
          <Route path="brand/:slug" element={<ProductsPage />} />

          {/*  PROTECTED ROUTES */}
          <Route element={<Authenticate />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="my-account" element={<MyAccountPage />}>
              <Route index element={<AccountDetails />} />
              <Route path="details" element={<AccountDetails />} />
              <Route path="edit" element={<AccountEdit />} />
              <Route path="change-password" element={<ChangePass />} />
              <Route path="settings" element={<AccountSettings />} />
            </Route>
            <Route path="order/:id" element={<OrderPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/:id" element={<PaymentPage />} />
          </Route>
          {/* 
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/:id" element={<Payment />} />
            <Route path="complete" element={<PaymentStatus />} />
            </Route>
          </Route> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default MainRoutes;
