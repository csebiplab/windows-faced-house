"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuItem } from "./menuItems";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SidebarItem({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isOpen && (
          <div className="ml-6 mt-1 flex flex-col gap-1">
            {item.children.map((child) => (
              <SidebarItem key={child.name} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
    >
      <item.icon className="w-5 h-5" />
      <span>{item.name}</span>
    </Link>
  );
}
