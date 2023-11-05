/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios"
import { useState } from "react"
import UseProduct from "../hooks/UseProduct"
import UseCrud from "../hooks/UseCrud"
import toast from "react-hot-toast"

function ProductDelete() {
	const [isConfirming, setIsConfirming] = useState(false)
	const { productId, setProductId } = UseProduct()
	const { view, setView } = UseCrud()

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const handleDelete = async () => {
		if (isConfirming) {
			try {
				const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
				const response = await axios.delete(
					`${baseUrl}/products/product/${productId}`,
					{
						headers: {
							accessToken: `${localAuth?.token}`,
						},
					}
				)

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
				// Handle network or other errors
			}
		} else {
			setIsConfirming(true)
		}
	}

	return (
		<div>
			{isConfirming ? (
				<div>
					<p>Are you sure you want to delete this product?</p>
					<button onClick={handleDelete}>Confirm</button>
					<button onClick={() => setIsConfirming(false)}>Cancel</button>
				</div>
			) : (
				<button onClick={() => setIsConfirming(true)}>Delete</button>
			)}
		</div>
	)
}

export default ProductDelete
