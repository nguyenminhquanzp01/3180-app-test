import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
// import { contextProps } from "@trpc/react-query/shared";
// import { useSearchParams } from "next/navigation";

export const userRouter = createTRPCRouter({
    getAllUser: protectedProcedure.query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany();
        return users
    })
})