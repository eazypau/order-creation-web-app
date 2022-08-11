// import Head from "next/head";
// import Image from "next/image";
import { Footer } from "../../components/global/Footer";
import { NavBar } from "../../components/global/NavBar";
import { Pagination } from "../../components/data_display/Pagination";
import { Table } from "../../components/data_display/Table";
import { Button } from "../../components/global/Button";
import { InputField } from "../../components/forms/InputField";
import { Sidebar } from "../../components/forms/Sidebar";
import { SelectBox } from "../../components/forms/SelectBox";
import { useState } from "react";
// import styles from "../../styles/Home.module.css";

const tableHeader = [
  "Order No.",
  "Customer Name",
  "Items",
  "Total Price (RM)",
  "Status",
  "", // empty column for fulfilled order tick button
];

const dummyOrders = [
  {
    orderNumber: 1,
    customerName: "Jennifer",
    items: [
      {
        itemName: "Dou Sha Bing",
        quantity: 1,
      },
      {
        itemName: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 32,
    status: "unfulfilled",
  },
  {
    orderNumber: 2,
    customerName: "Jennifer",
    items: [
      {
        itemName: "Dou Sha Bing",
        quantity: 1,
      },
      {
        itemName: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 32,
    status: "unfulfilled",
  },
  {
    orderNumber: 3,
    customerName: "Jennifer",
    items: [
      {
        itemName: "Dou Sha Bing",
        quantity: 1,
      },
      {
        itemName: "Xiang Bing",
        quantity: 10,
      },
    ],
    totalPrice: 32,
    status: "unfulfilled",
  },
];

export default function Home() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="bg-slate-200 flex flex-col justify-between">
      <NavBar />
      <div className="relative">
        <div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
          <p>Table</p>
          <Table tableHeader={tableHeader} tableContent={dummyOrders} />
          <div className="pt-4">
            <p>Pagination</p>
            <Pagination />
          </div>
          <div className="pt-4">
            <p>Button</p>
            <Button>Confirm</Button>
          </div>
          <div className="pt-4">
            <p>Text Input</p>
            <InputField />
          </div>
          <div className="pt-4">
            <Sidebar />
          </div>
          <div className="pt-4 pb-20">
            <p>Select Box</p>
            <SelectBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
