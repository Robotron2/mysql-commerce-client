/* eslint-disable react-hooks/exhaustive-deps */
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

	const localProducts = JSON.parse(sessionStorage.getItem("products-admin"))
	const localAuth = JSON.parse(localStorage.getItem("accessToken"))
	const fetProducts = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/products?page=${page}`)
			if (response.data?.success && response.data?.allProducts.length > 0) {
				setProducts(response.data?.allProducts)
			}
			if (response.data?.success && response.data?.allProducts.length < 1) {
				setPage(1)
				// console.log(response)
				toast.success(response.data.message)
			}

			// setProducts(response.data.products)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetProducts()
	}, [page])
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	return (
		<>
			<div className="md:px-14 lg:px-44 mb-60">
				<div className=" bg-gray-300 px-[16px] rounded-md shadow-lg ">
					<div className="font-semibold text-gray-900 text-center text-xl pt-2 mt-4">{/* <h1>All Products</h1> */}</div>
					<div className="grid grid-cols-12  gap-4 pt-8">
						{products.length > 0 &&
							products.map((product) => {
								return (
									<div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white text-gray-800 h-full mx-2 rounded-md shadow-lg " key={product.id}>
										<div className="bg-white rounded-md transform lg:hover:scale-105 transition duration-300">
											<div className="h-60 w-full overflow-hidden">
												<LazyLoadImage
													alt="Product Image"
													src={product?.image}
													// src={`${baseUrl}/${imagePath}`}
													className=" object-cover rounded-md w-full h-full "
													placeholderSrc="../../../../src/assets/lazy.png"
												/>
											</div>

											<div className="p-2 rounded-md bg-white">
												<h2>
													<span className="font-semibold">Product Name: </span>
													{product.name.substring(0, 15) + "..."}
												</h2>
												<h2>
													<span className="font-semibold">Category: </span>
													{product.category.name}
												</h2>
												<p>
													<span className="font-semibold"> Quantity: </span>
													{product.countInStock}
												</p>
												<p>
													<span className="font-semibold">Description: </span>
													{product?.description.substring(0, 15) + "..."}
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
														// console.log(product.id)
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
						{products.length > 0 && (
							<button
								className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
								onClick={() => {
									setPage((prev) => prev + 1)
									console.log("I have been clicked")
								}}
							>
								Click More
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Read
