// import Head from "next/head";
// import Image from "next/image";
import { Footer } from "../components/global/Footer";
import { NavBar } from "../components/global/NavBar";
import { Pagination } from "../components/data_display/Pagination";
import { Table } from "../components/data_display/Table";
import { Button } from "../components/global/Button";
import { TextInput } from "../components/forms/TextInput";
import { Sidebar } from "../components/forms/Sidebar";
// import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className="bg-slate-200 min-h-screen flex flex-col justify-between">
			<div>
			  <NavBar />
				<div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto">
					<Table />
					<div className="pt-10">
						<Pagination />
					</div>
					<div className="pt-10">
						<Button />
					</div>
          <div className="pt-10">
						<TextInput />
					</div>
          <div className="pt-10">
						<Sidebar />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
