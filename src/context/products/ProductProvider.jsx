import { useState } from "react"
import ProductContext from "./ProductContext"

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
	const [productId, setProductId] = useState(null)

	return <ProductContext.Provider value={{ productId, setProductId }}>{children}</ProductContext.Provider>
}

export default ProductProvider
