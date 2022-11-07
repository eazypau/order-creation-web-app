// import Head from "next/head";
// import Image from "next/image";
import { useState } from "react";
import { Footer } from "../components/global/Footer";
import { NavBar } from "../components/global/NavBar";
// import { Pagination } from "../components/data_display/Pagination";
import { Table } from "../components/data_display/Table";
import { Sidebar } from "../components/forms/Sidebar";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import en from "../locales/en";
import cn from "../locales/cn";
import { Order } from "../types/Order";
import { Loading } from "../components/global/Loading";

// const dummyOrders = [
//     {
//         id: "#1",
//         customerName: "Jennifer",
//         items: [
//             {
//                 id: "4",
//                 name: "Dou Sa Bing",
//                 quantity: 1,
//             },
//             {
//                 id: "5",
//                 name: "Xiang Bing",
//                 quantity: 10,
//             },
//         ],
//         totalPrice: 32,
//         status: "unfulfill",
//     },
//     {
//         id: "#2",
//         customerName: "Joel",
//         items: [
//             {
//                 id: "6",
//                 name: "Dou Sa Bing",
//                 quantity: 1,
//             },
//             {
//                 id: "7",
//                 name: "Xiang Bing",
//                 quantity: 10,
//             },
//         ],
//         totalPrice: 40,
//         status: "fulfilled",
//     },
//     {
//         id: "#3",
//         customerName: "Nicholas",
//         items: [
//             {
//                 id: "8",
//                 name: "Dou Sa Bing",
//                 quantity: 1,
//             },
//             {
//                 id: "9",
//                 name: "Xiang Bing",
//                 quantity: 10,
//             },
//         ],
//         totalPrice: 32,
//         status: "unfulfill",
//     },
// ];

const dataFormat = {
    id: "",
    customerName: "",
    items: [
        {
            id: "",
            name: "",
            quantity: 1,
        },
    ],
    totalPrice: 0,
    status: "",
};

export default function Home() {
    let router = useRouter();
    let t = router.locale === "en" ? en : cn;

    const [showSideBar, setShowSideBar] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        id: "",
        customerName: "",
        items: [
            {
                id: "",
                name: "",
                quantity: 1,
            },
        ],
        totalPrice: 0,
        status: "",
    });
    const [buttonName, setButtonName] = useState<"update" | "create" | "添加">(
        "update"
    );
    const [isLoading, setIsLoading] = useState(false);
    // const [apiResponse, setApiResponse] = useState<any>({});

    const { data: orderList, refetch } = trpc.useQuery([
        "orders.findAllOrders",
    ]);

    // const { data: orderItems, refetch: refetchOrderItems } = trpc.useQuery([
    //     "orders.findAllOrderItems",
    // ]);

    // console.log("current orderlist: ", orderList);
    // console.log("order item list: ", orderItems);

    const createOrderMutation = trpc.useMutation(["orders.createOrder"], {
        onSuccess: (data, variables, context) => {
            console.log("data: ", data);
            // setApiResponse({ ...data });
            // console.log("set API response...");
            // refetch();
            // return data;
        },
    });

    const createOrderItemMutation = trpc.useMutation(
        ["orders.createOrderItem"],
        {
            onSuccess: () => {
                console.log("new item is created...");
                // refetch();
                // console.log("updated order list: ", orderList);
            },
        }
    );

    const updateOrderMutation = trpc.useMutation(["orders.updateOrder"], {
        onSuccess: () => {
            console.log("successfully update order total price.");
        },
    });

    /**
     * Update order status by ID
     *
     * @param {string} id
     */
    const updateOrderStatus = (id: string | number) => {
        console.log("update order status");
    };

    const passDataToSideBar = (id: string | number) => {
        setShowSideBar(false);
        const findOrder: any = orderList?.find((order) => order.id === id);
        setOrderDetails(findOrder || dataFormat);
        setButtonName("update");
        setShowSideBar(true);
    };

    const openCreateOrderSidebar = (event: Event) => {
        event.preventDefault();
        setShowSideBar(false);
        setOrderDetails({
            id: router.locale === "en" ? "Create Order" : "新订单",
            customerName: "",
            items: [
                {
                    id: "",
                    name: "",
                    quantity: 1,
                },
            ],
            totalPrice: 0,
            status: "unfulfill",
        });
        setButtonName(router.locale === "en" ? "create" : "添加");
        setShowSideBar(true);
    };

    const orderCreateUpdateHandler = async ({
        step,
        orderData,
    }: {
        step: string;
        orderData: Order;
    }) => {
        // console.log("current step is ", step);
        try {
            if (["create", "添加"].includes(step)) {
                setIsLoading(true);
                const newOrderDetails = {
                    customerName: orderData.customerName,
                    status: orderData.status,
                    totalPrice: orderData.totalPrice,
                };
                const data = await createOrderMutation.mutateAsync(
                    newOrderDetails
                );
                // console.log("test returned data: ", data);
                const orderItems = orderData.items;
                for (const item of orderItems) {
                    const itemDetails = {
                        orderId: Number(data.id),
                        name: item.name,
                        quantity: Number(item.quantity),
                    };
                    // console.log(itemDetails);
                    await createOrderItemMutation.mutateAsync(itemDetails);
                }
                setShowSideBar(false);
                setIsLoading(false);
                await refetch();
            } else if (["update", "更新"].includes(step)) {
                console.log("updating order details");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-200">
            {isLoading ? <Loading /> : ""}
            <NavBar
                toggleSidebarToCreate={openCreateOrderSidebar}
                hasCTAButton
            />
            <div className="relative">
                <div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
                    <Table
                        tableHeader={[
                            t.orderNumber,
                            t.customerName,
                            t.items,
                            t.totalPrice,
                            t.status,
                            "",
                        ]}
                        tableContent={orderList || []}
                        toggleSidebarFunc={passDataToSideBar}
                        updateOrderStatus={updateOrderStatus}
                    />
                    {showSideBar && (
                        <Sidebar
                            data={orderDetails}
                            toggleSidebarFunc={() => setShowSideBar(false)}
                            buttonName={buttonName}
                            process={buttonName}
                            orderFunctionHandle={orderCreateUpdateHandler}
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
// - need loading screen
// - error handling
// - form validation
