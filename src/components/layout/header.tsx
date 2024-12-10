import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { CloudMoon } from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
    const { data: sessionData, status } = useSession();
    function showUserNav() {
        if (path.includes('login') || path.includes('register') || status == 'loading')
            return <></>
        else if (sessionData) {
            return (
                <UserNav user={sessionData.user} />
            )
        }
        else return (
            <Button size="sm"
                onClick={() => {
                    void signIn();
                }}
            >
                Đăng nhập
            </Button>
        )
    }
    //   const session = getSess
    const path = usePathname()
    return (
        <div
            className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <Link
                    href={sessionData ? "/dashboard" : "/"}
                    className="hidden items-center justify-between gap-2 md:flex"
                >
                    <CloudMoon className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">BlueMoon</h1>
                </Link>
                <div className={cn("block md:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {showUserNav()}
                </div>
            </nav>
        </div>
    );
}