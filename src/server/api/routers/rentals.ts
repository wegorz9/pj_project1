import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const rentalsRouter = createTRPCRouter({
    getAll: publicProcedure.query(async () => {
        return await prisma.rental.findMany({
            include: { images: true },
        });
    }),
});
