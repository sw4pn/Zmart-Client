import { useCallback, useEffect } from "react";
import useLoginModal from "../../hooks/modals/useLoginModal";
import useRegisterModal from "../../hooks/modals/useRegisterModal";
import Modal from "./Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import CustomButton from "../ui/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userState } from "../../features/user/userSlice";
import { RootState } from "../../app/store";
import { toast } from "react-hot-toast";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .min(2, "Too short!")
    .max(30, "Max 30 char. allowed!"),
  lastName: yup
    .string()
    .required("Required")
    .min(2, "Too short!")
    .max(30, "Max 30 char. allowed!"),
  email: yup.string().required("Required").email("Invalid email id"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Too short!")
    .max(50, "Too long!"),
  confirmPassword: yup
    .string()
    .required("Required")
    .min(6, "Too short!")
    .oneOf([yup.ref("password")], "Password does not match!"),
});

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const dispatch = useDispatch<any>();

  const userState = useSelector<RootState, userState>((state) => state.user);

  const { userLoading, userSuccess, userError, userMessage } = userState;

  useEffect(() => {
    if (!userLoading && userSuccess) {
      toast.success(userMessage);
      formik.resetForm();
      onToggle();
    }
    if (!userLoading && userError) {
      toast.error(userMessage);
    }
    formik.setSubmitting(false);
  }, [userLoading, userError, userSuccess, userMessage]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
      <div
        className="flex flex-col gap-2"
        //   onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-between items-center gap-10">
          <CustomInput
            id="first-name"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            errors={formik.touched.firstName && formik.errors.firstName}
          />
          <CustomInput
            id="last-name"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            errors={formik.touched.lastName && formik.errors.lastName}
          />
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
        <CustomInput
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmPassword")}
          errors={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
      </div>
    </>
  );

  const footerContent = (
    <>
      <div className="mt-4 font-light text-center text-neutral-500">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="cursor-pointer text-neutral-800 hover:underline ml-2">
            Login
          </span>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      loading={formik.isSubmitting}
      disabled={formik.isSubmitting}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={formik.handleSubmit}
      type="submit"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
