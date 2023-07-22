import React, { useCallback, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //Consume the own API to register USER
      await axios.post("/api/register", { email, password, userName, name });
      toast.success("Account created.");
      await signIn("credentials", {
        email,
        password,
        callbackUrl: process.env.NEXTAUTH_APP_URL,
      });
      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, userName, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e?.target?.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e?.target?.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="UserName"
        onChange={(e) => setuserName(e?.target?.value)}
        value={userName}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e?.target?.value)}
        value={password}
        disabled={isLoading}
      />{" "}
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create new account"
      actionLabel="Register"
      onClose={registerModal?.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};
