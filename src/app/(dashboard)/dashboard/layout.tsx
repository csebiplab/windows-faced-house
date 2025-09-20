import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import "../../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-row p-3 gap-3 h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-50 border border-gray-200 rounded-lg max-h-screen overflow-auto pb-5">
            {children}
          </main>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
