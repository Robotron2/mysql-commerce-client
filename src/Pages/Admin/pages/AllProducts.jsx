import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../../../Components/Layouts/Header"
import AdminLinks from "../components/AdminLinks"
import { motion } from "framer-motion"

function AllProducts() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_REACT_APP_API}/products`)
			.then((response) => {
				// console.log(response.data.products)
				setProducts(response.data.products)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			<Header />
			<div className="md:px-14 lg:px-44 bg-gray-900">
				<AdminLinks />
			</div>
			<div className="font-semibold text-gray-900 text-center text-lg">
				<h1>All Products</h1>
			</div>
			<div className="md:px-14 lg:px-44">
				<div className="flex justify-between mt-10 shadow-sm bg-red-600 p-0">
					{products.map((product) => {
						let imagePath = product.Image.filePath.replace("/public//g", "")
						return (
							<div className="bg-white text-gray-800 h-full mx-2" key={product.id}>
								<img src={`${baseUrl}/${imagePath}`} alt="Product Image" className=" object-cover h-full rounded-md" />
								<div className="p-2 rounded-md">
									<h2>{product.productName}</h2>
									{product.Category.categoryName}
									<p>Stock Quantity: {product.stockQuantity}</p>
									<p>{product.description}</p>
									<p>Price: {product.price}</p>
								</div>
							</div>
						)
					})}
					{/* {console.log(products[0].Category.category_name)} */}
					{/* {console.log(products[6].Image.image)} */}
				</div>
			</div>
		</motion.div>
	)
}

export default AllProducts
