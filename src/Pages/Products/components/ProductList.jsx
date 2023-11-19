import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function ProductList({ products }) {
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	return (
		<>
			<div className="grid grid-cols-12  gap-4 pt-8">
				{products.map((product) => {
					let imagePath = product.Image.filePath.replace("/public//g", "")
					return (
						<Link
							to={`/products/${product.id}`}
							key={product.id}
							className="col-span-12 md:col-span-6 lg:col-span-3 bg-white text-gray-800 h-full mx-2 rounded-md shadow-lg "
						>
							<div>
								<div className="bg-white rounded-md transform lg:hover:scale-105 transition duration-300">
									<div className="h-60 w-full overflow-hidden">
										<LazyLoadImage
											alt="Product Image"
											src={`${baseUrl}/${imagePath}`}
											className=" object-cover rounded-md w-full h-full "
											placeholderSrc="../../../../src/assets/lazy.png"
										/>
									</div>

									<div className="p-2 rounded-md bg-white">
										<h2>
											<span className="font-semibold">Product Name: </span>
											{product.productName.substring(0, 15) + "..."}
										</h2>
										<h2>
											<span className="font-semibold">Category: </span>
											{product.Category.categoryName}
										</h2>
										<p>
											<span className="font-semibold"> Quantity: </span>
											{product.stockQuantity}
										</p>
										<p>
											<span className="font-semibold">Description: </span>
											{product.description.substring(0, 15) + "..."}
										</p>
										<p>
											<span className="font-semibold">Price: </span>
											<span className="font-bold ml-1">${product.price}</span>
										</p>
									</div>
									{/* <div className="p-2 grid grid-cols-2 gap-2">
								<button
									className="bg-green-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-green-700 transition ease-in-out duration-300"
									onClick={() => {
										setProductId(product.id)
										setView("update")
									}}
								>
									Update
								</button>
								<button
									className="bg-red-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-red-700 transition ease-in-out duration-300"
									onClick={() => {
										setProductId(product.id)
										setView("delete")
									}}
								>
									Delete
								</button>
							</div> */}
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</>
	)
}

export default ProductList
