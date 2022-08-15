export type Order = {
	orderNumber: string;
	customerName: string;
	items: {
    itemName: string,
    quantity: number
  }[];
	totalPrice: number;
	status: string;
};