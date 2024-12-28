import {ThemeToggle} from "@/components/layout/theme-toggle";
import {cn} from "@/lib/utils";
import {MobileSidebar} from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { MoonStar } from 'lucide-react';
import {UserNav} from "@/components/layout/user-nav";
import {signIn, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const {data: sessionData} = useSession();
  const path = usePathname()
  return (
    <div
      className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center">
        <div className={cn("block md:!hidden")}>
          <MobileSidebar/>
        </div>
          <button className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline transition-colors duration-300">
            Menu
          </button>
        </div>

        <Link
          href="/"
          className="flex justify-center items-center gap-2"
        >
          <MoonStar className="h-10 w-10"/>
        </Link>

        <div className="flex items-center gap-2">
          
          {/* <ThemeToggle/> */}

          {path.includes('login') || path.includes('register') ? (<></>): sessionData?.user ? (
            <UserNav user={sessionData.user}/>
          ) : (
            <Button 
                    className="justity-center items-center"
                    size="sm"
                    onClick={() => {
                      void signIn();
                    }}
            >
              Đăng nhập
            </Button>
          )}
        </div>

      </nav>
    </div>
  );
}
