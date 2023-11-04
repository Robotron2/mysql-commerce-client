/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LazyLoadImage } from "react-lazy-load-image-component"
import UseProduct from "../hooks/UseProduct"
// import { Link } from "react-router-dom"
// import lazy from "../../../assets/lazy.png"

function Read() {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const { productId, setProductId } = UseProduct()
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
			<div className="md:px-14 lg:px-44">
				<div className=" bg-gray-300 px-[16px] rounded-md shadow-lg">
					<div className="font-semibold text-gray-900 text-center text-xl pt-10 mt-10">
						<h1>All Products</h1>
					</div>
					<div className="grid grid-cols-12  gap-4 pt-8">
						{products.map((product) => {
							let imagePath = product.Image.filePath.replace("/public//g", "")
							return (
								<div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white text-gray-800 h-full mx-2 rounded-md shadow-lg " key={product.id}>
									<div className="bg-white rounded-md transform lg:hover:scale-105 transition duration-500">
										<LazyLoadImage
											alt="Product Image"
											src={`${baseUrl}/${imagePath}`}
											className=" object-cover h-full rounded-md w-full"
											placeholderSrc="../../../../src/assets/lazy.png"
										/>

										{/* <img src={`${baseUrl}/${imagePath}`} alt="Product Image" className=" object-cover h-full rounded-md" /> */}
										<div className="p-2 rounded-md bg-white">
											<h2>Product Name: {product.productName}</h2>
											<h2>Category: {product.Category.categoryName}</h2>
											<p>Stock Quantity: {product.stockQuantity}</p>
											<p>Description {product.description}</p>
											<p>
												Price:
												<span className="font-bold ml-1">
													${product.price}.<span className="text-xs">99</span>
												</span>
											</p>
										</div>
										<div className="p-2 grid grid-cols-2 gap-2">
											{/* <Link className="bg-green-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-green-700 transition ease-in-out duration-300">Update</Link> */}
											{/* <Link className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300">Delete</Link> */}
											<button
												className="bg-green-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-green-700 transition ease-in-out duration-300"
												onClick={() => {
													setProductId(product.id)
													toast(product.id)
												}}
											>
												Update
											</button>
											<button
												className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300"
												onClick={() => {
													setProductId(product.id)
													toast(product.id)
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
					<div className="my-20 justify-self-center">
						<button
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
