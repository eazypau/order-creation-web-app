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
		setInputValue(data);
	}, [data]);

	const handleChange = (e: Event) => {
		console.log("update input values....");
		const { name, value } = e.target;
		setInputValue((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(inputValue);
	};

	return (
		<aside className="absolute right-0 top-0 z-20 lg:w-4/12 xl:w-1/4 2xl:w-3/12 px-5 py-10 bg-white h-full">
			<div className="flex items-center gap-2 mb-5">
				{/* only for create and update */}
				<button onClick={toggleSidebarFunc}>
					<ChevronDoubleRightIcon width={25} height={25} className="hover:opacity-70" />
				</button>
				<h5 className="sidebar-heading">{inputValue.orderNumber}</h5>
			</div>
			<div>
				<form>
					<div className="mb-2">
						<label htmlFor="customerName">Customer name:</label>
						<InputField
							hasBorder={true}
							type="text"
							name="customerName"
							placeholder="Enter name here"
							value={inputValue.customerName}
						/>
					</div>
					<label>List of items</label>
					<div className="mb-5 space-y-2">
						<div className="flex gap-2">
							<SelectBox />
							<InputField
								hasBorder
								customWidth="w-24"
								type="number"
								placeholder="0"
								name="qty1"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<Button customColor="bg-green-500 hover:bg-transparent">Done</Button>
					</div>
				</form>
			</div>
		</aside>
	);
};
