import { useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
import useLoginModal from "../../hooks/modals/useLoginModal";
import useRegisterModal from "../../hooks/modals/useRegisterModal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import { AuthState, loginUser } from "../../features/auth/authSlice";
import { RootState } from "../../app/store";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email id"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Too short!")
    .max(50, "Too long!"),
});

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const dispatch = useDispatch<any>();

  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const {
    user,
    isAuthenticated,
    authSuccess,
    authError,
    authMessage,
    authLoading,
  } = authState;

  useEffect(() => {
    if (!authLoading && authSuccess && user) {
      toast.success(authMessage);
      //TODO: handle login route
    }
    if (!authLoading && authError) {
      toast.error(authMessage);
    }
    formik.setSubmitting(false);
  }, [authLoading, authSuccess, authError, user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <div className="mb-8">
          <h2 className="text-lg">Welcome back </h2>
          <p className="text-gray-400">Login to your account!</p>
          {authMessage && (
            <div className="py-1 text-center text-neutral-400">
              {authMessage}
            </div>
          )}
        </div>
        <CustomInput
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          errors={formik.touched.email && formik.errors.email}
        />
        <CustomInput
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          errors={formik.touched.password && formik.errors.password}
        />
      </form>
    </>
  );

  const footerContent = (
    <>
      <CustomButton
        outline
        title="Continue with Google"
        icon={FcGoogle}
        onClick={() => console.log("google")}
      />
      <CustomButton
        outline
        title="Continue with Github"
        icon={AiFillGithub}
        onClick={() => console.log("github")}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <p>
          First time using ZMart?
          <span
            onClick={onToggle}
            className="ml-2 cursor-pointer text-neutral-800 hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      loading={formik.isSubmitting}
      disabled={formik.isSubmitting}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
