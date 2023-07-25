"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import store from "@/store/store";
import { getToken } from "@/utils/helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
  description: "Auth layout of the app",
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
