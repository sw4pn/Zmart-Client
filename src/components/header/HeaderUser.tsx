import { useSelector } from "react-redux";
import useLoginModal from "../../hooks/modals/useLoginModal";
import useRegisterModal from "../../hooks/modals/useRegisterModal";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { AuthState } from "../../features/auth/authSlice";

const HeaderUser = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const { isAuthenticated, user } = authState;

  return (
    <>
      {isAuthenticated && user ? (
        <>
          <span className="pointer-events-none">Hello,</span>
          <Link to="/my-account" className="capitalize">
            {user.firstName}
          </Link>
        </>
      ) : (
        <>
          <div onClick={loginModal.onOpen} className="cursor-pointer">
            Login
          </div>
          <div onClick={registerModal.onOpen} className="cursor-pointer">
            Register
          </div>
          <LoginModal />
          <RegisterModal />
        </>
      )}
    </>
  );
};

export default HeaderUser;
