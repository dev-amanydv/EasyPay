import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Toaster position="top-center" reverseOrder={true} />
          <div className="min-w-screen min-h-screen bg-gray-100">
            <AppbarClient />
            <div className="mt-[57px]">
            {children}
            </div>
            
          </div>
        </body>
      </Providers>
    </html>
  );
}
