import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

function Read() {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_REACT_APP_API}/products?page=${page}`)
			.then((response) => {
				// console.log(response)
				if (response.data.products.length === 0) {
					toast.error("All products have been fetched!")
					setPage(1)
				}
				setProducts(response.data.products)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [page])
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	return (
		<>
			<div className="md:px-14 lg:px-44">
				<div className="font-semibold text-gray-900 text-center text-lg">
					<h1>All Products</h1>
				</div>
				<div className=" mt-10 bg-gray-300 px-[16px] rounded-md shadow-lg">
					<div className="grid grid-cols-12 mt-10  gap-4 pt-10">
						{products.map((product) => {
							let imagePath = product.Image.filePath.replace("/public//g", "")
							return (
								<div
									className="col-span-12 md:col-span-6 lg:col-span-3 bg-white text-gray-800 h-full mx-2 rounded-md shadow-lg transform hover:scale-95 transition duration-200"
									key={product.id}
								>
									<div className="bg-white rounded-md">
										<img src={`${baseUrl}/${imagePath}`} alt="Product Image" className=" object-cover h-full rounded-md" />
										<div className="p-2 rounded-md bg-white">
											<h2>Product Name: {product.productName}</h2>
											<h2>Category: {product.Category.categoryName}</h2>
											<p>Stock Quantity: {product.stockQuantity}</p>
											<p>Description {product.description}</p>
											<p>
												Price:
												<span className="font-bold ml-1">
													${product.price}.<span className="text-xs">99</span>
												</span>
											</p>
										</div>
										<div className="p-2 grid grid-cols-2 gap-2">
											<Link className="bg-green-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-green-700 transition ease-in-out duration-300">Update</Link>
											<Link className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300">Delete</Link>
										</div>
									</div>
								</div>
							)
						})}
					</div>
					<div className="my-20">
						<button onClick={() => setPage(page + 1)}>Click More</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Read
