"use client";
import { useEffect, useState } from "react";
//components
import { Table } from "@/components/dataDisplay/Table";
import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
//firebase
import { getOrdersByStatus } from "@/firebase/firestoreFunctions";
//types
import { OrderData } from "@/types/Order";
//lib
import moment from "moment";

export default function CompletedOrdersView({ dictionary }: any) {
  //const
  const tableHeader = [
    dictionary.deliveryDate,
    dictionary.customerName,
    dictionary.items,
    dictionary.totalPrice,
    dictionary.status,
    "",
  ];
  const navBarLabels = {
    brand: dictionary.brand,
    orders: dictionary.orders,
    products: dictionary.products,
    completed: dictionary.completed,
  };

  //state
  const [orderList, setOrderList] = useState<OrderData[]>([]);

  //function
  const getOrders = async () => {
    const orders: OrderData[] = [];
    const data = await getOrdersByStatus("fulfilled");
    data?.forEach((item) => orders.push(item.data() as OrderData));
    if (orders.length > 0) {
      const formatedOrders = orders.map((item) => {
        const formatedDate = new Date(item.delivery_date.toDate());
        return {
          ...item,
          formated_delivery_date:
            (formatedDate.getDate() < 10
              ? "0" + formatedDate.getDate()
              : formatedDate.getDate()) +
            "-" +
            (formatedDate.getMonth() < 10
              ? "0" + (formatedDate.getMonth() + 1)
              : formatedDate.getMonth() + 1) +
            "-" +
            formatedDate.getFullYear(),
          formated_delivery_time: moment(item.delivery_date.toDate()).format(
            "LT"
          ),
        };
      });
      setOrderList(formatedOrders);
    } else {
      setOrderList([]);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <NavBar
        toggleSidebarToCreate={() => {
          return null;
        }}
        hasCTAButton={false}
        CTAButtonText="Create Order"
        labels={navBarLabels}
      />
      <main className="px-4 lg:px-24 relative">
        <Table
          tableHeader={tableHeader}
          tableContent={orderList}
          toggleSidebarFunc={() => {
            return null;
          }}
          updateOrderStatus={() => {
            return null;
          }}
          requireCheckButton={false}
        />
      </main>
      <Footer
        labels={{
          allRightsReserve: dictionary.allRightsReserve,
          brand: dictionary.brand,
        }}
      />
    </>
  );
}
