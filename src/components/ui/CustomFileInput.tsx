import { FC } from "react";
interface Props {
  id: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  className?: string;
  value?: string;
  autoComplete?: string;
  onChange?: (event: any) => void;
  //   register: UseFormRegister<FieldValues>;
  errors?: string | false | undefined;
}

const CustomFileInput: FC<Props> = ({
  label,
  id,
  type = "file",
  className = "",
  errors,
  disabled,
  ...rest
}) => {
  return (
    <div className={`relative w-full z-0  max-w-xl custom-input  ${className}`}>
      <input
        id={id}
        type={type}
        {...rest}
        placeholder="Drag and drop file here..."
        className={`block w-full px-2 pt-3 pb-2 bg-neutral-200 border-dashed border-2  appearance-none focus:outline-none focus:ring-0 focus:border-black peer cursor-pointer
        ${errors ? "border-rose-400" : "border-gray-200"}
        `}
      />
      {errors && <span className="text-sm text-rose-500">{errors}</span>}
    </div>
  );
};

export default CustomFileInput;
