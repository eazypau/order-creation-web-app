// import Head from "next/head";
// import Image from "next/image";
import { useEffect, useState } from "react";
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
import { calculateTotalPrice } from "../helpers/calculateTotalPrice";

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
    const [orders, setOrders] = useState<any[]>([]);
    const [buttonName, setButtonName] = useState<
        "update" | "create" | "添加" | "更新"
    >("update");
    const [productList, setProductList] = useState<any[]>([]);
    const { isLoading, setIsLoading } = useLoading();

    const { data: orderList, refetch } = trpc.useQuery([
        "orders.findAllOrders",
    ]);
    const { data: products } = trpc.useQuery(["products.findAllProducts"]);

    useEffect(() => {
        if (orderList) setOrders(orderList);
        else setOrders([]);
    }, [orderList]);

    useEffect(() => {
        if (products) setProductList(products);
        else setProductList([]);
    }, [products]);

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

    const handleFormInput = ({
        action,
        value,
        index,
    }: {
        action: string;
        value?: any;
        index?: number;
    }) => {
        console.log(action);
        // add item, remove item, edit item (name or qty change)
        // update name
        if (action === "name-change") {
            setOrderDetails((prev) => ({
                ...prev,
                customerName: value,
            }));
        }
        if (action === "add-item") {
            const items = [...orderDetails.items];
            items.push({
                id: "",
                name: "",
                quantity: 1,
            });
            setOrderDetails((prev) => ({
                ...prev,
                items: items,
            }));
        }
        if (action === "edit-item-name") {
            const items = [...orderDetails.items];
            const newItems = items.map((item, i) => {
                item.id = item.id + item.quantity;
                if (i === index) item.name = value;
                return item;
            });
            setOrderDetails((prev) => ({
                ...prev,
                items: newItems,
            }));
            const totalPrice = calculateTotalPrice({
                items: orderDetails.items,
                productList: productList,
            });
            setOrderDetails((prev) => ({
                ...prev,
                totalPrice: totalPrice,
            }));
        }
        if (action === "edit-item-qty") {
            const items = [...orderDetails.items];
            const newItems = items.map((item, i) => {
                if (i === index) item.quantity = value;
                return item;
            });
            setOrderDetails((prev) => ({
                ...prev,
                items: newItems,
            }));
            const totalPrice = calculateTotalPrice({
                items: orderDetails.items,
                productList: productList,
            });
            setOrderDetails((prev) => ({
                ...prev,
                totalPrice: totalPrice,
            }));
        }
    };

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
        if (id === orderDetails.id && showSideBar) return;
        setShowSideBar(false);
        setTimeout(() => {
            const listOfOrders = [...orders];
            const findOrder: any = listOfOrders.find(
                (order) => order.id === id
            );
            setOrderDetails(JSON.parse(JSON.stringify({ ...findOrder })));
            setButtonName("update");
            setShowSideBar(true);
        }, 400);
    };

    const openCreateOrderSidebar = (event: Event) => {
        event.preventDefault();
        setShowSideBar(false);
        setTimeout(() => {
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
        }, 400);
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
                await refetch();
                setShowSideBar(false);
                setIsLoading(false);
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
        <div className="bg-slate-200 w-screen overflow-x-hidden">
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
                        tableContent={orders}
                        toggleSidebarFunc={passDataToSideBar}
                        updateOrderStatus={updateOrderStatus}
                    />
                    <Sidebar
                        data={orderDetails}
                        toggleSidebarFunc={() => setShowSideBar(false)}
                        buttonName={buttonName}
                        process={buttonName}
                        options={productList}
                        showSidebar={showSideBar}
                        handleInputs={handleFormInput}
                        orderFunctionHandle={orderCreateUpdateHandler}
                    />
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
