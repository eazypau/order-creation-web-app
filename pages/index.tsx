// import Head from "next/head";
// import Image from "next/image";
import { useCallback, useState } from "react";
import { Footer } from "../components/global/Footer";
import { NavBar } from "../components/global/NavBar";
// import { Pagination } from "../components/data_display/Pagination";
import { Table } from "../components/data_display/Table";
// import { Button } from "../components/global/Button";
// import { InputField } from "../components/forms/InputField";
import { Sidebar } from "../components/forms/Sidebar";
import { trpc } from "../utils/trpc";
// import { SelectBox } from "../components/forms/SelectBox";
// import styles from "../styles/Home.module.css";

const tableHeader = [
    "Order No.",
    "Customer Name",
    "Items",
    "Total Price (RM)",
    "Status",
    "", // empty column for fulfilled order tick button
];

const dummyOrders = [
    {
        orderNumber: "#1",
        customerName: "Jennifer",
        items: [
            {
                itemName: "Dou Sa Bing",
                quantity: 1,
            },
            {
                itemName: "Xiang Bing",
                quantity: 10,
            },
        ],
        totalPrice: 32,
        status: "unfulfill",
    },
    {
        orderNumber: "#2",
        customerName: "Joel",
        items: [
            {
                itemName: "Dou Sa Bing",
                quantity: 1,
            },
            {
                itemName: "Xiang Bing",
                quantity: 10,
            },
        ],
        totalPrice: 40,
        status: "fulfilled",
    },
    {
        orderNumber: "#3",
        customerName: "Nicholas",
        items: [
            {
                itemName: "Dou Sa Bing",
                quantity: 1,
            },
            {
                itemName: "Xiang Bing",
                quantity: 10,
            },
        ],
        totalPrice: 32,
        status: "unfulfill",
    },
];

const dataFormat = {
    orderNumber: "",
    customerName: "",
    items: [
        {
            itemName: "",
            quantity: 1,
        },
    ],
    totalPrice: 0,
    status: "",
};

export default function Home() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderNumber: "",
        customerName: "",
        items: [
            {
                itemName: "",
                quantity: 1,
            },
        ],
        totalPrice: 0,
        status: "",
    });
    const [buttonName, setButtonName] = useState<"update" | "create">("update");

    const { data: orderList, refetch } = trpc.useQuery([
        "orders.findAllOrders",
    ]);

    const { data: orderItems, refetch: refetchOrderItems } = trpc.useQuery([
        "orders.findAllOrderItems",
    ]);

    // console.log("current orderlist: ", orderList);
    // console.log("order item list: ", orderItems);

    const createOrderMutation = trpc.useMutation(["orders.createOrder"], {
        onSuccess: () => {
            refetch();
        },
    });

    const createOrderItemMutation = trpc.useMutation(
        ["orders.createOrderItem"],
        {
            onSuccess: () => {
                console.log("new item is created...");
                refetch();
                console.log("updated order list: ", orderList);
            },
        }
    );

    const deleteOrderItemMutation = trpc.useMutation(
        ["orders.deleteOrderItem"],
        {
            onSuccess: () => {
                console.log("new item is created...");
                refetch();
                console.log("updated order list: ", orderList);
            },
        }
    );

    const createOrder = useCallback(
        (e: Event) => {
            e.preventDefault();
            createOrderMutation.mutate({
                customerName: "Jenn",
                totalPrice: 0,
                status: "unfulfill",
            });
        },
        [createOrderMutation]
    );

    const createOrderItem = useCallback(
        (e: Event) => {
            e.preventDefault();
            createOrderItemMutation.mutate({
                name: "Dou Sa Bing",
                quantity: 5,
                orderId: 1,
            });
        },
        [createOrderItemMutation]
    );

    const deleteOrderItem = useCallback(
        (e: Event) => {
            e.preventDefault();
            deleteOrderItemMutation.mutate({
                id: 7,
            });
        },
        [deleteOrderItemMutation]
    );

    /**
     * Update order status by ID
     *
     * @param {string} id
     */
    const updateOrderStatus = (id: string) => {
        console.log("update order status");
    };

    const passDataToSideBar = (orderNumber: string) => {
        setShowSideBar(false);
        const findOrder = dummyOrders.find(
            (order) => order.orderNumber === orderNumber
        );
        setOrderDetails(findOrder || dataFormat);
        setButtonName("update");
        setShowSideBar(true);
    };

    const openCreateOrderSidebar = () => {
        setShowSideBar(false);
        setOrderDetails({
            orderNumber: "Create Order",
            customerName: "",
            items: [
                {
                    itemName: "",
                    quantity: 1,
                },
            ],
            totalPrice: 0,
            status: "unfulfill",
        });
        setButtonName("create");
        setShowSideBar(true);
    };

    return (
        <div className="bg-slate-200">
            <NavBar toggleSidebarToCreate={openCreateOrderSidebar} />
            <div className="relative">
                <div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
                    <Table
                        tableHeader={tableHeader}
                        tableContent={dummyOrders}
                        toggleSidebarFunc={passDataToSideBar}
                        updateOrderStatus={updateOrderStatus}
                    />
                    {showSideBar && (
                        <Sidebar
                            data={orderDetails}
                            toggleSidebarFunc={() => setShowSideBar(false)}
                            buttonName={buttonName}
                            process={buttonName}
                            createOrderFunc={deleteOrderItem}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

// TODO:
// - need sweet alert for delete function
// - create reusable button, inputs and selector
// - sidebar only use for create and update
// - features: create, update, delete and mark as done
