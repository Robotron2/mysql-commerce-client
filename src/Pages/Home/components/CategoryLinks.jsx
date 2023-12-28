import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UseProduct from "../../Admin/hooks/UseProduct"

function CategoryLinks() {
	const [categories, setCategories] = useState([])
	const { setCategoryLength, setCategoryId } = UseProduct()
	const navigate = useNavigate()

	const getAllCategories = async () => {
		const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const response = await axios.get(`${baseUrl}/category`)
			if (response.data.success) {
				// console.log(response);
				const requiredCats = response.data?.allCategories
				setCategoryLength(requiredCats.length)
				setCategories(requiredCats)
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
								className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer"
								key={category.id}
								onClick={() => {
									setCategoryId(category.id)
									navigate(`/category/${category.id}`)
								}}
							>
								{category.categoryName}
							</h6>
						)
					})}
			</div>
		</>
	)
}

export default CategoryLinks
