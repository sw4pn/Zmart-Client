import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import HeadTitle from "../components/HeadTitle";
import ShortTitle from "../components/ShortTitle";
import Container from "../components/layouts/Container";
import CustomInput from "../components/ui/CustomInput";
import CustomTextarea from "../components/ui/CustomTextarea";
import { HiPhone } from "react-icons/hi";
import { BiBriefcase } from "react-icons/bi";
import CustomButton from "../components/ui/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { apiUrl } from "../config/config";
import { config } from "../utils/axiosConfig";
import { useState } from "react";
import { toast } from "react-hot-toast";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Required").min(2, "Too Short!"),
  email: yup.string().required("Required").email("Invalid email id"),
  message: yup
    .string()
    .required("Required")
    .min(5, "Too short message!")
    .max(500, "Too long message,Only 500 char. allowed."),
});

// interface ContactFormValues {
//   name: string;
//   email: string;
//   message: string;
// }

const ContactPage = () => {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: (values) => {
      sendMail(values);
    },
  });

  const sendMail = async (values: any) => {
    await axios
      .post(`${apiUrl}auth/send-mail`, values, config)
      .then((res) => {
        console.log(res);
        toast.success("Message sent successfully.");
        setMessage(res.data.message);
        formik.resetForm();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        const msg = err?.response?.data?.message || err.message;
        setMessage(msg);
        toast.error("Failed. Message Not Sent.");
      })
      .finally(() => {
        formik.setSubmitting(false);
      });
  };

  return (
    <Container className="p-4 sm:p-10">
      <HeadTitle title="Contact Us" className="pt-4 pb-10" />
      <div className="p-2 sm:p-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31958.42458229782!2d72.83272850814258!3d19.081658714470073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c904d1f59003%3A0x3fed21d7128f1fd4!2sKhar%2C%20Khar%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1674131798040!5m2!1sen!2sin"
          className="w-full mx-auto border shadow-md"
          //   width="1024"
          height="400"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-4 lg:p-4">
        <div className="flex-1 w-full max-w-lg p-8 border rounded-md shadow-sm border-neutral-400 sm:w-2/3">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 ">
            <CustomInput
              id="contactName"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              errors={formik.touched.name && formik.errors.name}
            />
            <CustomInput
              id="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              errors={formik.touched.email && formik.errors.email}
            />
            <CustomTextarea
              id="contactMessage"
              label="Message"
              className="py-2"
              rows={6}
              // cols={5}
              value={formik.values.message}
              onChange={formik.handleChange("message")}
              errors={formik.touched.message && formik.errors.message}
            />

            <CustomButton
              title="Send Message"
              type="submit"
              onClick={formik.handleSubmit}
              className="self-end"
              width={200}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            />

            {message && (
              <div className="text-sm text-gray-400"> * {message}</div>
            )}
          </form>
        </div>
        <div className="flex-1 w-full p-4 sm:w-2/3">
          <ShortTitle title="Get In Touch With US" className="mb-4" />

          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-4">
              <AiOutlineHome size={20} />
              33, New Road, <br />
              Fake St. Mumbai East, <br /> Maharashtra, India. 411 001
            </span>
            <span className="flex items-center gap-4">
              <HiPhone size={20} /> (+019)1-192-1933
            </span>
            <span className="flex items-center gap-4">
              <AiOutlineMail size={20} /> email@example.com
            </span>
            <span className="flex items-center gap-4">
              <BiBriefcase size={20} /> Monday-Friday 10AM-9PM
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
