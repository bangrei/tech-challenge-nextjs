import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product List",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-white h-full`}>
        <main className="flex min-h-screen flex-col bg-white w-full">
          <div className="flex-grow max-h-[100%] overflow-y-auto pb-40 md:pb-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
