/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ProductList from "../../../Pages/Products/components/ProductList"
import Header from "../Header"

const SearchResult = () => {
	const [products, setProducts] = useState([])
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const keyword = searchParams.get("keyword")

	const handleSearch = async () => {
		if (!keyword) {
			return navigate("/")
		}

		try {
			const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`

			const response = await axios.get(
				`${apiEndpoint}/products/search?keyword=${keyword}`
			)
			// console.log(response)
			setProducts(response.data?.products)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		handleSearch()
	}, [])

	return (
		<>
			<Header />
			<div className="md:px-14 lg:px-44 mb-96">
				<h1>Searched Results</h1>

				<ProductList products={products} />
				{/* <div className="p-8 mx-auto w-full mt-4 flex justify-center">
					<button
						className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
						onClick={() => {
							setPage(page + 1)
						}}
					>
						Click More
					</button>
				</div> */}
			</div>
		</>
	)
}

export default SearchResult
