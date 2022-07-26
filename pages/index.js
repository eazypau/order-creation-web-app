// import Head from "next/head";
// import Image from "next/image";
import { Footer } from "../components/global/Footer";
import { NavBar } from "../components/global/NavBar";
import { Pagination } from "../components/data_display/Pagination";
import { Table } from "../components/data_display/Table";
import { Button } from "../components/global/Button";
import { InputField } from "../components/forms/InputField";
import { Sidebar } from "../components/forms/Sidebar";
import { SelectBox } from "../components/forms/SelectBox";
// import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className="bg-slate-200">
			<NavBar />
			<div className="relative">
				<div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto bodyHeight">
					<Table />
					<Sidebar />
				</div>
			</div>
			<Footer />
		</div>
	);
}

// TODO:
// - need sweet alert for delete function
// - create reusable button, inputs and selector
// - sidebar only use for create and update
// - features: create, update, delete and mark as done
