/* eslint-disable react/prop-types */
import { useState } from "react"

import ProductContext from "./ProductContext"

const ProductProvider = ({ children }) => {
	const [productId, setProductId] = useState("")
	const [categoryId, setCategoryId] = useState("")
	const [randomcategoryId, setRandomCategoryId] = useState("")
	const [categoryLength, setCategoryLength] = useState("")

	return (
		<ProductContext.Provider
			value={{ productId, setProductId, categoryId, setCategoryId, randomcategoryId, setRandomCategoryId, categoryLength, setCategoryLength }}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductProvider
