import { CommentFeed } from "@/components/CommentFeed";
import { Form } from "@/components/Form";
import Header from "@/components/Header";
import { PostItem } from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading } = usePost(postId as string);
  if (isLoading || !data) {
    return (
      <>
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80}></ClipLoader>
        </div>
      </>
    );
  }
  return (
    <>
      <Header label="Tweet" showBackArrow></Header>
      <PostItem data={data}></PostItem>
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      ></Form>
      <CommentFeed comments={data?.comments}></CommentFeed>
    </>
  );
};

export default PostView;
