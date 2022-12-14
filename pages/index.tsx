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
import { useLoading } from "../hooks/useLoading";

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
    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, setIsLoading } = useLoading();
    // const [apiResponse, setApiResponse] = useState<any>({});

    const { data: orderList, refetch } = trpc.useQuery([
        "orders.findAllOrders",
    ]);

    const createOrderMutation = trpc.useMutation(["orders.createOrder"], {
        onSuccess: (data, variables, context) => {
            console.log("data: ", data);
        },
    });

    const createOrderItemMutation = trpc.useMutation(
        ["orders.createOrderItem"],
        {
            onSuccess: () => {
                console.log("new item is created...");
            },
        }
    );

    const updateOrderMutation = trpc.useMutation(["orders.updateOrder"], {
        onSuccess: async () => {
            console.log("successfully update order total price.");
            await refetch();
        },
    });

    /**
     * Update order status by ID
     *
     * @param {object} order
     */
    const updateOrderStatus = async (order: {
        id: number;
        customerName: string;
        totalPrice: number;
        status: string;
    }) => {
        try {
            setIsLoading(true);
            const orderData = {
                id: order.id,
                customerName: order.customerName,
                totalPrice: order.totalPrice,
                status: "fulfilled",
            };
            await updateOrderMutation.mutateAsync(orderData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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
                CTAButtonText={t.createOrder}
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
