import React from "react";
import { NavBar } from "../../components/global/NavBar";

const products = () => {
    return (
        <div className="bg-slate-200">
            <NavBar
                hasCTAButton={false}
                toggleSidebarToCreate={() => {
                    console.log("do nothing");
                }}
            />
            <div className="py-10 px-10">
                <h1>Product page</h1>
            </div>
        </div>
    );
};

export default products;
