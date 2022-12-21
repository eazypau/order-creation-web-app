import { mergeRouters } from "../trpc";
import { orderRouter } from "./orders";
import { productRouter } from "./product";

export const appRouter = mergeRouters(orderRouter, productRouter);

export type AppRouter = typeof appRouter;
