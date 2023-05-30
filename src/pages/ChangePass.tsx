import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  changePassword,
  resetUserState,
  userState,
} from "../features/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  password: yup.string().required("Please enter old password"),
  newPassword: yup
    .string()
    .required("Please enter new password")
    .min(6, "Minimum 6 characters required")
    .max(50, "Too long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ChangePass = () => {
  const dispatch: any = useDispatch();
  const userState = useSelector<RootState, userState>((state) => state.user);

  const { updated, userLoading, userSuccess, userError, userMessage } =
    userState;

  useEffect(() => {
    if (!userLoading && userSuccess && updated) {
      toast.success("Password changed successfully!");
      dispatch(resetUserState());
    }
    if (!userLoading && userError) {
      toast.error(userMessage);
      dispatch(resetUserState());
    }
  }, [userLoading, updated, userError, userSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // formik.setSubmitting(true);
      const data = {
        password: values.password,
        newPassword: values.newPassword,
      };
      // console.log(values);
      dispatch(changePassword(data)).then(formik.setSubmitting(false));
    },
  });

  return (
    <div className="m-4">
      <h2 className="text-2xl text-start font-semibold pb-10 ">
        Change Password
      </h2>

      <div className="max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="password"
            id="current-password"
            autoComplete="on"
            label="Old Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            errors={formik.touched.password && formik.errors.password}
          />
          <CustomInput
            id="new-password"
            type="password"
            autoComplete="on"
            label="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange("newPassword")}
            errors={formik.touched.newPassword && formik.errors.newPassword}
          />
          <CustomInput
            id="confirm-password"
            autoComplete="on"
            type="password"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            errors={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <div className="">
            <CustomButton
              type="submit"
              title="Change Password"
              width={250}
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
