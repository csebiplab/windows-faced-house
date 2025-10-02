"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  href?: string;
};

export default function PageHeader({ title, href }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      {href && (
        <Link href={href} title="Add New Section">
          <Plus className="w-8 h-8 cursor-pointer text-primary" />
        </Link>
      )}
    </div>
  );
}
