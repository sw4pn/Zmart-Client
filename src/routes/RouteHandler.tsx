import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import MainRoutes from "./MainRoutes";
import ScrollToTop from "../utils/ScrollToTop";

const RouteHandler = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};

export default RouteHandler;
