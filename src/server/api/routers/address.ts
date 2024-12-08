import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import {addressSchema} from "@/lib/validators";

export const addressRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.address.findUnique({
      where: { id: input.id },
      include: {
        apartment: true,
        dateRanges: true,
      },
    });
  }),

  create: publicProcedure.input(addressSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.address.create({
      data: {
        apartmentNo: input.apartmentNo,
        permanentAddress: input.permanentAddress,
        currentAddress: input.currentAddress,
        isStaying: input.isStaying,
        dateRanges: input.startDate && input.endDate ? {
          create: [
            {
              startDate: input.startDate,
              endDate: input.endDate,
              type: 'someType', // Adjust the type as needed or add it to the input
            },
          ],
        } : undefined,
      },
    });
  }),

  update: publicProcedure.input(addressSchema).mutation(async ({ ctx, input }) => {
    if (!input.id) {
      throw new Error("ID is required for update");
    }

    return ctx.db.address.update({
      where: { id: input.id },
      data: {
        apartmentNo: input.apartmentNo,
        permanentAddress: input.permanentAddress,
        currentAddress: input.currentAddress,
        isStaying: input.isStaying,
        dateRanges: input.startDate && input.endDate ? {
          create: [
            {
              startDate: input.startDate,
              endDate: input.endDate,
              type: 'someType', // Adjust the type as needed or add it to the input
            },
          ],
        } : undefined,
      },
    });
  }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.db.address.delete({
      where: { id: input.id },
    });
  }),
});