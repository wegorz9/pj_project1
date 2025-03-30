import { createTRPCRouter } from "~/server/api/trpc";
import { rentalsRouter } from "./routers/rentals";

export const appRouter = createTRPCRouter({
    rentals: rentalsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
