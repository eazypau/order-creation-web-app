import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

const defaultProductSelect = Prisma.validator<Prisma.ProductListSelect>()({
    id: true,
    name: true,
    price: true,
    active: true,
});

export const productRouter = router({
    getAllProducts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;

            const products = await prisma.productList.findMany({
                select: defaultProductSelect,
                take: limit,
                where: {},
                orderBy: {
                    id: "asc",
                },
            });

            return {
                products: products.reverse(),
            };
        }),
    createProduct: publicProcedure
        .input(
            z.object({
                name: z.string(),
                price: z.number(),
                active: z.boolean(),
            })
        )
        .mutation(async ({ input }) => {
            const product = prisma.productList.create({
                data: input,
                select: defaultProductSelect,
            });

            return product;
        }),
    updateProduct: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string(),
                price: z.number(),
                active: z.boolean(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, ...rest } = input;
            const product = prisma.productList.update({
                where: { id },
                data: { ...rest },
                select: defaultProductSelect,
            });

            return product;
        }),
    deleteProduct: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const product = prisma.productList.delete({
                where: { ...input },
                select: defaultProductSelect,
            });

            return product;
        }),
});
