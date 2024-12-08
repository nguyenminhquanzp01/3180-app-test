import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { apartmentFormSchema, updateApartmentFormSchema } from "@/lib/validators";

export const apartmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.apartment.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        addresses: {
          include: {
            resident: true,
          },
        },
        fees: true,
      },
    });
  }),

  getAllApartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.apartment.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        addresses: {
          include: {
            resident: true,
          },
        },
        fees: true,
      },
    });
  }),

  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return ctx.db.apartment.findUnique({
      where: { id: input },
      include: {
        addresses: {
          include: {
            resident: true,
          },
        },
        fees: true,
      },
    });
  }),

  create: publicProcedure.input(apartmentFormSchema).mutation(async ({ ctx, input }) => {
    const apartmentExists = await ctx.db.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (apartmentExists) {
      throw new Error("Apartment number already exists");
    }

    return ctx.db.apartment.create({
      data: { ...input },
    });
  }),

  update: publicProcedure.input(updateApartmentFormSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.apartment.update({
      where: { id: input.id },
      data: { ...input },
    });
  }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.apartment.delete({
      where: { id: input },
    });
  }),

  getApartmentsWithResidents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.apartment.findMany({
      where: {
        addresses: {
          some: {
            resident: {
              isNot: null,
            },
          },
        },
      },
      select: {
        apartmentNo: true,
      },
    });
  }),

  getVehiclesByApartment: publicProcedure
    .input(z.object({ apartmentNo: z.number().int().nonnegative() }))
    .query(async ({ ctx, input }) => {
      const vehicles = await ctx.db.resident.findMany({
        where: {
          address: {
            apartment: {
              apartmentNo: input.apartmentNo,
            },
          },
        },
        select: { vehicle: true },
      });
      return vehicles.map((resident) => resident.vehicle);
    }),

  getApartmentSize: publicProcedure
    .input(z.object({ apartmentNo: z.number().int().nonnegative() }))
    .query(async ({ ctx, input }) => {
      const apartment = await ctx.db.apartment.findUnique({
        where: { apartmentNo: input.apartmentNo },
        select: { size: true },
      });

      if (!apartment) {
        throw new Error("Apartment not found");
      }

      return apartment.size;
    }),
});
