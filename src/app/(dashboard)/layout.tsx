import { ReactNode } from "react";
// @ts-ignore: allow importing global CSS without explicit type declarations
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import ToastProvider from "@/components/ui/ToastProvider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row p-3 gap-3 h-full">
          <Sidebar />
          <main className="flex-1 bg-gray-50 border border-gray-200 rounded-lg h-full overflow-auto p-5">
            {children}
          </main>
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
