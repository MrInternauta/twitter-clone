import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

// key={item.href}
// href={item.href}
// label={item.label}
// icon={item.icon}
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, onClick, auth, currentUser, loginModal]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center hover:bg-slate-500 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot
            className="text-sky-500 absolute -top-4 left-0"
            size={70}
          ></BsDot>
        ) : null}
      </div>
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-500 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />

        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot
            className="text-sky-500 absolute -top-4 left-0"
            size={70}
          ></BsDot>
        ) : null}
      </div>
    </div>
  );
};
