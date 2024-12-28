import { BadgeEuro, UserRound, BookUser, Moon, List} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Trang chủ",
    icon: Moon,
    href: "/dashboard",
    color: "text-white-500",
  },
  {
    title: "Quản lý chung cư",
    icon: List,
    href: "/manage",
    color: "text-white-500",
    isChildren: true,
    children: [
      {
        title: "Quản lý dân cư",
        icon: BookUser,
        color: "text-white-500",
        href: "/manage/residents",
      },
      {
        title: "Quản lý khoản thu",
        icon: BadgeEuro,
        color: "text-white-500",
        href: "/manage/fee",
      },
      {
        title: "Quản lý tài khoản",
        icon: UserRound,
        color: "text-white-500",
        href: "/manage/account",
      },
    ],
  },
];
