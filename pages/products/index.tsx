import React from "react";
import { Footer } from "../../components/global/Footer";
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
            <div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
                <h1>Product page</h1>
            </div>
            <Footer />
        </div>
    );
};

export default products;
