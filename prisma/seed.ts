import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    const firsOrderId = 12345678998768;
    const firstOrderItemId = 21345678998768;
    await prisma.orderList.upsert({
        where: {
            id: firsOrderId,
        },
        create: {
            id: firsOrderId,
            customerName: "Nicholas",
            totalPrice: 23,
            status: "unfulfill",
        },
        update: {},
    });
    await prisma.orderItem.upsert({
        where: {
            id: firstOrderItemId,
        },
        create: {
            id: firstOrderItemId,
            name: "Dou Sa Bing",
            quantity: 10,
            orderId: firsOrderId,
        },
        update: {},
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
