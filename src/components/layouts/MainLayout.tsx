import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadUser } from "../../features/auth/authSlice";

const MainLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(loadUser()).unwrap();
      } catch (error) {
        // setServerActive(false);
      }
    };
    if (isAuthenticated) {
      fetchUser();
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
