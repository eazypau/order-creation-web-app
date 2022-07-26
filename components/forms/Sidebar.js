import React from "react";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";

export const Sidebar = () => {
	return (
		<aside className="absolute right-0 top-0 lg:w-3/12 2xl:w-3/12 px-5 py-10 bg-white bodyHeight">
			<div>
        {/* only for create and update */}
				<h5 className="sidebarHeading mb-5">Sidebar Title: Order number</h5>
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
  						<InputField hasBorder type="number" placeholder="0" />
  					</div>
            <div className="flex gap-2">
  						<SelectBox />
  						<InputField hasBorder type="number" placeholder="0" />
  					</div>
            <div className="flex gap-2">
  						<SelectBox />
  						<InputField hasBorder type="number" placeholder="0" />
  					</div>
					</div>
					<Button />
				</form>
			</div>
		</aside>
	);
};
