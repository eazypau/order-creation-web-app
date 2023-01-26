export type Order = {
    id: number;
    customerName: string;
    items: {
        id: number;
        name: string;
        quantity: number;
        orderId: number;
    }[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    deliveryDate: string;
};

export type OrderData = {
    id: number;
    customerName: string;
    items: {
        id: number;
        name: string;
        quantity: number;
        orderId: number;
    }[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    deliveryDate: Date;
};
