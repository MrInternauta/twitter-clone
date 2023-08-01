import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

export const NotificationFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: notifications = [] } = useNotifications(currentUser?.id);
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);
  if (!notifications?.length) {
    return (
      <>
        <div className="text-neutral-600 text-center p-6 text-xl">
          No Notifications
        </div>
      </>
    );
  }
  return (
    <div className=" flex flex-col">
      {notifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32}></BsTwitter>
          <p className="text-white">{notification?.body}</p>
        </div>
      ))}
    </div>
  );
};