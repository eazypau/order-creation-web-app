import { Timestamp } from "firebase/firestore";

export type Order = {
  id: string;
  customer_name: string;
  phone_number?: string;
  items: {
    // id: string;
    name: string;
    quantity: number;
    // orderId: number;
  }[];
  total_price: number;
  status: string;
  created_at: Date;
  delivery_date: string;
};

export type OrderData = {
  id: string;
  customer_name: string;
  phone_number?: string;
  items: {
    // id: string;
    name: string;
    quantity: number;
    // orderId: number;
  }[];
  total_price: number;
  status: string;
  created_at: Timestamp;
  delivery_date: Timestamp;
  formated_delivery_date?: string;
  formated_delivery_time?: string;
};
