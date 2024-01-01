/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UseProduct from "../../Admin/hooks/UseProduct"

function CategoryLinks() {
	const [categories, setCategories] = useState([])
	const { setCategoryLength, setCategoryId, randomcategoryId, setRandomCategoryId } = UseProduct()
	const navigate = useNavigate()

	const getAllCategories = async () => {
		const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const response = await axios.get(`${baseUrl}/categories`)
			console.log(response)
			if (response.data.success) {
				const requiredCats = response.data?.allCategories
				setCategoryLength(requiredCats.length)
				setCategories(requiredCats)
				const randomCategoryId = Math.ceil(Math.random() * categories.length)
				setRandomCategoryId(requiredCats[randomCategoryId].id)
				console.log(randomcategoryId)
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getAllCategories()
	}, [])
	return (
		<>
			<div className="w-full secondary-nav hidden lg:flex justify-around lg:justify-between items-center p-3 text-white">
				{categories.length > 0 &&
					categories.map((category) => {
						return (
							<h6
								className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer capitalize"
								key={category.id}
								onClick={() => {
									setCategoryId(category.id)
									navigate(`/category/${category.id}`)
								}}
							>
								{category.name}
							</h6>
						)
					})}
				{!categories.length > 0 && (
					<>
						<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer capitalize">
							Category
						</h6>
						<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer capitalize">
							Category
						</h6>
						<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer capitalize">
							Category
						</h6>
						<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer capitalize">
							Category
						</h6>
					</>
				)}
			</div>
		</>
	)
}

export default CategoryLinks
