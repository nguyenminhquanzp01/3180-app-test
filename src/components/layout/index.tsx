'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname()

  const showSidebar = !["/", "/login", "/register"].includes(pathName);

  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1 ${showSidebar ? '' : 'w-full'}`}>
          {children}
        </main>
      </div>
    </>
  );
};
