import { IconType } from "react-icons";
import { FC } from "react";
import LoaderRing from "../loaders/LoaderRing";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  width?: number;
  style?: HTMLStyleElement;
  loading?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  className = "",
  width,
  style,
  loading = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition 
    px-4
    ${outline ? "bg-transparent" : "bg-zinc-800"}
    ${outline ? "border-zinc-800" : "border-zinc-800"}
    ${outline ? "border-zinc-800" : "text-white"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "py-1" : "py-2.5"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border-[1px]" : "border-2"} 
    ${!width && "w-full"} 
    ${Icon && "pl-10"}
    ${className} 
    `}
      style={{
        minWidth: width && `${width}px`,
      }}
      {...rest}>
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {loading ? <LoaderRing size={28} /> : <>{title}</>}
    </button>
  );
};

export default CustomButton;
