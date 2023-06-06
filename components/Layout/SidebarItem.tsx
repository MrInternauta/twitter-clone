import React from "react";
import { IconType } from "react-icons";

// key={item.href}
// href={item.href}
// label={item.label}
// icon={item.icon}
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="flex flex-row items-center" onClick={onClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center hover:bg-slate-500 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-500 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};
