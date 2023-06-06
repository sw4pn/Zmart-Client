import useCustomModal from "../../hooks/modals/useCustomModal";
import Modal from "./Modal";
import { FC, ReactNode } from "react";

interface Props {
  title?: string;
  body: ReactNode;
  footer?: ReactNode;
  actionLabel: string;
  secondLabel: string;
  onSubmit: () => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const CustomModal: FC<Props> = ({
  title,
  body,
  footer,
  actionLabel,
  secondLabel,
  onSubmit,
  onCancel,
  loading = false,
  disabled = false,
}) => {
  const customModal = useCustomModal();

  const bodyContent = <div className="p-4">{body}</div>;
  const footerContent = footer ? <div>{footer}</div> : <></>;

  return (
    <Modal
      loading={loading}
      disabled={disabled}
      title={title}
      actionLabel={actionLabel}
      secondaryActionLabel={secondLabel}
      secondaryAction={onCancel}
      onSubmit={onSubmit}
      isOpen={customModal.isOpen}
      onClose={customModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default CustomModal;
