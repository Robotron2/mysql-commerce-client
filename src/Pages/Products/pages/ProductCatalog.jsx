import axios from "axios"
import { useEffect, useState } from "react"
import ProductFilter from "../components/ProductFilter"
import ProductList from "../components/ProductList"
import toast from "react-hot-toast"
// import Header from "../../../Components/Layouts/Header"

function ProductCatalog() {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const [categories, setCategories] = useState([])
	const [filter, setFilter] = useState({
		category: "",
		minPrice: "",
		maxPrice: "",
		sort: "",
	})

	useEffect(() => {
		// Fetch products and categories from the backend
		const localProducts = JSON.parse(sessionStorage.getItem("products-user"))
		if (localProducts && page == 1) {
			setProducts(localProducts)
		} else {
			axios
				.get(`${import.meta.env.VITE_REACT_APP_API}/products?page=${page}`)
				.then((response) => {
					// console.log(response)
					if (response.data.products.length === 0) {
						// toast.error("All products have been fetched!")
						toast("All products have been fetched!")
						setPage(1)
					}
					if (page === 1) {
						sessionStorage.setItem(
							"products-user",
							JSON.stringify(response.data.products)
						)
						setProducts(response.data.products)
					}
					setProducts(response.data.products)
				})
				.catch((error) => {
					console.log(error)
				})
		}

		axios
			.get(`${import.meta.env.VITE_REACT_APP_API}/category`)
			.then((response) => {
				setCategories(response.data)
				// console.log(response)
			})
	}, [page])

	const handleFilterChange = (field, value) => {
		setFilter({ ...filter, [field]: value })
	}

	const applyFilter = () => {
		axios
			.get(`${import.meta.env.VITE_REACT_APP_API}/products/filter`, {
				params: filter,
			})
			.then((response) => {
				if (response.data.products.length < 1) {
					toast(response.data.message)
				} else {
					setProducts(response.data.products)
				}
				// console.log(response)
			})
	}

	return (
		<>
			{/* <Header /> */}
			<div className="md:px-14 lg:px-44 mb-96">
				<h1>Product Catalog</h1>
				<ProductFilter
					filter={filter}
					categories={categories}
					onChange={handleFilterChange}
					onApplyFilter={applyFilter}
				/>
				<ProductList products={products} />
				<div className="p-8 mx-auto w-full mt-4 flex justify-center">
					<button
						className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
						onClick={() => {
							setPage(page + 1)
						}}
					>
						Click More
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductCatalog
