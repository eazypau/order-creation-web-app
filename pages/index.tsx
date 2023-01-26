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
import { Order, OrderData } from "../types/Order";
import { Loading } from "../components/global/Loading";
import { useLoading } from "../hooks/useLoading";
import { calculateTotalPrice } from "../helpers/calculateTotalPrice";
import en from "../locales/en";
import cn from "../locales/cn";
import { ProductObj } from "../types/Product";

const dataFormat = {
    id: -1,
    customerName: "",
    items: [
        {
            id: -1,
            name: "",
            quantity: 1,
            orderId: -1,
        },
    ],
    totalPrice: 0,
    status: "",
};

export default function Home() {
    let router = useRouter();
    let t = router.locale === "en" ? en : cn;
    const todayDate = new Date();

    const [showSideBar, setShowSideBar] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        id: -1,
        customerName: "",
        items: [
            {
                id: -1,
                name: "",
                quantity: 1,
                orderId: -1,
            },
        ],
        totalPrice: 0,
        status: "",
        createdAt: todayDate,
        deliveryDate:
            todayDate.getFullYear() +
            "-" +
            (todayDate.getMonth() < 10
                ? "0" + (todayDate.getMonth() + 1)
                : todayDate.getMonth() + 1) +
            "-" +
            (todayDate.getDate() < 10
                ? "0" + todayDate.getDate()
                : todayDate.getDate()),
    });
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [buttonName, setButtonName] = useState<
        "update" | "create" | "添加" | "更新"
    >("update");
    const [productList, setProductList] = useState<ProductObj[]>([]);
    const { isLoading, setIsLoading } = useLoading();
    const [removedItems, setRemovedItems] = useState<{ id: number }[]>([]);

    const { data: orderList, refetch } = trpc.getAllOrders.useQuery(
        { limit: 50 },
        {
            staleTime: 5 * 1000,
            select: (data) => data.orderList,
            onError(err) {
                console.error(err);
            },
        }
    );
    const { data: products } = trpc.getAllProducts.useQuery(
        { limit: 50 },
        {
            staleTime: 5 * 1000,
            select: (data) => data.products,
            onError(err) {
                console.error(err);
            },
        }
    );
    // const { data: orderList, refetch } = trpc.useQuery([
    //     "orders.findAllOrders",
    // ]);
    // const { data: products } = trpc.useQuery(["products.findAllProducts"]);

    useEffect(() => {
        if (orderList) setOrders(orderList);
        else setOrders([]);
    }, [orderList]);

    useEffect(() => {
        if (products) setProductList(products);
        else setProductList([]);
    }, [products]);

    const createOrderMutation = trpc.createOrder.useMutation({
        onSuccess: async () => {
            refetch();
        },
        onError(error) {
            console.error(error);
        },
    });
    const createOrderItemMutation = trpc.createOrderItem.useMutation({
        onSuccess: async () => {
            console.log("successfully create order items");
        },
        onError(error) {
            console.error(error);
        },
    });
    const updateOrderMutation = trpc.updateOrder.useMutation({
        onSuccess: async () => {
            refetch();
        },
        onError(error) {
            console.error(error);
        },
    });
    const updateOrderItemMutation = trpc.updateOrderItem.useMutation({
        onSuccess: async () => {
            console.log("successfully update order items");
        },
        onError(error) {
            console.error(error);
        },
    });
    const removeOrderItemMutation = trpc.deleteOrderItem.useMutation({
        onSuccess: async () => {
            console.log("successfully removed order item");
        },
        onError(error) {
            console.error(error);
        },
    });

    // const createOrderMutation = trpc.useMutation(["orders.createOrder"], {
    //     onSuccess: (data, variables, context) => {
    //         console.log("data: ", data);
    //     },
    // });
    // const createOrderItemMutation = trpc.useMutation(
    //     ["orders.createOrderItem"],
    //     {
    //         onSuccess: () => {
    //             console.log("new item is created...");
    //         },
    //     }
    // );
    // const updateOrderMutation = trpc.useMutation(["orders.updateOrder"], {
    //     onSuccess: async () => {
    //         console.log("successfully update order total price.");
    //         await refetch();
    //     },
    // });
    // const updateOrderItemMutation = trpc.useMutation(
    //     ["orders.updateOrderItem"],
    //     {
    //         onSuccess: async () => {
    //             await refetch();
    //         },
    //     }
    // );

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
                // id: router.locale === "en" ? "Create Order" : "新订单",
                id: -1,
                customerName: "",
                items: [
                    {
                        id: -1,
                        name: "",
                        quantity: 1,
                        orderId: -1,
                    },
                ],
                totalPrice: 0,
                status: "unfulfill",
                createdAt: todayDate,
                deliveryDate:
                    todayDate.getFullYear() +
                    "-" +
                    (todayDate.getMonth() < 10
                        ? "0" + (todayDate.getMonth() + 1)
                        : todayDate.getMonth() + 1) +
                    "-" +
                    (todayDate.getDate() < 10
                        ? "0" + todayDate.getDate()
                        : todayDate.getDate()),
            });
            setButtonName(router.locale === "en" ? "create" : "添加");
            setShowSideBar(true);
        }, 400);
    };

    const handleFormInput = ({
        action,
        value,
        index,
    }: {
        action: string;
        value?: any;
        index?: number;
    }) => {
        // console.log(action);
        // console.log(value);

        // add item, remove item, edit item (name or qty change)
        // update name
        if (action === "name-change") {
            setOrderDetails((prev) => ({
                ...prev,
                customerName: value,
            }));
        }
        if (action === "date-change") {
            // const newDeliveryDate = new Date(value);
            setOrderDetails((prev) => ({
                ...prev,
                deliveryDate: value,
            }));
        }
        if (action === "add-item") {
            const items = [...orderDetails.items];
            items.push({
                id: -1,
                name: "",
                quantity: 1,
                orderId: -1,
            });
            setOrderDetails((prev) => ({
                ...prev,
                items: items,
            }));
        }
        if (action === "edit-item-name") {
            const items = [...orderDetails.items];
            const newItems = items.map((item, i) => {
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
        if (action === "remove-item") {
            const itemIndex = index || 0;
            const items = [...orderDetails.items];
            items.splice(itemIndex, 1);
            const totalPrice = calculateTotalPrice({
                items: items,
                productList: productList,
            });
            setOrderDetails((prev) => ({
                ...prev,
                items: items,
                totalPrice: totalPrice,
            }));

            if (value) {
                const newRemovedItem = [
                    ...removedItems,
                    {
                        id: value,
                    },
                ];

                setRemovedItems([...newRemovedItem]);
            }
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
        deliveryDate: Date;
    }) => {
        try {
            setIsLoading(true);
            const orderData = {
                id: order.id,
                customerName: order.customerName,
                totalPrice: order.totalPrice,
                status: "fulfilled",
                deliveryDate: order.deliveryDate,
            };
            await updateOrderMutation.mutateAsync({ ...orderData });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
                const newOrderDetails = {
                    customerName: orderData.customerName,
                    status: orderData.status,
                    totalPrice: orderData.totalPrice,
                    deliveryDate: new Date(orderData.deliveryDate),
                };
                setIsLoading(true);
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
                // console.log("updating order details");
                const newOrderDetails = {
                    id: Number(orderData.id),
                    customerName: orderData.customerName,
                    status: orderData.status,
                    totalPrice: orderData.totalPrice,
                    deliveryDate: new Date(orderData.deliveryDate),
                };
                setIsLoading(true);
                const data = await updateOrderMutation.mutateAsync(
                    newOrderDetails
                );
                // need to differentiate existing and newly added items
                // update existing / check if there is any changes
                // add new items
                const items = orderData.items;
                const newItems: {
                    name: string;
                    quantity: number;
                    orderId: number;
                }[] = [];
                const existingItems: {
                    id: number;
                    name: string;
                    quantity: number;
                    orderId: number;
                }[] = [];
                const listOfItemsToRemove = [...removedItems];

                items.forEach((item) => {
                    item.orderId = data.id;
                    item.quantity = Number(item.quantity);
                    if (Number(item.id) !== -1) {
                        existingItems.push(item);
                    } else {
                        newItems.push(item);
                    }
                });

                console.log("new items:", newItems);
                console.log("existing items:", existingItems);
                console.log("deleteitem: ", listOfItemsToRemove);

                if (newItems.length > 0) {
                    for (const item of newItems) {
                        await createOrderItemMutation.mutateAsync(item);
                    }
                }
                if (existingItems.length > 0) {
                    for (const item of existingItems) {
                        await updateOrderItemMutation.mutateAsync(item);
                    }
                }
                if (listOfItemsToRemove.length > 0) {
                    for (const item of removedItems) {
                        await removeOrderItemMutation.mutateAsync(item);
                    }
                }

                await refetch();
                setShowSideBar(false);
                setIsLoading(false);
                setRemovedItems([]); // reset removed items
            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowSideBar(false);
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
                    <p className="mb-1 font-medium text-sm">
                        * Click the order number to edit details.
                    </p>
                    <Table
                        tableHeader={[
                            t.orderDate,
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
