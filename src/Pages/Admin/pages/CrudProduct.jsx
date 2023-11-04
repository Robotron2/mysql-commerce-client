/* eslint-disable no-unused-vars */
import axios from "axios"
import { createRef, useEffect, useState } from "react"
import AdminLinks from "../components/AdminLinks"
import Header from "../../../Components/Layouts/Header"
import toast from "react-hot-toast"
import Create from "../components/Create"
import Read from "../components/Read"
import Update from "../components/Update"
import UseCrud from "../hooks/UseCrud"

const CrudProduct = () => {
	const { view, setView } = UseCrud()
	// const [view, setView] = useState("read")

	return (
		<div>
			<Header />
			<div className="md:px-14 lg:px-44 bg-gray-900">
				<AdminLinks />
			</div>
			<div className="md:px-14 lg:px-44 bg-gray-500">
				<>
					<div className="w-full secondary-nav md:flex justify-around lg:justify-between items-center p-3 text-white">
						<h6
							className={
								view === "create"
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setView("create")
							}}
						>
							Create Products
						</h6>
						<h6
							className={
								view === "read"
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setView("read")
							}}
						>
							Read Products
						</h6>
						<h6
							className={
								view === "update"
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
						>
							Update Products
						</h6>
					</div>
				</>
			</div>

			{view === "read" && <Read />}
			{view === "create" && <Create />}
			{view === "update" && <Update />}
		</div>
	)
}

export default CrudProduct
