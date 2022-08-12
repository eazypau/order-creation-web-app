import React, { useState } from "react";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

type Props = {
	data?: object, // set to optional for now, will remove "?" when going to production
	toggleSidebarFunc?: () => void
}

export const Sidebar = ({ data, toggleSidebarFunc }: Props) => {
	const [inputValue, setInputValue] = useState([]);

	const handleChange = (e: Event) => {
		console.log("update input values....");
	};

	return (
		<aside className="absolute right-0 top-0 z-20 lg:w-4/12 xl:w-1/4 2xl:w-3/12 px-5 py-10 bg-white h-full">
			<div className="flex items-center gap-2 mb-5">
				{/* only for create and update */}
				<button onClick={toggleSidebarFunc}>
					<ChevronDoubleRightIcon width={25} height={25} className="hover:opacity-70" />
				</button>
				<h5 className="sidebar-heading">Order number</h5>
			</div>
			<div>
				<form>
					<div className="mb-2">
						<label>Customer name:</label>
						<InputField hasBorder={true} type="text" placeholder="Enter name here" />
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
						{/* <div className="flex gap-2">
              <SelectBox />
              <InputField
                hasBorder
                type="number"
                placeholder="0"
                customWidth="w-24"
              />
            </div>
            <div className="flex gap-2">
              <SelectBox />
              <InputField
                hasBorder
                type="number"
                placeholder="0"
                customWidth="w-24"
              />
            </div> */}
					</div>
					<div className="flex justify-end">
						<Button customColor="bg-green-500 hover:bg-transparent">Done</Button>
					</div>
				</form>
			</div>
		</aside>
	);
};
