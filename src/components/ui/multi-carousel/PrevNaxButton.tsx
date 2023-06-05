import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  name: "prev" | "next";
  isDisabled: boolean;
  onClick: (e?: React.MouseEvent<HTMLDivElement>) => void;
};

const PrevNaxButton = ({ name, isDisabled, onClick }: Props) => {
  const icon = name === "prev" ? <FiChevronLeft /> : <FiChevronRight />;

  //   alice-carousel__next-btn
  //   alice-carousel__next-btn-wrapper
  //   alice-carousel__next-btn-item

  // isDisabled ? "__inactive" : ""

  return (
    <>
      <div className="alice-carousel__prev-btn">
        <div className="alice-carousel__prev-btn-wrapper">
          <div
            className={`alice-carousel__prev-btn-item ${isDisabled ? "" : ""}`}
            onClick={(e) => onClick(e)}>
            {icon}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrevNaxButton;
