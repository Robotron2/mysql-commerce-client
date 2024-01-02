/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import ProductList from "../Products/components/ProductList"
import Header from "../../Components/Layouts/Header"
import Footer from "../../Components/Layouts/Footer"
import { motion } from "framer-motion"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"

// Import Swiper styles
import "swiper/css"
import CategoryLinks from "./components/CategoryLinks"
import { LazyLoadImage } from "react-lazy-load-image-component"

function Home() {
	const [showCaseImages, setShowCaseImages] = useState([])
	const [randomCategories, setRandomCategories] = useState([])
	const [randomCategoryData, setRandomCategoryData] = useState({ name: null, id: null })
	const navigate = useNavigate()

	const baseUrl = import.meta.env.VITE_REACT_APP_API

	const showCaseProducts = async () => {
		const response = await axios.get(`${baseUrl}/products/get-featured`)
		if (response.data?.success) {
			setShowCaseImages(response.data?.featuredProduct)
			setRandomCategories(response.data?.randomCategoryProducts)
			setRandomCategoryData(response.data?.randomCategoryData)
		}
	}

	useEffect(() => {
		showCaseProducts()
	}, [])

	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			<Header />
			<div className="md:px-14 lg:px-20 bg-gray-900">
				<CategoryLinks />
			</div>

			<div className="showCase grid grid-cols-4 grid-flow-row gap-4 px-6 sm:px-8 md:px-14 lg:px-20 mt-6 cursor-pointer">
				<div className="large col-span-4 lg:col-span-3 rounded shadow-xl h-full">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
						spaceBetween={30}
						centeredSlides={true}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
							enabled: false,
						}}
						navigation={true}
						slidesPerView={1}
						// scrollbar={{ draggable: true, enabled: true }}
						onSwiper={() => {
							//
						}}
						// loop={true}
					>
						{showCaseImages.length > 0 &&
							showCaseImages.map((item, i) => {
								// console.log(item)
								return (
									<SwiperSlide key={i}>
										<Link to={`/category/${item.category._id}`}>
											<img src={item?.image} alt="product-img" className="w-full object-center h-[420px] rounded-md" />
										</Link>
									</SwiperSlide>
								)
							})}
					</Swiper>
				</div>
				<div className="show-grid col-span-4 lg:col-span-1 grid grid-cols-4 gap-4 shadow-xl">
					{showCaseImages.length > 0 &&
						showCaseImages.map((item, i) => {
							return (
								<div className=" col-span-2 rounded" key={i}>
									<Link to={`/category/${item.category._id}`}>
										<img src={item.image} alt="product-img" className="w-full object-cover h-48 rounded-md" />
										{/* <img src={`${baseUrl}/${imagePath}`} alt="product-img" className="w-full object-cover h-48 rounded-md" /> */}
									</Link>
								</div>
							)
						})}
				</div>
			</div>

			{randomCategoryData !== null && (
				<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
					<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
						<h4 className="text-2xl capitalize">{randomCategoryData?.name}</h4>
						<Link to={`/category/${randomCategoryData?.id}`}>
							<h6 className="font-semibold cursor-pointer">See more</h6>
						</Link>
					</div>
					{/* <ProductList products={randomCategories} /> */}
					<div className="grid grid-cols-12 gap-4 pt-8">
						{randomCategories.map((product) => {
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
													src={product.image}
													className=" object-cover rounded-md w-full h-full "
													placeholderSrc="../../../../src/assets/lazy.png"
												/>
											</div>

											<div className="p-2 rounded-md bg-white">
												<h2>
													<span className="font-semibold">Product Name: </span>
													{product.name.substring(0, 15) + "..."}
												</h2>
												<h2>
													<span className="font-semibold">Category: </span>
													{product.name}
												</h2>
												<p>
													<span className="font-semibold"> Quantity: </span>
													{product.countInStock}
												</p>
												{product?.description !== undefined && (
													<p>
														<span className="font-semibold">Description: </span>
														{product.description.substring(0, 15) + "..."}
													</p>
												)}

												<p>
													<span className="font-semibold">Price: </span>
													<span className="font-bold ml-1">${product.price}</span>
												</p>
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			)}

			{/* <Footer /> */}
		</motion.div>
	)
}

export default Home
