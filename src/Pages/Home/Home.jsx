/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import Header from "../../Components/Layouts/Header"
import Image from "../../assets/image1.jpg"
import Image2 from "../../assets/image2.jpg"
import Footer from "../../Components/Layouts/Footer"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Autoplay,
} from "swiper/modules"
import "swiper/swiper-bundle.css"

// Import Swiper styles
import "swiper/css"
import CategoryLinks from "./components/CategoryLinks"

import SubNav from "./componennts/SubNav"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductList from "../Products/components/ProductList"

function Home() {
	// const myArray = [1, 2, 3, 4, 5, 6]
	const sliderArray = ["Image", "Image2", "Image", "Image2"]
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const navigate = useNavigate()

	const randomProducts = async () => {
		axios
			.get(
				`${import.meta.env.VITE_REACT_APP_API}/products?page=${page}&limit=4`
			)
			.then((response) => {
				// console.log(response)
				setProducts(response.data.products)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		randomProducts()
	}, [page])

	return (
		<>
			<Header />
			<div className="md:px-14 lg:px-20 bg-gray-900">
				<CategoryLinks />
			</div>
			<div className="showCase grid grid-cols-4 grid-flow-row gap-4 px-6 sm:px-8 md:px-14 lg:px-20 mt-6 cursor-pointer">
				<div className="large col-span-4 lg:col-span-3 rounded shadow-xl">
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
						}}
						navigation={true}
						slidesPerView={1}
						scrollbar={{ draggable: true }}
						onSwiper={() => {
							//
						}}
						loop={true}
					>
						{sliderArray.map((item, i) => {
							return (
								<SwiperSlide key={i}>
									<Link to={"/"}>
										<img
											src={item === "Image" ? Image : Image2}
											alt="product-img"
											className="w-full object-cover h-80 rounded-md"
										/>
									</Link>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
				<div className="show-grid col-span-4 lg:col-span-1 grid grid-cols-4 gap-4 shadow-xl">
					<div className=" col-span-2 rounded">
						<Link>
							<img
								src={Image2}
								alt="image"
								className=" object-cover h-full rounded-md"
							/>
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img
								src={Image2}
								alt="image"
								className=" object-cover h-full rounded-md"
							/>
						</Link>
					</div>
					<div className=" col-span-2">
						<Link>
							<img
								src={Image2}
								alt="image rounded"
								className=" object-cover h-full rounded-md"
							/>
						</Link>
					</div>
					<div className=" col-span-2 rounded">
						<Link>
							<img
								src={Image2}
								alt="image"
								className=" object-cover h-full rounded-md"
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
				<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
					<h4 className="text-2xl">Men</h4>
					<Link to={"/products"}>
						<h6 className="font-semibold cursor-pointer">See more</h6>
					</Link>
				</div>
				{/* <div className="deal-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pt-2">
					{myArray.map((_, i) => {
						return (
							<Link key={i + 1}>
								<div className="child  bg-gray-200 shadow-lg rounded transform hover:scale-95 transition ease-in-out duration-300">
									<div className="grid lg:grid-cols-3 gap-3">
										<img
											src={Image}
											alt="deals"
											className="object-cover rounded h-32 w-full"
										/>
										<div className="justify-self-center place-self-center mt-0 mb-1">
											<h4 className="font-bold text-lg">Product Title</h4>
											<p className="font-bold">$1000</p>
										</div>
									</div>
								</div>
							</Link>
						)
					})}
				</div> */}
				<ProductList products={products} />
			</div>
			<div className="top-category bg-inherit px-6 sm:px-8 md:px-14 lg:px-20 mt-6">
				<div className=" bg-gray-900/90 rounded-tr-lg rounded-tl-lg flex justify-between p-3 text-white font-bold shadow-xl">
					<h4 className="text-2xl">Women</h4>
					<Link to={"/products"}>
						<h6 className="font-semibold cursor-pointer">See more</h6>
					</Link>
				</div>
				{/* <div className="deal-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pt-2">
					{myArray.map((_, i) => {
						return (
							<Link key={i + 1}>
								<div className="child  bg-gray-200 shadow-lg rounded transform hover:scale-95 transition ease-in-out duration-300">
									<div className="grid lg:grid-cols-3 gap-3">
										<img
											src={Image}
											alt="deals"
											className="object-cover rounded h-32 w-full"
										/>
										<div className="justify-self-center place-self-center mt-0 mb-1">
											<h4 className="font-bold text-lg">Product Title</h4>
											<p className="font-bold">$1000</p>
										</div>
									</div>
								</div>
							</Link>
						)
					})}
				</div> */}
				<ProductList products={products} />
			</div>

			{/* <Footer /> */}
		</>
	)
}

export default Home
