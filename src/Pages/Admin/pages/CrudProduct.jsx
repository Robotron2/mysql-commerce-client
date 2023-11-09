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
import ProductDelete from "../components/ProductDelete"
import { Link } from "react-router-dom"

const CrudProduct = () => {
	const { view, setView } = UseCrud()
	const [nav, setNav] = useState(false)

	return (
		<div>
			<div className="bg-gray-800 text-white">
				{nav && (
					<>
						<div className="overlay w-full h-screen bg-black/80 fixed top-0 left-0 z-10 transition ease-in-out duration-500"></div>
						<div className="fixed top-0 left-0 w-[300px] h-screen bg-gray-800 text-white z-10 duration-500">
							{/* close nav */}
							<div
								className="flex justify-between items-center p-1 text-white"
								onClick={() => setNav(!nav)}
							>
								<h2 className="text-2xl p-4 ">
									Robo<span className="font-bold underline">Shopp</span>
								</h2>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-8 h-8 mr-2 font-extrabold cursor-pointer"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
							<nav>
								<ul className="flex flex-col p-4 text-white mt-10">
									<Link>
										<li className="text-lg flex my-2">Dashboard</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Product Management</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Order Mangement</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">User Management</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Reports and ANalytics</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Settings</li>
									</Link>
								</ul>
							</nav>
						</div>
					</>
				)}
			</div>
			<Header />
			{/* <div
				className="nav-menu md:hidden text-white text-2xl  flex items-center"
				onClick={() => setNav(!nav)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</div> */}
			<div className="hidden md:block md:px-14 lg:px-44 bg-gray-900">
				<AdminLinks />
			</div>
			<div className="hidden md:block md:px-14 lg:px-44 bg-gray-500">
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
							Create Product
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
							Update Product
						</h6>
						<h6
							className={
								view === "delete"
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
						>
							Delete Product
						</h6>
					</div>
				</>
			</div>

			{view === "read" && <Read />}
			{view === "create" && <Create />}
			{view === "update" && <Update />}
			{view === "delete" && <ProductDelete />}
		</div>
	)
}

export default CrudProduct
