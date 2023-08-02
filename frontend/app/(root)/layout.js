"use client";
import "../globals.css";
import { Jost } from "next/font/google";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import store from "@/store/store";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
