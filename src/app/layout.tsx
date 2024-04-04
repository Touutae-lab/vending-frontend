import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vending Venture",
  description: "Vending  Machine Application for your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full content" lang="en">
      <body className={"h-full content"}>{children}</body>
    </html>
  );
}
