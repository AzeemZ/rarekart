"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import store from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Root Layout",
  description: "Root layout of the app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
