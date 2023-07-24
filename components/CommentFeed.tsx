import React, { FC } from "react";
import { CommentItem } from "./CommentItem";
interface CommentFeedInter {
  comments?: Record<string, any>[];
}
export const CommentFeed: FC<CommentFeedInter> = ({ comments = [] }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment}></CommentItem>
      ))}
    </>
  );
};
