import { hash, verify } from "argon2";
import { loginSchema, changePasswordSchema, deleteUserSchema } from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Prisma } from "@prisma/client";
import { format } from "date-fns";

export const userRouter = createTRPCRouter({
    signup: publicProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input;

            const exists = await ctx.db.user.findFirst({
                where: { email },
            });

            if (exists) {
                throw new Error("Email này đã có người sử dụng!");
            }

            const hashedPassword = await hash(password);

            const userData: Prisma.UserCreateInput = {
                email,
                password: hashedPassword,
            };

            const result = await ctx.db.user.create({
                data: userData,
            });

            return {
                status: 201,
                message: "Đăng ký thành công!",
                result: result.email,
            };
        }),
    changePassword: publicProcedure
        .input(changePasswordSchema)
        .mutation(async ({ ctx, input }) => {
            const { currentPassword, newPassword } = input;
            console.log('ctx=')
            console.log(ctx.session)
            const userEmail = ctx.session?.user.email; // Giả sử bạn có session chứa userId -> use email instead of userID

            const user = await ctx.db.user.findUnique({
                where: { email: userEmail as string },
            });

            if (!user) {
                throw new Error("Người dùng không tồn tại!");
            }
            if (!user.password) {
                throw new Error("Mật khẩu hiện tại không đúng");
            }

            const isPasswordValid = await verify(user.password, currentPassword);
            if (!isPasswordValid) {
                throw new Error("Mật khẩu hiện tại không đúng!");
            }

            const hashedNewPassword = await hash(newPassword);

            await ctx.db.user.update({
                where: { email: userEmail as string },
                data: { password: hashedNewPassword },
            });

            return {
                status: 200,
                message: "Thay đổi mật khẩu thành công!",
            };
        }),
    deleteUser: publicProcedure
        .input(deleteUserSchema)
        .mutation(async ({ ctx, input }) => {
            const { currentPassword } = input;
            console.log('ctx=')
            console.log(ctx.session)
            const userEmail = ctx.session?.user.email; // Giả sử bạn có session chứa userId -> use email instead of userID

            const user = await ctx.db.user.findUnique({
                where: { email: userEmail as string },
            });

            if (!user) {
                throw new Error("Người dùng không tồn tại!");
            }
            if (!user.password) {
                throw new Error("Mật khẩu hiện tại không đúng");
            }

            const isPasswordValid = await verify(user.password, currentPassword);
            if (!isPasswordValid) {
                throw new Error("Mật khẩu hiện tại không đúng!");
            }


            await ctx.db.user.delete({
                where: { email: userEmail as string },
            });

            return {
                status: 200,
                message: "Xóa tài khoản thành công!",
            };
        }),
    // getAll: publicProcedure.query(async ({ ctx }) => {
    //   const users = await ctx.db.user.findMany({
    //     orderBy: {
    //       createAt: "desc",
    //     },
    //   });

    //   return users.map((user) => ({
    //     id: user.id,
    //     email: user.email,
    //     createAt: format(user.createAt, "dd/MM/yyyy"),
    //     updateAt: format(user.updateAt, "dd/MM/yyyy"),
    //   }));
    // }),
});
