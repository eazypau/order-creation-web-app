import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Table } from "../../components/data_display/Table";
import { Footer } from "../../components/global/Footer";
import { NavBar } from "../../components/global/NavBar";
import cn from "../../locales/cn";
import en from "../../locales/en";
import { trpc } from "../../utils/trpc";

export default function Archive() {
    const router = useRouter();
    let t = router.locale === "en" ? en : cn;

    // const { data } = trpc.useQuery(["orders.findAllOrders"]);
    const { data, refetch } = trpc.getAllOrders.useQuery(
        { limit: 50 },
        {
            staleTime: 5 * 1000,
            select: (data) => data.orderList,
            onError(err) {
                console.error(err);
            },
        }
    );

    return (
        <div className="bg-slate-200">
            <Head>
                <title>Fulfilled Orders</title>
            </Head>
            <NavBar
                hasCTAButton={false}
                toggleSidebarToCreate={() => {
                    return;
                }}
            />
            <div>
                <div className="py-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
                    <Table
                        tableHeader={[
                            t.deliveryDate,
                            t.customerName,
                            t.items,
                            t.totalPrice,
                            t.status,
                        ]}
                        tableContent={data || []}
                        toggleSidebarFunc={() => {
                            return;
                        }}
                        updateOrderStatus={() => {
                            return;
                        }}
                        requireCheckButton={false}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
