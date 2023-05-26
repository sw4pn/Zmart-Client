import { FC, HTMLInputTypeAttribute } from "react";
import { FormikErrors } from "formik/dist/types";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: any) => void;
  //   register: UseFormRegister<FieldValues>;
  errors?: string | false | undefined;
}

const CustomInput: FC<Props> = ({
  label,
  id,
  type = "text",
  className = "",
  errors,
  ...rest
}) => {
  return (
    <div
      className={`relative w-full z-0 mb-8 max-w-xl custom-input ${className}`}>
      <input
        {...rest}
        id={id}
        type={type}
        placeholder=" "
        className={`block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-black peer
        ${errors ? "border-rose-400" : "border-gray-200"}
        `}
      />
      <label
        htmlFor={id}
        className={`absolute  duration-300 top-1 -z-1 origin-0 peer-focus:text-black peer-focus:left-0 peer-focus:transform peer-focus:scale-75 peer-focus:-translate-y-6      
        ${errors ? "text-rose-500" : "text-gray-500"}
        `}>
        {errors && "*"}
        {label}
      </label>
      {errors && <span className="text-sm text-rose-500">{errors}</span>}
    </div>
  );
};

export default CustomInput;
/* input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  @apply transform;
  @apply scale-75;
  @apply -translate-y-6;
}

input:focus ~ label {
  @apply text-black;
  @apply left-0;
} */
