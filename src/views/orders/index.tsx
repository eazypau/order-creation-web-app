"use client";
import { useCallback, useEffect, useState } from "react";
//components
import { Table } from "@/components/dataDisplay/Table";
import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
import { Sidebar } from "@/components/forms/Sidebar";
import { Loading } from "@/components/global/Loading";
//store or utils or const
import { useSidebarStore } from "@/store/sidebarControl";
import { useLoading } from "@/hooks/useLoading";
import { orderInitialState } from "@/utils/const";
//firebase
import {
  createOrder,
  getAllProducts,
  getOrdersByStatus,
  updateOrderById,
} from "@/firebase/firestoreFunctions";
//types
import { Order, OrderData } from "@/types/Order";
import { ProductObj } from "@/types/Product";
//lib
import moment from "moment";

export default function OrdersView({ dictionary }: any) {
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
  const sidebarLabels = {
    items: dictionary.items,
    orderNumber: dictionary.orderNumber,
    customerName: dictionary.customerName,
    deliveryDate: dictionary.deliveryDate,
    listOfItems: dictionary.listOfItems,
    createOrder: dictionary.createOrder,
    phoneNumber: dictionary.phoneNumber,
  };

  //store
  const { isSiderbarOpen, setIsSidebarOpen, type, setType } = useSidebarStore();
  //hooks
  const { isLoading, setIsLoading } = useLoading();
  //func
  const togglerSideBarFunc = () => {
    const initialState = { ...orderInitialState };
    const deliveryDate = new Date();
    deliveryDate.setMinutes(
      deliveryDate.getMinutes() - deliveryDate.getTimezoneOffset()
    );
    initialState.delivery_date = deliveryDate.toISOString().slice(0, 16);
    if (!isSiderbarOpen) {
      setSelectedOrder(initialState);
      setType("create");
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
      setSelectedOrder(initialState);
      setTimeout(() => {
        setType("create");
        setIsSidebarOpen(true);
      }, 300);
    }
  };

  //state
  const [selectedOrder, setSelectedOrder] = useState<Order>(orderInitialState);
  // const [orderData, setOrderData] = useState([]);
  const [productList, setProductList] = useState<ProductObj[]>([]);
  const [orderList, setOrderList] = useState<OrderData[]>([]);

  //function
  const getOrders = async () => {
    const orders: OrderData[] = [];
    const data = await getOrdersByStatus("unfulfilled");
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
  const getProducts = async () => {
    const products: ProductObj[] = [];
    const data = await getAllProducts();
    data?.forEach((item) => products.push(item.data() as ProductObj));
    if (products.length > 0) {
      setProductList(products);
    } else {
      setProductList([]);
    }
  };

  const viewAndEditOrder = useCallback(
    (data: OrderData) => {
      const deliveryDate = new Date(data.delivery_date.toDate());
      deliveryDate.setMinutes(
        deliveryDate.getMinutes() - deliveryDate.getTimezoneOffset()
      );
      if (isSiderbarOpen) {
        setIsSidebarOpen(false);
      }
      setTimeout(() => {
        setSelectedOrder({
          ...data,
          created_at: data.created_at.toDate(),
          delivery_date: deliveryDate.toISOString().slice(0, 16),
        });
        setType("update");
        setIsSidebarOpen(true);
      }, 300);
    },
    [isSiderbarOpen]
  );

  const updateStatus = useCallback(
    async (orderData: any) => {
      setIsLoading(true);
      const data = {
        id: orderData.id,
        status: "fulfilled",
      };
      await updateOrderById(data);
      await getOrders();
      setIsLoading(false);
    },
    [isLoading]
  );

  const handleOrderAction = async ({ orderData }: any) => {
    setIsLoading(true);
    orderData.delivery_date = new Date(orderData.delivery_date);
    if (type === "create") {
      await createOrder(orderData);
    } else {
      await updateOrderById(orderData);
    }
    await getOrders();
    setIsSidebarOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <NavBar
        toggleSidebarToCreate={togglerSideBarFunc}
        hasCTAButton={true}
        CTAButtonText="Create Order"
        labels={navBarLabels}
      />
      <main className="px-4 lg:px-24 relative">
        <Table
          tableHeader={tableHeader}
          tableContent={orderList}
          toggleSidebarFunc={viewAndEditOrder}
          updateOrderStatus={updateStatus}
        />
        <Sidebar
          data={selectedOrder}
          labels={sidebarLabels}
          options={productList}
          orderFunctionHandle={handleOrderAction}
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
