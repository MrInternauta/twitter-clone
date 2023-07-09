import { Layout } from "@/components";
import { LoginModal } from "@/components/modals/LoginModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RegisterModal } from "../components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import UpdateModal from "@/components/modals/UpdateModal";
export default function App({ Component, pageProps }: AppProps) {
  return (
    //Wrap the app with session provider (check if the session already exists)
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <UpdateModal/>
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
