import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SureSales | Store Management Platform",
  description: "Mobile-first POS and inventory management app for small businesses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <ThemeModeScript mode="dark" />
      </head>
      <body className={`${inter.className} dark:bg-gray-900`}>{children}</body>
    </html>
  );
}
