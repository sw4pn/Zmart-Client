import { useFormik } from "formik";
import HeadTitle from "./HeadTitle";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuthenticated } from "../features/auth/authSlice";
import CustomInput from "./ui/CustomInput";
import { useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CustomButton from "./ui/CustomButton";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email id"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Too short!")
    .max(50, "Too long!"),
});

const AccountLogin = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const nextLocation = location.state
    ? location.state !== "/register"
      ? location.state
      : "/"
    : "/";

  const isLoggedIn = useSelector(selectIsAuthenticated);

  const auth = searchParams.get("auth");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "demo@example.com",
      password: "12341234",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(loginUser(values))
        .then((res: any) => {
          const response = res.payload;

          setMessage(response.message);
          if (response.success && response.token) {
            toast.success(response.message);
            navigate(nextLocation);
          } else {
            toast.error(response.message);
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  if (isLoggedIn) {
    return <Navigate to={nextLocation} />;
  }

  return (
    <>
      <div className="px-10 py-4">
        <HeadTitle title="Login" className="text-center" />
        <div className="max-w-md p-10 mx-auto">
          {auth === "success" && (
            <div className="max-w-sm p-2 mx-auto my-2 mb-10 text-center border border-orange-400">
              Registration Successful!
              <br />
              Please Login below with your credentials.
            </div>
          )}
          {auth === "0" ? (
            <div className="max-w-sm p-2 mx-auto my-2 mb-10 text-center border border-red-400">
              You are not authorized!
              <br />
              Please Login or Register to continue.
            </div>
          ) : (
            <h2 className="text-lg">Welcome back </h2>
          )}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <div className="mb-8">
              <p className="text-gray-400">Login to your account!</p>
              {message && (
                <div className="py-1 text-center text-red-400">{message}</div>
              )}
            </div>
            <CustomInput
              id="login-email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              errors={formik.touched.email && formik.errors.email}
            />
            <CustomInput
              id="login-password"
              label="Password"
              type="password"
              autoComplete="on"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              errors={formik.touched.password && formik.errors.password}
            />
          </form>

          <div className="flex items-center justify-center">
            <CustomButton
              title="Login"
              width={300}
              className=""
              type="submit"
              onClick={() => formik.handleSubmit()}
            />
          </div>

          <div className="flex flex-col gap-4 py-2">
            {/* <CustomButton
              outline
              title="Continue with Google"
              icon={FcGoogle}
              className="hover:bg-neutral-100"
              onClick={() => console.log("google")}
            />
            <CustomButton
              outline
              title="Continue with Github"
              icon={AiFillGithub}
              className="hover:bg-neutral-100"
              onClick={() => console.log("github")}
            /> */}
          </div>
          <div className="mt-4 font-light text-center text-neutral-500">
            <p>
              First time using ZMart?
              <span
                onClick={() => navigate("/register")}
                className="ml-2 cursor-pointer text-neutral-800 hover:underline">
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLogin;
