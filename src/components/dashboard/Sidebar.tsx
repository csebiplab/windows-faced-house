"use client";

import { LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { menuItems } from "./menuItems";

export default function Sidebar() {
  return (
    <aside
      className="max-h-screen w-60 p-5 bg-gray-100 border border-gray-200 
      rounded-lg sticky top-0 max-md:hidden flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold mb-6">Windows Faced House</h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 transition">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
