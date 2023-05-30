import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Spacer from "../components/helpers/Spacer";
import CustomModal from "../components/modals/CustomModal";
import useCustomModal from "../hooks/modals/useCustomModal";
import { toast } from "react-hot-toast";
import { logout } from "../features/auth/authSlice";

const menu = [
  {
    link: "details",
    text: "Account Details",
  },
  {
    link: "edit",
    text: "Edit Details",
  },
  {
    link: "change-password",
    text: "Change Password",
  },
  // {
  //   link: "settings",
  //   text: "Settings",
  // },
];

const MyAccountPage = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const customModal = useCustomModal();
  const navigate = useNavigate();

  const path = location.pathname.replace("/my-account/", "");

  const menuItems = menu.map((item, i) => (
    <Link key={i} to={item.link} className="">
      <div
        className={`${
          path === item.link
            ? "bg-neutral-200 pointer-events-none"
            : "hover:bg-neutral-100"
        } rounded-md px-4 py-2 my-2 font-semibold transition duration-150 ease-in`}>
        {item.text}
      </div>
    </Link>
  ));

  const logoutMe = () => {
    dispatch(logout()).then(() => {
      toast.success("You are successfully logged out.");
      customModal.onClose();
      navigate("/");
    });
  };

  return (
    <Container className="">
      <HeadTitle title="My Account" className="py-10 px-10" />

      <div className="flex flex-col md:flex-row justify-center m-2 p-2">
        <div className="md:w-1/3 w-full md:max-w-xs  p-4 drop-shadow-md border-2 md:border-r-0">
          {menuItems}
          <div
            className={`hover:bg-neutral-100
             rounded-md px-4 py-2 my-2 font-semibold transition duration-150 ease-in cursor-pointer`}
            onClick={customModal.onOpen}>
            Logout
          </div>
        </div>
        <div className="md:w-2/3 w-full p-4 bg-neutral-50 drop-shadow-md border-2 md:border-l-0">
          <Outlet />
        </div>
      </div>
      <CustomModal
        body="Are you sure you want to logout?"
        actionLabel="Logout"
        secondLabel="Cancel"
        onCancel={customModal.onClose}
        onSubmit={logoutMe}
      />
      <Spacer size={100} />
    </Container>
  );
};

export default MyAccountPage;
