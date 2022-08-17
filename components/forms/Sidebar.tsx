import React, { useState } from "react";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { Order } from "../../types/Order";
import { useEffect } from "react";

type Props = {
    data?: Order; // set to optional for now, will remove "?" when going to production
    toggleSidebarFunc?: () => void;
};

export const Sidebar = ({ data, toggleSidebarFunc }: Props) => {
    const [inputValue, setInputValue] = useState<Order>({
        orderNumber: "",
        customerName: "",
        items: [],
        totalPrice: 0,
        status: "",
    });

    useEffect(() => {
        if (data) setInputValue(data);
        else
            setInputValue({
                orderNumber: "",
                customerName: "",
                items: [],
                totalPrice: 0,
                status: "",
            });
    }, [data]);

    const handleChange = (e: any, index?: number) => {
        if (index >= 0) {
            let previousInput = { ...inputValue };
            let items = previousInput.items;
            items[index] = {
                ...items[index],
                quantity: e.target.value,
            };
            setInputValue((prev) => ({
                ...prev,
                items: items,
            }));
        }
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: any, index: number) => {
        console.log(e);
        const { name } = e;
        let previousInput = { ...inputValue };
        let items = previousInput.items;
        items[index] = {
            ...items[index],
            itemName: name,
        };
        setInputValue((prev) => ({
            ...prev,
            items: items,
        }));
    };

    return (
        <aside className="absolute right-0 top-0 z-20 lg:w-4/12 xl:w-1/4 2xl:w-3/12 px-5 py-5 lg:py-10 bg-white h-full">
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
                        {inputValue.orderNumber}
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
                            Customer name:
                        </label>
                        <InputField
                            hasBorder={true}
                            type="text"
                            name="customerName"
                            placeholder="Enter name here"
                            value={inputValue.customerName}
                            onChange={handleChange}
                        />
                    </div>
                    <label className="pl-1 font-semibold text-sm lg:font-base">
                        List of items
                    </label>
                    <div className="mb-5 space-y-2">
                        {inputValue.items.map((item, index) => (
                            <div
                                key={inputValue.orderNumber + "-" + index}
                                className="flex gap-2"
                            >
                                <SelectBox
                                    value={item.itemName}
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
                                    name={inputValue.orderNumber + "-" + index}
                                    value={item.quantity}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button customColor="bg-green-500 hover:bg-transparent">
                            Done
                        </Button>
                    </div>
                </form>
            </div>
        </aside>
    );
};
