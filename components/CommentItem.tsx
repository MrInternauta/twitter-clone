import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { FC, useMemo } from "react";
import { useCallback } from "react";
import Avatar from "./Avatar";
interface CommentItemProps {
  data: Record<string, any>;
}
export const CommentItem: FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data?.user?.id}`);
    },
    [data?.user?.id, router]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
  border-b-[1px]
  border-neutral-800
  p-5
  cursor-pointer
  hover:bg-neutral-900
  transition
  "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user.id}></Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data?.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data?.user.userName}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt} {" ago"}
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};
