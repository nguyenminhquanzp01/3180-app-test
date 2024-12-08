import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user-example";
import { residentRouter } from "@/server/api/routers/resident";
import {feeRouter} from "@/server/api/routers/fee";
import {apartmentRouter} from "@/server/api/routers/apartment";
import {addressRouter} from "@/server/api/routers/address";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  resident: residentRouter,
  fee: feeRouter,
  apartment: apartmentRouter,
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
