"use client";
import React, { useState } from "react";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import {
  ChevronDoubleRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Order } from "../../types/Order";
import { useEffect } from "react";
import { useSidebarStore } from "@/store/sidebarControl";
import { ProductObj } from "@/types/Product";
import { calculateTotalPrice } from "@/helpers/calculateTotalPrice";
import { orderInitialState } from "@/utils/const";

type Props = {
  data?: Order; // set to optional for now, will remove "?" when going to production
  options: ProductObj[];
  labels: {
    items: string;
    orderNumber: string;
    customerName: string;
    deliveryDate: string;
    listOfItems: string;
    createOrder: string;
    phoneNumber: string;
  };
  orderFunctionHandle: ({ orderData }: { orderData: Order }) => Promise<void>;
};

export const Sidebar = ({
  data,
  options,
  labels,
  orderFunctionHandle,
}: Props) => {
  //store
  const { isSiderbarOpen, setIsSidebarOpen, type } = useSidebarStore();
  //state
  const [inputValue, setInputValue] = useState<Order>(orderInitialState);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setInputValue(data);
    } else setInputValue(orderInitialState);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const items = [...inputValue.items];
    items[index] = {
      ...items[index],
      quantity: Number(e.target.value),
    };
    const totalPrice = calculateTotalPrice({ items, productList: options });
    setInputValue((prev) => ({
      ...prev,
      items,
      total_price: totalPrice,
    }));
  };

  const handleSelectChange = (e: any, index: number) => {
    const { name } = e;
    const items = [...inputValue.items];
    items[index] = {
      ...items[index],
      name: name,
    };
    const totalPrice = calculateTotalPrice({ items, productList: options });
    setInputValue((prev) => ({
      ...prev,
      items,
      total_price: totalPrice,
    }));
  };

  const handleCreateNewItem = (e: Event) => {
    e.preventDefault();
    console.log("clicked");
    const items = [...inputValue.items];
    items.push({
      name: "",
      quantity: 1,
    });
    setInputValue((prev) => ({
      ...prev,
      items,
    }));
  };

  const handleRemoveOrderItem = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const items = [...inputValue.items];
    items.splice(index, 1);
    const totalPrice = calculateTotalPrice({ items, productList: options });
    setInputValue((prev) => ({
      ...prev,
      items,
      total_price: totalPrice,
    }));
  };

  const orderMutationHandler = async (event: Event) => {
    event.preventDefault();
    const orderData = { ...inputValue };
    let hasEmptyInput = false;
    const itemList: string[] = [];

    orderData.items.forEach((item) => {
      itemList.push(item.name);
      if (!item.name || !item.quantity) {
        hasEmptyInput = true;
      }
    });
    if (new Set(itemList).size !== itemList.length) {
      alert(
        "You are not allow to have duplicate items. Please remove or choose a different item to proceed"
      );
      return;
    }
    if (!orderData.customer_name) {
      alert("Please enter the customer name.");
      return;
    }
    if (orderData.items.length < 1 || hasEmptyInput) {
      alert("Please select the product and quantity to proceed.");
      return;
    }
    orderData.status = "unfulfilled";

    await orderFunctionHandle({
      orderData: orderData,
    });
  };

  return (
    <aside
      className={
        "absolute right-0 top-0 z-20 translate-x-0 w-11/12 md:w-7/12 lg:w-4/12 xl:w-1/3 2xl:w-3/12 px-5 py-5 lg:py-10 bg-white h-full overflow-hidden transition-all ease-out duration-300 " +
        (isSiderbarOpen ? "translate-x-0" : "translate-x-full")
      }
    >
      <div className="flex items-center justify-between mb-3 lg:mb-5">
        <div className="flex items-center gap-1">
          {/* only for create and update */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-5 lg:w-fit"
          >
            <ChevronDoubleRightIcon className="w-5 lg:w-7 hover:opacity-70" />
          </button>
          <h5 className="sidebar-heading">
            {inputValue.id
              ? labels.orderNumber + ": " + inputValue.id.slice(0, 5) + "..."
              : labels.createOrder}
          </h5>
        </div>
        {inputValue.status && (
          <p
            className={
              "py-1 px-4 text-sm lg:text-base rounded-lg capitalize " +
              (inputValue.status === "unfulfill"
                ? "bg-amber-200"
                : "bg-green-300")
            }
          >
            {inputValue.status}
          </p>
        )}
      </div>
      <div>
        <form>
          <div className="mb-2">
            <label
              htmlFor="customer_name"
              className="pl-1 font-semibold text-sm lg:font-base"
            >
              {labels.customerName}:
            </label>
            <InputField
              hasBorder={true}
              type="text"
              id="customer_name"
              name="customer_name"
              placeholder="Enter name here"
              value={inputValue.customer_name}
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  customer_name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone_number"
              className="pl-1 font-semibold text-sm lg:font-base"
            >
              {labels.phoneNumber}:
            </label>
            <InputField
              hasBorder={true}
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Enter Phone Number here"
              value={inputValue.phone_number}
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="delivery_date"
              className="pl-1 font-semibold text-sm capitalize lg:font-base"
            >
              {labels.deliveryDate}:
            </label>
            <InputField
              hasBorder={true}
              type="datetime-local"
              id="delivery_date"
              name="delivery_date"
              placeholder="Choose delivery date here"
              value={inputValue.delivery_date}
              onChange={(e) => {
                setInputValue((prev) => ({
                  ...prev,
                  delivery_date: e.target.value,
                }));
              }}
              min="1"
            />
          </div>
          <label className="pl-1 font-semibold text-sm lg:font-base">
            {labels.listOfItems}
          </label>
          <div className="mb-5 space-y-2">
            {inputValue.items?.map((item, index) => (
              <div
                key={item.name + inputValue.customer_name + index}
                className="flex gap-2"
              >
                <SelectBox
                  value={item.name}
                  options={options}
                  onChange={(e) => handleSelectChange(e, index)}
                />
                <InputField
                  hasBorder
                  customWidth="w-24"
                  type="number"
                  placeholder="0"
                  customTextAlign="text-center"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleChange(e, index)}
                />
                {inputValue.items.length > 1 ? (
                  <TrashIcon
                    className="w-7 h-7 my-auto hover:text-red-600 transition-colors ease-in duration-300 cursor-pointer"
                    onClick={(
                      e: React.MouseEvent<SVGSVGElement, MouseEvent>
                    ) => {
                      handleRemoveOrderItem(e, index);
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
            <Button customWidth="px-3 py-1" onClick={handleCreateNewItem}>
              <span className="flex items-center gap-1">
                <PlusIcon className="w-4" /> {labels.items}
              </span>
            </Button>
          </div>
          <div className="flex justify-end">
            <Button customWidth="p-3 capitalize" onClick={orderMutationHandler}>
              <span>
                {type} -{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "MYR",
                  currencyDisplay: "narrowSymbol",
                }).format(inputValue.total_price)}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
};
