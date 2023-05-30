import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../features/auth/authSlice";
import LoginModal from "./modals/LoginModal";

const Authenticate = ({ admin }: { admin?: boolean }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    if (admin) return <Navigate to="/admin/login" />;

    return <LoginModal />;
  }

  return <Outlet />;
};

export default Authenticate;
