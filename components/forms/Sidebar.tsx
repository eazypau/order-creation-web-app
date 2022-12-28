import React, { useState } from "react";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import {
    ChevronDoubleRightIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import { Order } from "../../types/Order";
import { useEffect } from "react";
// import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import en from "../../locales/en";
import cn from "../../locales/cn";

type Props = {
    data?: Order; // set to optional for now, will remove "?" when going to production
    toggleSidebarFunc?: () => void;
    buttonName?: string;
    process?: "create" | "update" | "添加" | "更新";
    options: any[];
    showSidebar: boolean;
    handleInputs: ({
        action,
        value,
        index,
    }: {
        action: string;
        value?: any;
        index?: number;
    }) => void;
    orderFunctionHandle: ({
        step,
        orderData,
    }: {
        step: string;
        orderData: Order;
    }) => void;
};

export const Sidebar = ({
    data,
    toggleSidebarFunc,
    buttonName = "update",
    process = "update",
    options,
    showSidebar = false,
    handleInputs,
    orderFunctionHandle,
}: Props) => {
    let router = useRouter();
    let t = router.locale === "en" ? en : cn;
    const [inputValue, setInputValue] = useState<Order>({
        id: -1,
        customerName: "",
        items: [],
        totalPrice: 0,
        status: "",
    });

    useEffect(() => {
        if (data) setInputValue(data);
        else
            setInputValue({
                id: -1,
                customerName: "",
                items: [],
                totalPrice: 0,
                status: "",
            });
    }, [data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        handleInputs({
            action: "edit-item-qty",
            value: e.target.value,
            index: index,
        });
    };

    const handleSelectChange = (e: any, index: number) => {
        // console.log(e);
        const { name } = e;
        handleInputs({ action: "edit-item-name", value: name, index: index });
    };

    const handleCreateNewItem = (e: Event) => {
        e.preventDefault();
        handleInputs({ action: "add-item" });
    };

    const handleRemoveOrderItem = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        index: number,
        id: number
    ) => {
        e.preventDefault();
        handleInputs({ action: "remove-item", index: index, value: id });
    };

    const orderMutationHandler = (event: Event) => {
        event.preventDefault();
        const step = buttonName;
        const orderData = { ...inputValue };
        let hasEmptyInput = false;
        // console.log("data provided: ", inputValue);
        inputValue.items.forEach((item) => {
            if (!item.name || !item.quantity) {
                hasEmptyInput = true;
            }
        });
        if (!inputValue.customerName) {
            alert("Please enter the customer name.");
            return;
        }
        if (inputValue.items.length < 1 || hasEmptyInput) {
            alert("Please select the product and quantity to proceed.");
            return;
        }
        orderFunctionHandle({
            step: step,
            orderData: orderData,
        });
    };

    return (
        <aside
            className={
                "absolute right-0 top-0 z-20 translate-x-0 lg:w-4/12 xl:w-1/4 2xl:w-3/12 px-5 py-5 lg:py-10 bg-white h-full overflow-hidden transition-all ease-out duration-300 " +
                (showSidebar ? "translate-x-0" : "translate-x-full")
            }
        >
            <div className="flex justify-between mb-3 lg:mb-5">
                <div className="flex items-center gap-1 lg:gap-2">
                    {/* only for create and update */}
                    <button
                        onClick={toggleSidebarFunc}
                        className="w-5 lg:w-fit"
                    >
                        <ChevronDoubleRightIcon className="w-5 lg:w-7 hover:opacity-70" />
                    </button>
                    <h5 className="sidebar-heading">
                        {Number(inputValue.id) !== -1
                            ? "Order number: #" + inputValue.id
                            : "Create Order"}
                    </h5>
                </div>
                <p
                    className={
                        "py-1 px-4 text-sm lg:text-base rounded-lg " +
                        (inputValue.status === "unfulfill"
                            ? "bg-amber-200"
                            : "bg-green-300")
                    }
                >
                    {inputValue.status}
                </p>
            </div>
            <div>
                <form>
                    <div className="mb-5">
                        <label
                            htmlFor="customerName"
                            className="pl-1 font-semibold text-sm lg:font-base"
                        >
                            {t.customerName}:
                        </label>
                        <InputField
                            hasBorder={true}
                            type="text"
                            name="customerName"
                            placeholder="Enter name here"
                            value={inputValue.customerName}
                            onChange={(e) => {
                                // setInputValue((prev) => ({
                                //     ...prev,
                                //     customerName: e.target.value,
                                // }));
                                handleInputs({
                                    action: "name-change",
                                    value: e.target.value,
                                });
                            }}
                            min="1"
                        />
                    </div>
                    <label className="pl-1 font-semibold text-sm lg:font-base">
                        {t.listOfItems}
                    </label>
                    <div className="mb-5 space-y-2">
                        {inputValue.items.map((item, index) => (
                            <div
                                key={item.id + inputValue.customerName + index}
                                className="flex gap-2"
                            >
                                <SelectBox
                                    value={item.name}
                                    options={options}
                                    onChange={(e) =>
                                        handleSelectChange(e, index)
                                    }
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
                                        onClick={(e) => {
                                            handleRemoveOrderItem(
                                                e,
                                                index,
                                                item.id
                                            );
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                        <Button
                            customWidth="px-3 py-1"
                            onClick={handleCreateNewItem}
                        >
                            <span className="flex items-center gap-1">
                                <PlusIcon className="w-4" /> Item
                            </span>
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            customWidth="w-36 py-3 capitalize"
                            onClick={orderMutationHandler}
                        >
                            <span>
                                {buttonName} -{" "}
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "MYR",
                                    currencyDisplay: "narrowSymbol",
                                }).format(inputValue.totalPrice)}
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </aside>
    );
};
