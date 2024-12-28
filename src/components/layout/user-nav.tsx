"use client";

import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, BadgeEuro, UserRound, BookUser, Moon, List} from "lucide-react";
import { UserAvatar } from "@/components/layout/user-avatar";
import { useRouter } from 'next/navigation';

type Props = {
    user: Pick<User, "name" | "image" | "email">;
};



export function UserNav({ user }: Props) {
    
    const router = useRouter();
    return (
        <DropdownMenu>
            {/* hien thi avatar nguoi dung */}
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: user.name || null, image: user.image || null }}
                    className="h-8 w-8 cursor-pointer"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {/* hien thi user name va email cua nguoi dung */}
                <div className="flex items-center justify-center gap-4 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuItem asChild>
                    <Button
                        variant="outline"
                        className="w-full border-0"
                        onClick={() => {
                            window.location.href = '/dashboard';
                        }}
                    >

                        <Moon className=" mr-2 h-4 w-4" aria-hidden="true" />
                        Trang chủ
                    </Button>
                </DropdownMenuItem>
                
                <hr className="mt-[10px] mb-[10px]"></hr>

                <DropdownMenuItem asChild>

                    <Button
                        variant="outline"
                        className="w-full border-0"
                        onClick={() => {
                            window.location.href = '/manage/residents';
                        }}
                    >

                        <BookUser className="mr-2 h-4 w-4" aria-hidden="true" />
                        Quản lý dân cư

                    </Button>

                </DropdownMenuItem>

                <DropdownMenuItem asChild>

                    <Button
                        variant="outline"
                        className="w-full border-0"
                        onClick={() => {
                            window.location.href = '/manage/fee';
                        }}
                    >

                        <BadgeEuro className="mr-2 h-4 w-4" aria-hidden="true" />
                        Quản lý khoản thu

                    </Button>

                </DropdownMenuItem>

                <DropdownMenuItem asChild>

                    <Button
                        variant="outline"
                        className="w-full border-0"
                        onClick={() => {
                            window.location.href = '/manage/account';
                        }}
                    >

                        <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
                        Quản lý tài khoản

                    </Button>

                </DropdownMenuItem>

                <hr className="mt-[10px] mb-[10px]"></hr>

                <DropdownMenuItem asChild>

                    <Button
                        variant="outline"
                        className="w-full border-0"
                        onClick={() => {
                            void signOut();
                        }}
                    >

                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Đăng xuất

                    </Button>

                </DropdownMenuItem>

            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}