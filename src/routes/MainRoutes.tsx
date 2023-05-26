import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import RefundPage from "../pages/RefundPage";
import PrivacyPage from "../pages/PrivacyPage";
import ContactPage from "../pages/ContactPage";
import TermsPage from "../pages/TermsPage";
import FaqPage from "../pages/FaqPage";

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
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
