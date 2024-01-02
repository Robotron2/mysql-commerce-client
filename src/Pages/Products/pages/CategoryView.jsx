/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../../Components/Layouts/Header"
import CategoryLinks from "../../Home/components/CategoryLinks"
import ProductList from "../components/ProductList"
import UseProduct from "../../Admin/hooks/UseProduct"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

function CategoryView() {
	const [availableProducts, setAvailableProducts] = useState([])
	const [isAvailable, setIsAvailable] = useState()
	const { categoryId } = UseProduct()

	const { id } = useParams()

	const getProductsByCategory = async () => {
		const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const response = await axios.get(`${baseUrl}/products/category?id=${id}`)
			console.log(response)
			if (response.data?.success && response.data.allProducts?.length > 0) {
				setIsAvailable(true)
				setAvailableProducts(response.data.allProducts)
			} else {
				setIsAvailable(false)
			}
		} catch (error) {
			console.error(error)
			toast.error("An error occured.")
		}
	}
	useEffect(() => {
		getProductsByCategory()
	}, [categoryId])
	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			<Header />
			<div className="md:px-14 lg:px-20 bg-gray-900">
				<CategoryLinks />
			</div>
			{isAvailable ? (
				<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
					<ProductList products={availableProducts} />
				</div>
			) : (
				<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">No product available in this category</div>
			)}
		</motion.div>
	)
}

export default CategoryView
