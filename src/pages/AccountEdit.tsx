import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { loadUser, selectAuthUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";
import CustomTextarea from "../components/ui/CustomTextarea";
import {
  resetUserState,
  updateAUser,
  userState,
} from "../features/user/userSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { RootState } from "../app/store";

import CustomFileInput from "../components/ui/CustomFileInput";
import { apiUrl } from "../config/config";
import axios from "axios";
import { config, fileConfig } from "../utils/axiosConfig";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "Minimum 3 characters required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Minimum 3 characters required"),
  address: yup.string().min(5, "Minimum 5 characters required"),
});

const AccountEdit = () => {
  const dispatch: any = useDispatch();

  const user = useSelector(selectAuthUser);

  const thumb = user?.avatar?.url
    ? user.avatar.url
    : "/images/user-profile.png";

  const userState = useSelector<RootState, userState>((state) => state.user);

  const { userSuccess, userLoading, userError, userMessage, updated } =
    userState;

  useEffect(() => {
    if (!userLoading && userSuccess && updated) {
      toast.success("User updated successfully.");
    }
    if (!userLoading && userError) {
      toast.error(userMessage);
    }
    dispatch(resetUserState());
    dispatch(loadUser());
  }, [updated, userLoading, userError, userSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      picture: {
        public_id: user?.avatar?.public_id ? user.avatar.public_id : "",
        url: user?.avatar?.url ? user.avatar.url : "/images/user-profile.png",
      },
      country: user?.address?.country || "",
      state: user?.address?.state || "",
      city: user?.address?.city || "",
      postCode: user?.address?.postCode || "",
      address: user?.address?.address || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        id: user?._id,
        firstName: values.firstName,
        lastName: values.lastName,
        // email: values.email,
        avatar:
          values.picture instanceof File
            ? {
                public_id: "",
                url: "/images/user-profile.png",
              }
            : values.picture,
        address: {
          country: values.country,
          state: values.state,
          city: values.city,
          postCode: values.postCode,
          address: values.address,
        },
      };

      if (values.picture instanceof File) {
        const uploadPic = async (file: File) => {
          const formData = new FormData();
          formData.append("images", file);

          try {
            const response = await axios.post(
              `${apiUrl}uploads/avatar`,
              formData,
              fileConfig
            );

            if (response.status === 200) {
              const resData = {
                public_id: response.data.public_id,
                url: response.data.url,
              };
              data.avatar = { ...resData };
              return Promise.resolve(response.data.message);
            } else {
              return Promise.reject(response.data.message);
            }
          } catch (err: any) {
            const message = err?.response.data?.message
              ? err?.response.data?.message
              : err.message;

            return Promise.reject(message);
          }
        };

        toast
          .promise(uploadPic(values.picture), {
            loading: "Uploading Profile picture...",
            success: (msg: string) => <b>{msg}</b>,
            error: (msg) => <b>{msg}</b>,
          })
          .then(() => {
            dispatch(updateAUser(data)).then(formik.setSubmitting(false));
            formik.setSubmitting(false);
          });
      } else {
        dispatch(updateAUser(data)).then(formik.setSubmitting(false));
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="m-4">
      <h2 className="text-2xl text-start font-semibold ">Edit Details</h2>

      <div className="max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">Upload Picture:</div>
          <div className="flex justify-start items-center pt-4 pb-10">
            {thumb && (
              <img
                src={thumb}
                width={80}
                height={80}
                className="p-2 rounded-lg"
              />
            )}

            <CustomFileInput
              id="edit-file"
              onChange={(event) => {
                formik.setFieldValue("picture", event.currentTarget.files[0]);
              }}
              type="file"
            />
          </div>
          <div className="flex justify-start items-center gap-4">
            <CustomInput
              id="edit-firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              errors={formik.touched.firstName && formik.errors.firstName}
            />
            <CustomInput
              id="edit-lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              errors={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <CustomInput
            id="edit-email"
            label="Email Id"
            disabled
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            errors={formik.touched.email && formik.errors.email}
          />
          <CustomInput
            id="edit-country"
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange("country")}
            errors={formik.touched.country && formik.errors.country}
          />
          <CustomInput
            id="edit-state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange("state")}
            errors={formik.touched.state && formik.errors.state}
          />
          <CustomInput
            id="edit-city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange("city")}
            errors={formik.touched.city && formik.errors.city}
          />
          <CustomInput
            id="edit-postCode"
            type="number"
            label="Post Code"
            value={formik.values.postCode}
            onChange={formik.handleChange("postCode")}
            errors={formik.touched.postCode && formik.errors.postCode}
          />
          <CustomTextarea
            label="Address"
            id="edit-address"
            value={formik.values.address}
            onChange={formik.handleChange("address")}
            errors={formik.touched.address && formik.errors.address}
          />
          <div className="">
            <CustomButton
              type="submit"
              title="Edit Details"
              width={250}
              loading={formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountEdit;
