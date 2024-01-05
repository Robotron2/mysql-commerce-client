/* eslint-disable no-unused-vars */
import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import UseCart from "../../Pages/Products/hooks/UseCart"
import axios from "axios"
import toast from "react-hot-toast"

const CartComponent = () => {
	const { cartLength, fetchCart, setFetchCart, totalValue, cartItems } = UseCart()
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
	const handleRemoveItem = async (itemId) => {
		const localAuth = JSON.parse(localStorage.getItem("accessToken"))
		try {
			const response = await axios.delete(`${baseUrl}/carts/remove/${itemId}`, {
				headers: {
					accessToken: `${localAuth?.token}`,
				},
			})

			if (response.status === 204) {
				toast.success("Item removed successfully")
				setFetchCart(!fetchCart)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<div className=" px-6 sm:px-8 md:px-14 lg:px-20 mt-6 mx-auto lg:grid lg:grid-cols-6 gap-4">
				{cartItems.map((item, i) => {
					let imagePath = item.product.image
					// console.log(item)
					return (
						<div className="item bg-gray-100 rounded-md my-2 lg:col-span-2 grid grid-cols-5  gap-2 sm:gap-5 shadow-md p-2 sm:p-4 md:p-6" key={i + 1}>
							<div className="h-20 sm:h-28 md:h-40 w-full overflow-hidden col-span-2">
								<LazyLoadImage
									alt="Product Image"
									src={imagePath}
									className=" object-cover rounded-md w-full h-full "
									placeholderSrc="../../../src/assets/lazy.png"
								/>
							</div>
							<div className="product-text col-span-3 grid grid-cols-1">
								<span className="text-md break-words">
									{item.product.name.length > 15 ? item.product.name.substring(0, 15) + "..." : item.product.name}
								</span>
								<span className="text-md">Price: ${item.product.price}</span>
								<span className="text-md">Quantity: {item.quantity}</span>
								<span>
									<button className="bg-gray-500 hover:bg-gray-700 p-1 text-white rounded-md " onClick={() => handleRemoveItem(item.cartItemId)}>
										Remove item
									</button>
								</span>
							</div>
						</div>
					)
				})}
			</div>
			<div className=" px-6 sm:px-8 md:px-14 lg:px-20 mt-6 w-full mb-28">
				{cartLength > 0 ? (
					<center>
						<button className="bg-gray-500 hover:bg-gray-700 p-2 text-white rounded-md mx-auto my-0">Proceed to checkout ${totalValue}</button>
					</center>
				) : (
					<center>
						<h1 className="bg-gray-500 hover:bg-gray-700 p-2 text-white rounded-md mx-auto my-0">Nothing to checkout here</h1>
					</center>
				)}
			</div>
		</div>
	)
}

export default CartComponent
