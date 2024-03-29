// This file is the layout for the entire app. It wraps the entire app in a Provider component. The Provider component is a custom component that I created. It's used to provide the user's session to the entire app.

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jrog603's Netflix Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {
        // The Provider component is a custom component that I created. It's used to provide the user's session to the entire app.
      }
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
