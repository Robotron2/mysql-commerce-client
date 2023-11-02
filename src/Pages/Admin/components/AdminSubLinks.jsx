import { useState } from "react"

function AdminSubLinks() {
	const [create, setCreate] = useState(true)
	const [read, setRead] = useState(false)
	const [update, setUpdate] = useState(false)
	const [del, setDel] = useState(false)

	return (
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
	)
}

export default AdminSubLinks
