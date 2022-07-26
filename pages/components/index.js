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
// import styles from "../../styles/Home.module.css";

export default function Home() {
	return (
		<div className="bg-slate-200 min-h-screen flex flex-col justify-between">
			<div>
				<NavBar />
				<div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto">
					<p>Table</p>
					<Table />
					<div className="pt-10">
						<p>Pagination</p>
						<Pagination />
					</div>
					<div className="pt-10">
						<p>Button</p>
						<Button />
					</div>
					<div className="pt-10">
						<p>Text Input</p>
						<InputField />
					</div>
					<div className="pt-10">
						<Sidebar />
					</div>
					<div className="pt-10">
						<p>Select Box</p>
						<SelectBox />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
