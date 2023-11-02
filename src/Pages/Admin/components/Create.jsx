import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function Create() {
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

		try {
			if (productName === "" || description === "" || price === "" || stockQuantity === "" || category === "") {
				throw Error("All fields must be filled before you can create a product!")
			}

			if (file === null) {
				throw Error("You must upload the image of the product")
			}
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
					if (response.data.success) {
						setProductName("")
						setPrice("")
						setDescription("")
						setStockQuantity("")
						setFile(null)
						setCategory("")
						toast.success(response.data.message)
					}
				})
				.catch((error) => {
					// error
					console.error(error)
				})
		} catch (error) {
			// console.log(error)
			toast.error(error.message)
		}
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
		<div className="md:px-14 lg:px-44">
			<div className="form-container mt-8 shadow-lg bg-white rounded-md p-6">
				<h1 className="font-bold text-2xl text-center mb-6">Create Product</h1>
				<form onSubmit={handleFormSubmit} encType="multipart/form-data">
					<div className="flex flex-col">
						<input
							type="text"
							name="name"
							placeholder="Product Name"
							onChange={(e) => setProductName(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
						/>
					</div>
					<div>
						<input
							type="text"
							name="description"
							placeholder="Product Description:"
							onChange={(e) => setDescription(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
						/>
					</div>
					<div>
						<input
							type="text"
							name="price"
							placeholder="Price"
							onChange={(e) => setPrice(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
						/>
					</div>
					<div>
						<input
							type="text"
							name="stock_quantity"
							placeholder="Stock Quantity"
							onChange={(e) => setStockQuantity(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
						/>
					</div>

					<div className="flex justify-between my-1">
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

						<div>
							<label className="btn btn-outline-secondary col-md-12">
								{/* <input type="file" name="image" accept="image/*" onChange={handleImageChange} /> */}
								<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
							</label>
						</div>
					</div>
					<button type="submit" className="bg-gray-600 text-white p-2 rounded-lg m-2 w-full">
						Create Product
					</button>
				</form>
			</div>
		</div>
	)
}

export default Create