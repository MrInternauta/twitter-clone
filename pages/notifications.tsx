import { CommentFeed } from "@/components/CommentFeed";
import { Form } from "@/components/Form";
import Header from "@/components/Header";
import { PostItem } from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";
import { getSession } from "next-auth/react";
import { NotificationFeed } from "@/components/NotificationFeed";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow></Header>
      <NotificationFeed></NotificationFeed>
    </>
  );
};

export default Notifications;
