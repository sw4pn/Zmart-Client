import { useFormik } from "formik";
import HeadTitle from "./HeadTitle";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import CustomInput from "./ui/CustomInput";
import CustomButton from "./ui/CustomButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

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

const AccountRegister = () => {
  const [message, setMessage] = useState("");
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

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
      dispatch(registerUser(values))
        .then((res: any) => {
          const response = res.payload;
          setMessage(response.message);

          if (response.success && response.createdAt) {
            toast.success(response.message);
            navigate("/login?auth=success");
          } else {
            toast.error(response.message);
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <div className="px-10 py-4">
      <HeadTitle title="Register" className="text-center" />
      <div className="max-w-md p-10 mx-auto">
        {message && (
          <div className="block pb-4 mb-8 text-center text-red-400">
            {message}
          </div>
        )}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between gap-10">
            <CustomInput
              id="reg-first-name"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              errors={formik.touched.firstName && formik.errors.firstName}
            />
            <CustomInput
              id="reg-last-name"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              errors={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <CustomInput
            id="reg-email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            errors={formik.touched.email && formik.errors.email}
          />
          <CustomInput
            id="reg-password"
            type="password"
            label="Password"
            autoComplete="on"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            errors={formik.touched.password && formik.errors.password}
          />
          <CustomInput
            id="reg-confirm-password"
            label="Confirm Password"
            type="password"
            autoComplete="on"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            errors={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <div className="flex items-center justify-center">
            <CustomButton
              title="Register"
              width={300}
              className=""
              type="submit"
            />
          </div>
        </form>

        <div className="py-2 mt-4 font-light text-center text-neutral-500">
          <p>
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 cursor-pointer text-neutral-800 hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountRegister;
