import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

export const serverRouter = trpc
    .router<Context>()
    .query("findAll", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.orderList.findMany();
        },
    })
    .mutation("insertOne", {
        input: z.object({
            customerName: z.string(),
            items: z
                .object({
                    name: z.string(),
                    quantity: z.number(),
                    orderId: z.number(),
                })
                .array(),
            totalPrice: z.number(),
            status: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.orderList.create({
                data: {
                    customerName: input.customerName,
                    items: input.items,
                    totalPrice: input.totalPrice,
                    status: input.status,
                },
            });
        },
    })
    .mutation("updateOne", {
        input: z.object({
            id: z.number(),
            customerName: z.string(),
            items: z
                .object({
                    name: z.string(),
                    quantity: z.number(),
                    orderId: z.number(),
                })
                .array(),
            totalPrice: z.number(),
            status: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            const { id, ...rest } = input;
            return await ctx.prisma.orderList.update({
                where: { id },
                data: { ...rest },
            });
        },
    })
    .mutation("deleteOne", {
        input: z.object({
            id: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.orderList.delete({
                where: { ...input },
            });
        },
    });
// still got more needed for Product list and maybe OrderItem

export type ServerRouter = typeof serverRouter;
