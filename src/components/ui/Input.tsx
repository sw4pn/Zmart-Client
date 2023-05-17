import { FC } from "react";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  //   register: UseFormRegister<FieldValues>;
  //   errors: FieldErrors;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  //   register,
  required,
  //   errors,
}) => {
  return (
    <>
      <input
        id={id}
        disabled={disabled}
        type={type}
        placeholder=" "
        //   className={`$className`}
      />
      <label className="">{label}</label>
    </>
  );
};
