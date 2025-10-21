import ToastProvider from "@/components/ui/ToastProvider";
import React from "react";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
