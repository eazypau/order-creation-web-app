import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

const createRouter = () => {
    return trpc.router<Context>();
};

const orders = createRouter()
    // the first param is the route naming
    .query("findAllOrders", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.orderList.findMany({
                include: { items: true },
            });
        },
    })
    .query("findAllOrderItems", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.orderItem.findMany();
        },
    })
    .mutation("createOrder", {
        input: z.object({
            customerName: z.string(),
            totalPrice: z.number(),
            status: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.orderList.create({
                data: {
                    customerName: input.customerName,
                    totalPrice: input.totalPrice,
                    status: input.status,
                },
            });
        },
    })
    .mutation("createOrderItem", {
        input: z.object({
            name: z.string(),
            quantity: z.number(),
            orderId: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.orderItem.create({
                data: {
                    name: input.name,
                    quantity: input.quantity,
                    order: { connect: { id: input.orderId } }, // for relational models
                },
            });
        },
    })
    .mutation("updateOrderItem", {
        input: z.object({
            id: z.number(),
            name: z.string(),
            quantity: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            const { id, ...rest } = input;
            return await ctx.prisma.orderItem.update({
                where: { id },
                data: {
                    name: input.name,
                    quantity: input.quantity,
                },
            });
        },
    })
    .mutation("deleteOrderItem", {
        input: z.object({
            id: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            await ctx.prisma.orderItem.delete({
                where: { ...input },
            });
        },
    })
    .mutation("updateOrder", {
        input: z.object({
            id: z.number(),
            customerName: z.string(),
            // items: z
            //     .object({
            //         name: z.string(),
            //         quantity: z.number(),
            //         orderId: z.number(),
            //     })
            //     .array(),
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
    .mutation("deleteOrder", {
        input: z.object({
            id: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.orderList.delete({
                where: { ...input },
            });
        },
    });

const products = createRouter()
    .query("findAllProducts", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.productList.findMany();
        },
    })
    .mutation("createProduct", {
        input: z.object({
            name: z.string(),
            price: z.number(),
            active: z.boolean(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.productList.create({
                data: {
                    name: input.name,
                    price: input.price,
                    active: input.active,
                },
            });
        },
    })
    .mutation("updateProduct", {
        input: z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            active: z.boolean(),
        }),
        resolve: async ({ input, ctx }) => {
            const { id, ...rest } = input;
            return await ctx.prisma.productList.update({
                where: { id },
                data: {
                    name: input.name,
                    price: input.price,
                    active: input.active,
                },
            });
        },
    })
    .mutation("deleteProduct", {
        input: z.object({
            id: z.number(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.productList.delete({
                where: { ...input },
            });
        },
    });

export const appRouter = createRouter()
    .merge("orders.", orders)
    .merge("products.", products);

export type ServerRouter = typeof appRouter;
