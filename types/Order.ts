export type Order = {
    id: string | number;
    customerName: string;
    items: {
        id: string | number;
        name: string;
        quantity: number;
    }[];
    totalPrice: number;
    status: string;
};
