import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

const defaultOrderSelect = Prisma.validator<Prisma.OrderListSelect>()({
    id: true,
    customerName: true,
    items: true,
    totalPrice: true,
    status: true,
    createdAt: true,
    updatedAt: true,
});

const defaultOrderItemSelect = Prisma.validator<Prisma.OrderItemSelect>()({
    id: true,
    name: true,
    quantity: true,
    orderId: true,
});

export const orderRouter = router({
    getAllOrders: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;

            const orders = await prisma.orderList.findMany({
                select: defaultOrderSelect,
                take: limit,
                where: {},
                orderBy: {
                    createdAt: "desc",
                },
            });

            return {
                orderList: orders.reverse(),
            };
        }),
    createOrder: publicProcedure
        .input(
            z.object({
                customerName: z.string(),
                totalPrice: z.number(),
                status: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const order = await prisma.orderList.create({
                data: input,
                select: defaultOrderSelect,
            });
            return order;
        }),
    updateOrder: publicProcedure
        .input(
            z.object({
                id: z.number(),
                customerName: z.string(),
                totalPrice: z.number(),
                status: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...rest } = input;
            const order = await prisma.orderList.update({
                where: { id },
                data: { ...rest },
                select: defaultOrderSelect,
            });

            return order;
        }),
    createOrderItem: publicProcedure
        .input(
            z.object({
                name: z.string(),
                quantity: z.number(),
                orderId: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const orderItem = prisma.orderItem.create({
                data: input,
                select: defaultOrderItemSelect,
            });

            return orderItem;
        }),
    updateOrderItem: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string(),
                quantity: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...rest } = input;
            const orderItem = prisma.orderItem.update({
                where: { id },
                data: { ...rest },
                select: defaultOrderItemSelect,
            });

            return orderItem;
        }),
    deleteOrderItem: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const orderItem = prisma.orderItem.delete({
                where: { ...input },
                select: defaultOrderItemSelect,
            });

            return orderItem;
        }),
});
