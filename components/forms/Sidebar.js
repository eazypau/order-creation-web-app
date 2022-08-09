import React from "react";
import PropTypes from "prop-types";
import { Button } from "../global/Button";
import { InputField } from "./InputField";
import { SelectBox } from "./SelectBox";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

export const Sidebar = ({ toggleSidebarFunc }) => {
  return (
    <aside className="absolute right-0 top-0 lg:w-3/12 xl:w-1/4 2xl:w-3/12 px-5 py-10 bg-white body-height">
      <div className="flex items-center gap-2 mb-5">
        {/* only for create and update */}
        <button onClick={toggleSidebarFunc}>
          <ChevronDoubleRightIcon
            width={25}
            height={25}
            className="hover:opacity-70"
          />
        </button>
        <h5 className="sidebar-heading">Order number</h5>
      </div>
      <div>
        <form>
          <div className="mb-2">
            <label>Customer name:</label>
            <InputField
              hasBorder={true}
              type="text"
              placeholder="Enter name here"
            />
          </div>
          <label>List of items</label>
          <div className="mb-5 space-y-2">
            <div className="flex gap-2">
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
            </div>
            <div className="flex gap-2">
              <SelectBox />
              <InputField
                hasBorder
                type="number"
                placeholder="0"
                customWidth="w-24"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button />
          </div>
        </form>
      </div>
    </aside>
  );
};

Sidebar.prototype = {
  toggleSidebarFunc: PropTypes.func,
};
