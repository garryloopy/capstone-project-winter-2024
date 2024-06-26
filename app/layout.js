import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "../components/Providers";
import toast, { Toaster } from "react-hot-toast";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Miggy's Munchies ",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Analytics />
          <Toaster />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
