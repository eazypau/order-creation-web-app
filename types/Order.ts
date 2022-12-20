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
};

export type OrderV2 = {
    id: number;
    customerName: string;
    items: {
        id: string | number;
        name: string;
        quantity: number;
    }[];
    totalPrice: number;
    status: string;
};
