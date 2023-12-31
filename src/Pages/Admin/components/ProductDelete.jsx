/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
import UseProduct from "../hooks/UseProduct"
import UseCrud from "../hooks/UseCrud"
import toast from "react-hot-toast"
import { LazyLoadImage } from "react-lazy-load-image-component"

function ProductDelete() {
	const [isConfirming, setIsConfirming] = useState(false)
	const [product, setProduct] = useState()
	const { productId, setProductId } = UseProduct()
	const { view, setView } = UseCrud()

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
	const handleDelete = async () => {
		if (isConfirming) {
			try {
				const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/products/${productId}`, {
					headers: {
						Authorization: localAuth,
					},
				})
				// console.log(response)

				if (response.data.success) {
					setProductId("")
					setView("read")
					sessionStorage.removeItem("products-admin")
					toast.success(response.data.message)
				}
				if (response.data.suceess == false) {
					toast.error(response.data.message)
				}
				if (response.data.error) {
					toast.error(response.data.error)
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			setIsConfirming(true)
		}
	}

	const getProductToDelete = async () => {
		const response = await axios.get(`${baseUrl}/products/product?id=${productId}`)
		if (response.data.success) {
			setProduct(response.data.product)
		}
		// console.log(response)
	}
	useEffect(() => {
		getProductToDelete()
	}, [])

	let imagePath = product?.image
	return (
		<div>
			{isConfirming ? (
				<>
					<div className="bg-white rounded-md w-96 mx-auto mt-20 shadow-2xl p-4">
						<div className="p-2 rounded-md bg-white">
							<h2>
								Are you sure you want to delete
								<span className="font-semibold">{" " + product.name}</span>?
							</h2>
						</div>
						<div className="p-2 grid grid-cols-2 gap-2">
							<button
								onClick={() => setIsConfirming(false)}
								className="bg-yellow-300 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-yellow-400 transition ease-in-out duration-300"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300"
							>
								Confirm
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					{product && (
						<>
							<div className="bg-white rounded-md w-80 mx-auto mt-20 shadow-2xl">
								<div className="h-60 w-full overflow-hidden">
									<LazyLoadImage
										alt="Product Image"
										src={imagePath}
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
										{product?.Category?.categoryName}
									</h2>
									<p>
										<span className="font-semibold"> Quantity: </span>
										{product.countStock}
									</p>
									<p>
										<span className="font-semibold">Description: </span>
										{product.description.substring(0, 15) + "..."}
									</p>
									<p>
										<span className="font-semibold">Price: </span>
										<span className="font-bold ml-1">
											${product.price}.<span className="text-xs">99</span>
										</span>
									</p>
								</div>
								<div className="p-2 grid grid-cols-2 gap-2">
									<button
										className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-2 hover:bg-red-700 transition ease-in-out duration-300"
										onClick={() => setIsConfirming(true)}
									>
										Delete
									</button>
									<button
										className="bg-gray-700 text-white text-center rounded-md py-2 md:col-span-2 hover:bg-gray-800 transition ease-in-out duration-300"
										onClick={() => setView("read")}
									>
										Back
									</button>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default ProductDelete
