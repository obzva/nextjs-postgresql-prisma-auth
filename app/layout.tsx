import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Make Auth!",
  description:
    "Building authentication process with Next.js, NextAuth, Postgresql, and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center items-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
