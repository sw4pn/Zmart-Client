import { FC } from "react";
interface Props {
  img: string;
  title: string;
  info: string;
}

const Feature: FC<Props> = ({ img, title, info }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-6 h-6">
        <img
          className="w-full h-full bg-cover"
          src={`/images/${img}`}
          alt="*"
        />
      </div>
      <div className="ml-4 mb-2 flex-1">
        <h1 className="font-extrabold text-gray-700 text-sm">{title}</h1>
        <div className="text-xs text-gray-600 text-opacity-70 ">{info}</div>
      </div>
    </div>
  );
};

export default Feature;
