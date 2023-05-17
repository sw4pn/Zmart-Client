import { useState, useCallback } from "react";
import Modal from "./Modal";
import useLoginModal from "../../hooks/modals/useLoginModal";
import useRegisterModal from "../../hooks/modals/useRegisterModal";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    //
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
      <div className="flex flex-col">
        <h2>Welcome back </h2>
        <h3>Login to your account!</h3>
      </div>
    </>
  );

  const footerContent = (
    <>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        // onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        // onClick={() => signIn("github")}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="cursor-pointer text-neutral-800 hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
