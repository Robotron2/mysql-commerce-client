/* eslint-disable react/prop-types */

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import UseCart from "../hooks/UseCart"

function AddToCartButton({ productId, quantity }) {
	const [isAdding, setIsAdding] = useState(false)

	const { setFetchCart, fetchCart } = UseCart()

	const handleAddToCart = async () => {
		if (isAdding) {
			return
		}

		setIsAdding(true)
		const localAuth = JSON.parse(localStorage.getItem("accessToken"))
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`

		try {
			const response = await axios.post(
				`${apiEndpoint}/carts/add`,
				{ productId, quantity },
				{
					headers: {
						accessToken: `${localAuth?.token}`,
					},
				}
			)
			// console.log(response)

			if (response.data.success) {
				toast.success("Product added to the cart!")
				setFetchCart(!fetchCart)
				// console.log(fetchCart)
				setIsAdding(false)
			} else {
				toast.error("Failed to add the product to the cart.")
				setIsAdding(false)
			}
		} catch (error) {
			console.error(error)
			toast.error("An error occurred while adding the product to the cart.")
			setIsAdding(false)
		}
	}

	return (
		<div>
			<>
				<button
					onClick={handleAddToCart}
					disabled={isAdding}
					className=" w-full bg-gray-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-gray-700 transition ease-in-out duration-300 disabled:cursor-not-allowed"
				>
					{isAdding ? "Adding..." : "Add to Cart"}
				</button>
			</>
		</div>
	)
}

export default AddToCartButton
