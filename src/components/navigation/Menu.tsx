import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { categoryState } from "../../features/category/categorySlice";
import { Link, useNavigate } from "react-router-dom";
import useLoginModal from "../../hooks/modals/useLoginModal";
import useRegisterModal from "../../hooks/modals/useRegisterModal";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { logout } from "../../features/auth/authSlice";

import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";
interface Props {
  show: boolean;
  toggle: () => void;
}

const Menu: FC<Props> = ({ show, toggle }) => {
  const dispatch: any = useDispatch();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const navigate = useNavigate();

  const logoutMe = () => {
    dispatch(logout()).then(() => {
      toast.success("You are successfully logged out.");
      navigate("/");
    });
  };

  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const user = useSelector(selectAuthUser);

  const categoryState = useSelector<RootState, categoryState>(
    (state) => state.category
  );

  const categoryArr = Object.values(categoryState?.categories).map(
    (value) => value
  );

  const categoryList = categoryArr.map((category, i) => {
    // console.log(category);
    return (
      <li
        key={i}
        className="py-1 text-lg font-semibold font-rubik hover:opacity-70">
        <Link to={category.slug}>{category.title}</Link>
      </li>
    );
  });

  return (
    <div className="fixed inset-0 z-30 bg-neutral-200/70 backdrop-blur-md">
      <nav className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-neutral-900">
        <div className="py-1 my-2 border-b select-none border-neutral-300 text-neutral-400 ">
          ACCOUNT
        </div>
        <ul>
          {isAuthenticated ? (
            <>
              <li
                className="py-1 text-lg font-semibold cursor-pointer text-neutral-600 font-rubik hover:opacity-70"
                // onClick={loginModal.onOpen}
              >
                <Link to="/my-account">My Account</Link>
              </li>
              <li
                className="py-1 text-lg font-semibold cursor-pointer text-neutral-600 font-rubik hover:opacity-70"
                onClick={logoutMe}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="py-1 text-lg font-semibold cursor-pointer text-neutral-600 font-rubik hover:opacity-70"
                onClick={loginModal.onOpen}>
                Login
              </li>
              <li
                className="py-1 text-lg font-semibold cursor-pointer text-neutral-600 font-rubik hover:opacity-70"
                onClick={registerModal.onOpen}>
                Register
              </li>
            </>
          )}
        </ul>
        <div className="py-1 mt-4 mb-2 border-b select-none border-neutral-300 text-neutral-400">
          CATEGORIES
        </div>
        <ul className="text-neutral-700">{categoryList}</ul>
      </nav>
      <LoginModal />
      <RegisterModal />
    </div>
  );
};

export default Menu;
