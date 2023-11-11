/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useParams } from "react-router-dom"
import Header from "../../../Components/Layouts/Header"
import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import toast from "react-hot-toast"

function ViewProduct() {
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	const { id } = useParams()
	const [product, setProduct] = useState({})
	const [imagePath, setImagePath] = useState("")
	const [isAvailable, setIsAvailable] = useState()
	const getProductDetails = async () => {
		const response = await axios.get(`${baseUrl}/products/product/${id}`)
		if (response.data.success) {
			setIsAvailable(true)
			setProduct(response.data.product)
			setImagePath(response.data.product.Image.filePath)
		} else if (!response.data.success) {
			toast.error(response.data.error)
			setIsAvailable(false)
		}
	}
	useEffect(() => {
		getProductDetails()
	}, [])

	console.log(imagePath)
	return (
		<>
			<Header />
			{isAvailable ? (
				<>
					<div>{product.productName}</div>
					<div>{product.description}</div>
					<div>{product.price}</div>
					<div>{product.stockQuantity}</div>
					<LazyLoadImage
						alt="Product Image"
						src={`${baseUrl}/${imagePath}`}
						className=" object-cover rounded-md w-full h-full "
						placeholderSrc="../../../../src/assets/lazy.png"
					/>
				</>
			) : (
				<>Product not available</>
			)}
		</>
	)
}

export default ViewProduct
