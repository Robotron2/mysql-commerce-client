/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import Header from "../../Components/Layouts/Header"
import Footer from "../../Components/Layouts/Footer"
import { motion } from "framer-motion"
// import LazyLoad from "../../../../src/assets/lazy.png"
import LazyLoad from "../../../src/assets/lazy.png"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"

// Import Swiper styles
import "swiper/css"
import CategoryLinks from "./components/CategoryLinks"

import SubNav from "./componennts/SubNav"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductList from "../Products/components/ProductList"

import toast from "react-hot-toast"

function Home() {
	const [products, setProducts] = useState([])
	const [categoryData, setCategoryData] = useState({})
	const [page, setPage] = useState(1)
	const [showCaseImages, setShowCaseImages] = useState([])
	const navigate = useNavigate()

	const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
	const sliderArray = ["Image", "Image2", "Image", "Image2"]
	const categoryArray = [1, 2, 3, 4]

	const randomProducts = async () => {
		const randomId = Math.ceil(Math.random() * categoryArray.length)

		try {
			const response = await axios.get(`${baseUrl}/products/category?id=${randomId}`)

			if (response.data.success) {
				setProducts(response.data?.products)
				setCategoryData(response.data?.categoryData)
			}
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong")
		}
	}

	const showCaseProducts = async () => {
		const response = await axios.get(`${baseUrl}/products/show-case`)
		if (response.data?.success) {
			setShowCaseImages(response.data?.products)
		}
		// console.log(response)
	}

	useEffect(() => {
		randomProducts()
		showCaseProducts()
	}, [page])

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
								let imagePath = item.Image?.filePath.replace("/public//g", "")

								return (
									<SwiperSlide key={i}>
										<Link to={`/category/${item.Category.id}`}>
											<img src={`${baseUrl}/${imagePath}`} alt="product-img" className="w-full object-center h-[420px] rounded-md" />
										</Link>
									</SwiperSlide>
								)
							})}
					</Swiper>
				</div>
				<div className="show-grid col-span-4 lg:col-span-1 grid grid-cols-4 gap-4 shadow-xl">
					{showCaseImages.length > 0 &&
						showCaseImages.map((item, i) => {
							let imagePath = item.Image?.filePath.replace("/public//g", "")

							return (
								<div className=" col-span-2 rounded" key={i}>
									<Link to={`/category/${item.Category.id}`}>
										<img src={`${baseUrl}/${imagePath}`} alt="product-img" className="w-full object-cover h-48 rounded-md" />
									</Link>
								</div>
							)
						})}
					{/* <div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2">
						<Link>
							<img src={Image2} alt="image rounded" className=" object-cover h-full rounded-md" />
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img src={Image2} alt="image" className=" object-cover h-full rounded-md" />
						</Link>
					</div> */}
				</div>
			</div>

			<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
				<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
					<h4 className="text-2xl">{categoryData?.categoryName}</h4>
					<Link to={`/category/${categoryData?.id}`}>
						<h6 className="font-semibold cursor-pointer">See more</h6>
					</Link>
				</div>
				<ProductList products={products} />
			</div>

			{/* <div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
				<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
					<h4 className="text-2xl">Women</h4>
					<Link to={"/products"}>
						<h6 className="font-semibold cursor-pointer">See more</h6>
					</Link>
				</div>
				<ProductList products={products} />
			</div> */}

			{/* <Footer /> */}
		</motion.div>
	)
}

export default Home
