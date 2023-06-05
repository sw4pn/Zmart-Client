import { FormikErrors } from "formik";
import { FC } from "react";
interface Props {
  id: string;
  className?: string;
  label?: string;
  rows?: number;
  cols?: number;
  value?: string;
  onChange?: (event: any) => void;
  errors?:
    | FormikErrors<any>[]
    | FormikErrors<any>
    | string[]
    | string
    | false
    | undefined;
}

const CustomTextarea: FC<Props> = ({
  id,
  label,
  className = "",
  rows,
  cols,
  value,
  onChange,
  errors,
  ...rest
}) => {
  return (
    <>
      <div
        className={`relative w-full z-0 mb-8 max-w-xl custom-textarea ${className}`}>
        <textarea
          id={id}
          rows={rows}
          cols={cols}
          className={`p-2.5 block w-full bg-transparent border  appearance-none focus:outline-none focus:ring-0 focus:border-black  peer
          ${errors ? "border-rose-400" : "border-gray-300"}
        
           `}
          value={value}
          onChange={onChange}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`absolute duration-300 top-2 left-2 -z-1 origin-0 peer-focus:text-black peer-focus:left-0 peer-focus:transform peer-focus:scale-75 peer-focus:-translate-y-8 ${
            errors ? "text-rose-500" : "text-gray-500"
          }`}>
          {errors && "*"} {label}
        </label>
        {errors && <span className="text-sm text-rose-500">{errors}</span>}
      </div>
    </>
  );
};

export default CustomTextarea;
