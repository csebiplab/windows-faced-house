import ToastProvider from "@/components/ui/ToastProvider";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
