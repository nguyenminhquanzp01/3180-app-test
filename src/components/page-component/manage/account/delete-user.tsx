'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { deleteUserSchema, type DeleteUserValue } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DeleteUser() {
    const router = useRouter()
    const toastMessage = 'Xóa tài khoản thành công';
    const form = useForm<DeleteUserValue>({
        resolver: zodResolver(deleteUserSchema),
        defaultValues: {
            currentPassword: "",
        },
    });
    const { mutate: deleteUser } = api.user.deleteUser.useMutation({
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            toast.success(toastMessage);
            signOut();
            router.push(`/dashboard`);
        },
    });
    function handleDeleteUser(password: DeleteUserValue) {
        deleteUser({ ...password })
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="ml-auto text-white bg-red-400 hover:bg-red-600" type="submit" variant={'outline'}>
                        Xóa tài khoản
                    </Button>
                </DialogTrigger>
                <DialogPortal>
                    <DialogContent>
                        <DialogTitle>Xác nhận xóa tài khoản?</DialogTitle>
                        <DialogDescription>
                            Hành động này không thể khôi phục<br></br>
                            Nếu chắc chắn hãy nhập mật khẩu
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit={(e) => {
                                void form.handleSubmit(handleDeleteUser)(e)
                            }}
                                className="w-full space-y-8">
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu hiện tại:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Nhập mật khẩu đang được sử dụng."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="ml-auto text-white bg-red-400 hover:bg-red-600" type="submit" variant={'outline'}>
                                    Xóa tài khoản
                                </Button>
                            </form>
                        </Form>
                        <DialogClose />
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    )
}
