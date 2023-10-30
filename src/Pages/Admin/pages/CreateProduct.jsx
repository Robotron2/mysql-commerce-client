/* eslint-disable no-unused-vars */
import axios from "axios"
import { createRef, useEffect, useState } from "react"

const CreateProduct = () => {
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [stockQuantity, setStockQuantity] = useState("")
	const [category, setCategory] = useState("")
	const [file, setFile] = useState(null)
	const [categories, setCategories] = useState([])

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleSelectCategory = (e) => {
		setCategory(e.target.value)
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append("image", file)
		formData.append("product_name", productName)
		formData.append("description", description)
		formData.append("categoryId", category)
		formData.append("price", price)
		formData.append("stock_quantity", stockQuantity)

		axios
			.post(`${import.meta.env.VITE_REACT_APP_API}/products/create-product`, formData)
			.then((response) => {
				//response
				console.log(response.data)
			})
			.catch((error) => {
				// error
				console.error(error)
			})
	}

	async function getAllCategories() {
		try {
			const allCategories = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/category/`)
			if (allCategories) {
				setCategories(allCategories.data)
			} else {
				throw Error("Something went wrong fam.")
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllCategories()
	}, [])

	return (
		<div>
			<h1 className="font-bold text-2xl">Create Product</h1>

			<form onSubmit={handleFormSubmit} encType="multipart/form-data">
				<div>
					<input type="text" name="name" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
				</div>
				<div>
					<input type="text" name="description" placeholder="Product Description:" onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div>
					<input type="text" name="price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
				</div>
				<div>
					<input type="text" name="stock_quantity" placeholder="Stock Quantity" onChange={(e) => setStockQuantity(e.target.value)} />
				</div>

				<select className="form-select form-control rounded-pill" onChange={handleSelectCategory} value={category}>
					<option disabled={true} value="">
						Select a category
					</option>
					{categories.map((category) => {
						return (
							<option value={category.id} key={category.id}>
								{category.categoryName}
							</option>
						)
					})}
				</select>

				<div className="mb-3">
					<label className="btn btn-outline-secondary col-md-12">
						{/* <input type="file" name="image" accept="image/*" onChange={handleImageChange} /> */}
						<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
					</label>
				</div>
				<button type="submit" className="bg-red-700 text-white p-2 rounded-lg m-2">
					Create Product
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
