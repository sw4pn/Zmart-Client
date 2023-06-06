import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthState } from "../../features/auth/authSlice";

const HeaderUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nextLocation = location.pathname;

  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const { isAuthenticated, user } = authState;

  return (
    <>
      {isAuthenticated && user ? (
        <>
          <span className="pointer-events-none">Hello,</span>
          <Link to="/my-account" className="capitalize hover:opacity-60">
            {user.firstName}
          </Link>
        </>
      ) : (
        <>
          <div
            // onClick={loginModal.onOpen}
            onClick={() => navigate("/login", { state: nextLocation })}
            className="cursor-pointer hover:opacity-60">
            Login
          </div>
          <div
            onClick={() => navigate("/register", { state: nextLocation })}
            className="cursor-pointer hover:opacity-60">
            Register
          </div>
        </>
      )}
    </>
  );
};

export default HeaderUser;
