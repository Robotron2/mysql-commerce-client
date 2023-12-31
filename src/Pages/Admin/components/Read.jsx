/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LazyLoadImage } from "react-lazy-load-image-component"
import UseProduct from "../hooks/UseProduct"
import UseCrud from "../hooks/UseCrud"
// import { Link } from "react-router-dom"
// import lazy from "../../../assets/lazy.png"

function Read() {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const { productId, setProductId } = UseProduct()
	const { view, setView } = UseCrud()
	// const [view, setView] = useState("read")

	useEffect(() => {
		const localProducts = JSON.parse(sessionStorage.getItem("products-admin"))
		if (localProducts && page == 1) {
			setProducts(localProducts)
		} else {
			axios
				.get(`${import.meta.env.VITE_REACT_APP_API}/products?page=${page}`)
				.then((response) => {
					// console.log(response)
					if (response.data.products.length === 0) {
						// toast.error("All products have been fetched!")
						toast("All products have been fetched!")
						setPage(1)
					}
					if (page === 1) {
						sessionStorage.setItem("products-admin", JSON.stringify(response.data.products))
						setProducts(response.data.products)
					}
					setProducts(response.data.products)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [page])
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	return (
		<>
			<div className="md:px-14 lg:px-44 mb-96">
				<div className=" bg-gray-300 px-[16px] rounded-md shadow-lg pb-4">
					<div className="font-semibold text-gray-900 text-center text-xl pt-10 mt-10">
						<h1>All Products</h1>
					</div>
					<div className="grid grid-cols-12  gap-4 pt-8">
						{products.map((product) => {
							let imagePath = product.Image?.filePath.replace("/public//g", "")
							return (
								<div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white text-gray-800 h-full mx-2 rounded-md shadow-lg " key={product.id}>
									<div className="bg-white rounded-md transform lg:hover:scale-105 transition duration-300">
										<div className="h-60 w-full overflow-hidden">
											<LazyLoadImage alt="Product Image" src={`${baseUrl}/${imagePath}`} className=" object-cover rounded-md w-full h-full " placeholderSrc="../../../../src/assets/lazy.png" />
										</div>

										<div className="p-2 rounded-md bg-white">
											<h2>
												<span className="font-semibold">Product Name: </span>
												{product.productName.substring(0, 15) + "..."}
											</h2>
											<h2>
												<span className="font-semibold">Category: </span>
												{product.Category.categoryName}
											</h2>
											<p>
												<span className="font-semibold"> Quantity: </span>
												{product.stockQuantity}
											</p>
											<p>
												<span className="font-semibold">Description: </span>
												{product.description.substring(0, 15) + "..."}
											</p>
											<p>
												<span className="font-semibold">Price: </span>
												<span className="font-bold ml-1">${product.price}</span>
											</p>
										</div>
										<div className="p-2 grid grid-cols-2 gap-2">
											<button
												className="bg-green-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-green-700 transition ease-in-out duration-300"
												onClick={() => {
													setProductId(product.id)
													setView("update")
												}}
											>
												Update
											</button>
											<button
												className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300"
												onClick={() => {
													setProductId(product.id)
													setView("delete")
												}}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
					<div className="p-8 mx-auto w-full mt-4 flex justify-center">
						<button
							className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
							onClick={() => {
								setPage(page + 1)
							}}
						>
							Click More
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Read
