/* eslint-disable no-unused-vars */
import axios, { all } from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import UseCrud from "../hooks/UseCrud"
function Create() {
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [stockQuantity, setStockQuantity] = useState("")
	const [category, setCategory] = useState("")
	const [richDescription, setRichDescription] = useState("")
	const [categories, setCategories] = useState([])
	const [file, setFile] = useState(null)
	const [isCreating, setIsCreating] = useState(false)
	const [isFeatured, setIsFeatured] = useState(false)

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const { view, setView } = UseCrud()

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleSelectCategory = (e) => {
		setCategory(e.target.value)
	}

	const handleSelectIsFeatured = (e) => {
		setIsFeatured(e.target.value)
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault()

		setIsCreating(true)
		try {
			if (productName === "" || description === "" || price === "" || stockQuantity === "" || category === "") {
				throw Error("All fields must be filled before you can create a product!")
			}

			if (file === null) {
				throw Error("You must upload the image of the product")
			}
			const formData = new FormData()
			formData.append("image", file)
			formData.append("name", productName)
			formData.append("description", description)
			formData.append("richDescription", richDescription)
			formData.append("categoryId", category)
			formData.append("price", price)
			formData.append("isFeatured", isFeatured)
			formData.append("countInStock", stockQuantity)
			// {
			//     "name": "Product to delete",
			//     "description": "Product 3 description",
			//     "richDescription": "Product 3 Rich description",
			//     "image": "product3/image-3.jpg",
			//     "price": 20,
			//     "categoryId": "659000e278f5615ae92827ea",
			//     "countInStock": 20,
			//     "isFeatured": false
			//   }
			const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/products`, formData, {
				headers: {
					Authorization: `${localAuth}`,
				},
			})
			if (response.data.success) {
				sessionStorage.removeItem("products-admin")
				setView("read")
				toast.success(response.data.message)
			}
			if (response.data.error) {
				toast.error(response.data.error)
			}
			setProductName("")
			setPrice("")
			setDescription("")
			setStockQuantity("")
			setFile(null)
			setCategory("")
		} catch (error) {
			// console.log(error)
			toast.error(error.message)
		}
		setIsCreating(false)
	}

	async function getAllCategories() {
		try {
			const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/categories`)
			if (response.data.success) {
				setCategories(response.data?.allCategories)
				// console.log(response.data)
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
					<div className="mt-1 flex flex-row gap-2 justify-between">
						<div>
							<label htmlFor="name">Product Name</label>
							<input
								type="text"
								name="name"
								placeholder="Product Name"
								onChange={(e) => setProductName(e.target.value)}
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
								value={productName}
							/>
						</div>

						<div>
							<label htmlFor="countInStock">Stock Quantity</label>
							<input
								type="number"
								name="countInStock"
								placeholder="Stock Quantity"
								min={1}
								onChange={(e) => setStockQuantity(e.target.value)}
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
								value={stockQuantity}
							/>
						</div>

						<div>
							<label htmlFor="price">{"Price ($)"}</label>
							<input
								type="number"
								name="price"
								placeholder="Price"
								onChange={(e) => setPrice(e.target.value)}
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
								value={price}
							/>
						</div>

						<div>
							<label>Product Category</label>
							<select
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2 capitalize"
								onChange={handleSelectCategory}
								value={category}
							>
								<option disabled={true} value="">
									Select a category
								</option>
								{categories.length > 0 &&
									categories.map((cat) => {
										return (
											<option value={cat.id} key={cat.id}>
												{cat.name}
											</option>
										)
									})}
							</select>
						</div>

						<div>
							<label>Make a Featured Product</label>
							<select
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
								onChange={handleSelectIsFeatured}
								value={isFeatured}
							>
								<option disabled={true} value="">
									Product to feature
								</option>

								<option value={true}>True</option>
								<option value={false}>False</option>
							</select>
						</div>
					</div>

					{/* Description */}
					<div className="mt-1 flex flex-row gap-8 justify-between">
						<div className="w-full">
							<label htmlFor="description">Product Description</label>
							<textarea
								name="description"
								id=""
								// cols="30"
								rows="3"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								maxLength={200}
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2 "
								placeholder="Input detailed description not more than 200 words"
							></textarea>
						</div>

						<div className="w-full">
							<label htmlFor="richDescription">Product Detailed Description</label>

							<textarea
								name="richDescription"
								id=""
								// cols="20"
								rows="3"
								value={richDescription}
								onChange={(e) => setRichDescription(e.target.value)}
								maxLength={400}
								className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2 "
								placeholder="Input detailed description not more than 400 words"
							></textarea>
						</div>
					</div>
					{/*Image and create button  */}
					<div className="flex justify-around align-middle my-1 ">
						<div className="">
							<label className="btn btn-outline-secondary col-md-12">
								{/* <input type="file" name="image" accept="image/*" onChange={handleImageChange} /> */}
								<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
							</label>
						</div>
						<div className="w-56">
							<button type="submit" className="bg-gray-600 text-white p-2 rounded-lg m-2 w-full disabled:cursor-not-allowed" disabled={isCreating}>
								{isCreating ? "Creating..." : "Create Product"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Create
