/* eslint-disable no-unused-vars */
import axios from "axios"
import { createRef, useEffect, useState } from "react"
import AdminLinks from "../components/AdminLinks"
import Header from "../../../Components/Layouts/Header"
import toast from "react-hot-toast"
import Create from "../components/Create"
import Read from "../components/Read"

const CrudProduct = () => {
	// Sublinks and Navigations
	const [create, setCreate] = useState(true)
	const [read, setRead] = useState(false)
	const [update, setUpdate] = useState(false)
	const [del, setDel] = useState(false)

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
								create
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setCreate(true)
								setRead(false)
								setDel(false)
								setUpdate(false)
							}}
						>
							Create Products
						</h6>
						<h6
							className={
								read
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setRead(true)
								setCreate(false)
								setDel(false)
								setUpdate(false)
							}}
						>
							Read Products
						</h6>
						<h6
							className={
								update
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setUpdate(true)
								setRead(false)
								setCreate(false)
								setDel(false)
							}}
						>
							Update Products
						</h6>
						<h6
							className={
								del
									? "font-semibold text-sm bg-white text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
									: "font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
							}
							onClick={() => {
								setDel(true)
								setUpdate(false)
								setRead(false)
								setCreate(false)
							}}
						>
							Delete Products
						</h6>
					</div>
				</>
			</div>
			<>{create && <Create />}</>
			<>{read && <Read />}</>
		</div>
	)
}

export default CrudProduct
