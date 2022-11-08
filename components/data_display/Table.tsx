import React from "react";
import { Button } from "../global/Button";
import { CheckIcon } from "@heroicons/react/solid";
import { Order, OrderV2 } from "../../types/Order";

type Props = {
    tableHeader: string[];
    tableContent: OrderV2[];
    toggleSidebarFunc: (orderId: string | number) => void;
    updateOrderStatus: (order: {
        id: number;
        customerName: string;
        totalPrice: number;
        status: string;
    }) => void;
};

export const Table = ({
    tableHeader,
    tableContent,
    toggleSidebarFunc,
    updateOrderStatus,
}: Props) => {
    const sortNames = () => {
        console.log("sort customer name");
    };
    const updateStatus = (order: {
        id: number;
        customerName: string;
        totalPrice: number;
        status: string;
    }) => {
        updateOrderStatus(order);
    };

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-max md:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableHeader.map((column) => {
                            if (
                                column === "Customer Name" ||
                                column === "客户名称"
                            ) {
                                return (
                                    <th
                                        scope="col"
                                        className="py-3 px-6"
                                        key={column}
                                    >
                                        <div className="flex items-center">
                                            {column}
                                            <a href="#">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="ml-1 w-3 h-3"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 320 512"
                                                >
                                                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                );
                            }
                            if (column === "Status" || column === "状态") {
                                return (
                                    <th
                                        scope="col"
                                        className="hidden lg:block py-3 px-6"
                                        key={column}
                                    >
                                        {column}
                                    </th>
                                );
                            }
                            return (
                                <th
                                    scope="col"
                                    className="py-3 px-6"
                                    key={column}
                                >
                                    {column}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableContent.map((row) => (
                        <tr className="table-row-style" key={row.id}>
                            <th
                                onClick={() => toggleSidebarFunc(row.id)}
                                scope="row"
                                className="item-column-one-style row-general-style"
                            >
                                {row.id}&quot;
                            </th>
                            <td className="row-general-style">
                                {row.customerName}
                            </td>
                            <td className="row-general-style">
                                {row.items.map((item) => (
                                    <p key={item.name + item.id + row.id}>
                                        {item.name}: {item.quantity}
                                    </p>
                                ))}
                            </td>
                            <td className="row-general-style">
                                ${row.totalPrice}
                            </td>
                            <td className="row-general-style hidden lg:block">
                                {row.status}
                            </td>
                            <td className="row-general-style text-right">
                                <Button
                                    customWidth="py-1 px-3"
                                    onClick={() => {
                                        updateStatus(row);
                                    }}
                                >
                                    <CheckIcon width={15} height={15} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
