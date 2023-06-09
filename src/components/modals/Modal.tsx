import { FC, useCallback, useEffect, useState } from "react";

import CustomButton from "../ui/CustomButton";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  loading?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  type = "button",
  onClose,
  onSubmit,
  title,
  body,
  footer,
  secondaryAction,
  actionLabel,
  secondaryActionLabel,
  disabled,
  loading,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-neutral-800/70">
      <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
        {/*content*/}
        <div
          className={`h-full translate duration-300 ${
            showModal ? "translate-y-0" : "translate-y-full"
          } ${showModal ? "opacity-100" : "opacity-0"}`}>
          <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
            {/* header */}
            <div
              className="flex  items-center  p-6 rounded-t
                justify-center
                relative
                border-b-[1px]">
              <button
                className="absolute p-1 transition border-0 hover:opacity-70 right-9"
                onClick={handleClose}>
                <IoMdClose size={24} />
              </button>

              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* Body */}
            <div className="relative flex-auto p-6">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center w-full gap-4 ">
                {secondaryAction && secondaryActionLabel && (
                  <CustomButton
                    disabled={disabled}
                    title={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <CustomButton
                  type={type}
                  loading={loading}
                  disabled={disabled}
                  title={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
