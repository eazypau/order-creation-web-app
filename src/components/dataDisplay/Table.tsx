"use client";
import React from "react";
import { Button } from "../global/Button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { OrderData } from "../../types/Order";

type Props = {
  tableHeader: string[];
  tableContent: OrderData[];
  toggleSidebarFunc: (order: OrderData) => void;
  updateOrderStatus: (order: { id: string; status: string }) => void;
  requireCheckButton?: boolean;
};

export const Table = ({
  tableHeader,
  tableContent,
  toggleSidebarFunc,
  updateOrderStatus,
  requireCheckButton = true,
}: Props) => {
  const sortNames = () => {
    console.log("sort customer name");
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-7 max-w-[1000px] m-auto">
      <table className="w-max md:w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 capitalize bg-gray-50">
          <tr>
            {tableHeader.map((column) => {
              if (column === "Customer Name" || column === "客户名称") {
                return (
                  <th
                    scope="col"
                    className="py-3 px-6 font-semibold"
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
                    className="hidden lg:block py-3 px-6 font-semibold"
                    key={column}
                  >
                    {column}
                  </th>
                );
              }
              if (column || (!column && requireCheckButton)) {
                return (
                  <th
                    scope="col"
                    className="py-3 px-6 font-semibold"
                    key={column}
                  >
                    {column}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((row) => (
            <tr className="table-row-style" key={row.id}>
              <td
                onClick={() => toggleSidebarFunc(row)}
                scope="row"
                className="item-column-one-style row-general-style"
              >
                {row.formated_delivery_date} <br /> {row.formated_delivery_time}
              </td>
              <td className="row-general-style">
                {row.customer_name}
                <br /> {row.phone_number}
              </td>
              <td className="row-general-style">
                {row.items.map((item) => (
                  <p key={item.name + row.customer_name + row.id}>
                    {item.name}: {item.quantity}
                  </p>
                ))}
              </td>
              <td className="row-general-style">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "MYR",
                  currencyDisplay: "narrowSymbol",
                }).format(row.total_price)}
              </td>
              <td className="row-general-style hidden lg:block">
                {row.status}
              </td>
              {requireCheckButton && (
                <td className="row-general-style text-right">
                  <Button
                    customWidth="py-1 px-3"
                    onClick={() => {
                      updateOrderStatus(row);
                    }}
                  >
                    <CheckIcon width={15} height={15} />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
