import { Settings, User, Folder, Plus, LayoutDashboard } from "lucide-react";

export type MenuItem = {
  name: string;
  href?: string;
  icon: any;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  { name: "Profile", href: "/dashboard/profile/me", icon: User },
  {
    name: "Sections",
    icon: Folder,
    children: [
      {
        name: "Show Sections",
        href: "/dashboard/sections/show-sections",
        icon: LayoutDashboard,
      },
      // {
      //   name: "Add Section",
      //   href: "/dashboard/sections/add-section",
      //   icon: Plus,
      // },
    ],
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
