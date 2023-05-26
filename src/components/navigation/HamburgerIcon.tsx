import { FC } from "react";
interface Props {
  width?: number;
  height?: number;
  color?: string;
  lineSize?: number;
  open?: boolean;
  toggle?: () => void;
}

const HamburgerIcon: FC<Props> = ({
  width = 36,
  height = 25,
  lineSize = 5,
  open,
  toggle,
}) => {
  const thirdStart = height - lineSize;
  const secondStart = Math.floor(thirdStart / 2);

  const clx = `absolute block duration-300 ease-in-out transform rotate-0 rounded-[9px] opacity-100 ${
    open ? "bg-zinc-800" : "bg-gray-200"
  }`;

  return (
    <div
      className="relative  mx-auto my-[20px] duration-500 ease-in-out transform cursor-pointer rotate-0 z-40"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={toggle}>
      <span
        className={`${clx}  ${open ? "w-0 left-1/2" : "left-0 w-full"}`}
        style={{
          top: open ? `${secondStart}px` : `0`,
          height: lineSize,
        }}></span>
      <span
        className={`${clx} w-full left-0 ${open ? "rotate-45" : ""} `}
        style={{
          top: `${secondStart}px`,
          height: lineSize,
        }}></span>
      <span
        className={`${clx} w-full left-0  ${open ? "!-rotate-45" : ""} `}
        style={{
          top: `${secondStart}px`,
          height: lineSize,
        }}></span>
      <span
        className={`${clx} ${open ? " w-0 left-1/2" : "left-0 w-full "} `}
        style={{
          top: open ? `${secondStart}px` : `${thirdStart}px`,
          height: lineSize,
        }}></span>
    </div>
  );
};

export default HamburgerIcon;
