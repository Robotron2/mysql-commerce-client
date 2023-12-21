/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../../../Components/Layouts/Header"
import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import toast from "react-hot-toast"
import ProductList from "../components/ProductList"
import AddToCartButton from "../components/AddToCartButton"

function ViewProduct() {
	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`

	const { id } = useParams()
	const [product, setProduct] = useState({})
	const [relatedProducts, setRelatedProducts] = useState([])
	const [imagePath, setImagePath] = useState("")
	const [isAvailable, setIsAvailable] = useState()
	const [productFound, setProductFound] = useState()
	const [productQuantity, setProductQuantity] = useState(1)
	const [maxQuantity, setMaxQuantity] = useState()
	const navigate = useNavigate()

	const getProductDetails = async () => {
		setProductQuantity(1)

		try {
			const response = await axios.get(
				`${baseUrl}/products/product/${id}?category=${true}`
			)
			if (response.data.success) {
				setProductFound(true)
				setProduct(response.data.product)
				setMaxQuantity(parseInt(response.data.product?.stockQuantity))
				setIsAvailable(response.data?.isAvailable)
				setImagePath(response.data.product?.Image.filePath)
				setRelatedProducts(response.data?.relatedProducts)
			}
		} catch (error) {
			if (error.response.data) {
				setProductFound(false)
			} else {
				toast.error("Internal server error! Kindly contact us")
				navigate("/products")
			}
		}
	}

	useEffect(() => {
		getProductDetails()
	}, [id])

	return (
		<>
			<Header />

			{productFound ? (
				<>
					<div className="px-6 sm:px-8 md:px-14 lg:px-20 mt-6  py-4 rounded-md m-2">
						<div className="lg:grid grid-cols-3 gap-3">
							<div className="lg:col-span-2 row-span-1">
								<LazyLoadImage
									alt="Product Image"
									src={`${baseUrl}/${imagePath}`}
									className=" object-cover rounded-md w-full h-full "
									placeholderSrc="../../../../src/assets/lazy.png"
								/>
							</div>
							<div className="mt-4 bg-gray-300 p-1 px-2 rounded-md shadow-lg lg:items-center row-span-1 lg:h-fit">
								<div className="font-semibold lg:text-2xl lg:mt-10">
									{product.productName}
								</div>
								<div className="lg:my-3">
									<span className="font-bold text-lg lg:text-3xl">
										${product.price}
									</span>
								</div>
								<div>
									<span className="font-semibold lg:text-xl">Description:</span>
									<p className="inline flex-wrap ml-1">{product.description}</p>
								</div>
								{maxQuantity > 0 && (
									<div className="flex justify-between mt-2 ">
										<span className="lg:text-xl"> Quantity:</span>

										<>
											<div className="bg-gray-100 w-32 grid grid-cols-3 font-semibold">
												<span
													className="border-r-2 border-gray-300 col-span-1 text-center cursor-pointer selection:bg-transparent selection:text-gray-600"
													onClick={() => {
														if (productQuantity > 1) {
															setProductQuantity((prev) => prev - 1)
														} else {
															toast("Minimum quantity is one")
														}
													}}
												>
													-
												</span>
												<span className="border-r-2 border-gray-300 col-span-1 text-center">
													{productQuantity}
												</span>
												<span
													className="border-r-2 border-gray-300 col-span-1 text-center cursor-pointer selection:bg-transparent selection:text-gray-600"
													onClick={() => {
														if (maxQuantity > productQuantity) {
															setProductQuantity((prev) => prev + 1)
														} else {
															setProductQuantity((prev) => prev)
															toast("Max quantity reached")
														}
													}}
												>
													+
												</span>
											</div>
										</>
									</div>
								)}

								<div className="my-4 w-28 mx-auto md:w-full">
									{isAvailable == true && (
										<AddToCartButton
											productId={product.id}
											quantity={productQuantity}
										/>
									)}
									{isAvailable == false && (
										<button
											disabled
											className=" w-full bg-gray-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-gray-700 transition ease-in-out duration-300 disabled:cursor-not-allowed"
										>
											Out Of Stock
										</button>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
						<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
							<h4 className="text-2xl">Related</h4>
						</div>

						<ProductList products={relatedProducts} />
					</div>
				</>
			) : (
				<div>
					<>
						<div className="m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 h-96">
							<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
								<div className="mt-12 flex flex-col items-center">
									<h1 className="text-2xl xl:text-3xl font-bold text-gray-800">
										Oops!!
									</h1>
									<h1 className="text-2xl xl:text-3xl font-bold text-gray-800">
										Product not found.
									</h1>
									<button className=" w-52 bg-gray-500 text-white text-center rounded-md py-2 md:col-span-1 hover:bg-gray-700 transition ease-in-out duration-300">
										Go back
									</button>
								</div>
							</div>
							<div className="flex-1 bg-gray-100 text-center hidden lg:flex">
								<div
									className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
									style={{
										backgroundImage:
											'url("../../../../src/assets/product404.jpg")',
										backgroundRepeat: "no-repeat",
									}}
								/>
							</div>
						</div>
					</>
				</div>
			)}
		</>
	)
}

export default ViewProduct
