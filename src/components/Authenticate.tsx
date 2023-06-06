import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../features/auth/authSlice";

const Authenticate = ({ admin }: { admin?: boolean }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    if (admin) return <Navigate to="/admin/login" state={location.pathname} />;

    return <Navigate to="/login?auth=0" state={location.pathname} />;
  }

  return <Outlet />;
};

export default Authenticate;
