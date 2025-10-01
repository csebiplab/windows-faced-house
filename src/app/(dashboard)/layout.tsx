import { ReactNode } from "react";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import ToastProvider from "@/components/ui/ToastProvider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-row p-3 gap-3 h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 border border-gray-200 rounded-lg max-h-screen overflow-auto p-5">
        {children}
      </main>
      <ToastProvider />
    </div>
  );
}
