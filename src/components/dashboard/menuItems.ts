import {
  Settings,
  User,
  Folder,
  Plus,
  LayoutDashboard,
  DoorOpen,
} from "lucide-react";

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
      {
        name: "Add Section",
        href: "/dashboard/sections/add-section",
        icon: Plus,
      },
    ],
  },
  {
    name: "Products",
    icon: Folder,
    children: [
      {
        name: "Show Products",
        href: "/dashboard/products/show-products",
        icon: DoorOpen,
      },
      {
        name: "Add Products",
        href: "/dashboard/products/add-products",
        icon: Plus,
      },
    ],
  },
  {
    name: "Services",
    icon: Folder,
    children: [
      {
        name: "Show Services",
        href: "/dashboard/services/show-services",
        icon: DoorOpen,
      },
      {
        name: "Add Services",
        href: "/dashboard/services/add-services",
        icon: Plus,
      },
    ],
  },
  {
    name: "Install Process",
    icon: Folder,
    children: [
      {
        name: "Show",
        href: "/dashboard/window-installation-process/show",
        icon: DoorOpen,
      },
      {
        name: "Add",
        href: "/dashboard/window-installation-process/add",
        icon: Plus,
      },
    ],
  },
  {
    name: "Window Products",
    icon: Folder,
    children: [
      {
        name: "Show",
        href: "/dashboard/window-products/show",
        icon: DoorOpen,
      },
      {
        name: "Add",
        href: "/dashboard/window-products/add",
        icon: Plus,
      },
    ],
  },
  {
    name: "Cards",
    icon: Folder,
    children: [
      {
        name: "Show",
        href: "/dashboard/cards/show",
        icon: DoorOpen,
      },
      {
        name: "Add",
        href: "/dashboard/cards/add",
        icon: Plus,
      },
    ],
  },
  {
    name: "Our Works",
    icon: Folder,
    children: [
      {
        name: "Show",
        href: "/dashboard/our-works/show",
        icon: DoorOpen,
      },
      {
        name: "Add",
        href: "/dashboard/our-works/add",
        icon: Plus,
      },
    ],
  },
  {
    name: "Melke Profile",
    icon: Folder,
    children: [
      {
        name: "Show",
        href: "/dashboard/melke-profile/show",
        icon: DoorOpen,
      },
      {
        name: "Add",
        href: "/dashboard/melke-profile/add",
        icon: Plus,
      },
    ],
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
