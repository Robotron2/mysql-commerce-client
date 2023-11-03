import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

function Update() {
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [file, setFile] = useState(null)

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		try {
			// if (productName === "" || description === "" || price === "") {
			// 	throw Error("All fields must be filled before you can create a product!")
			// }

			// if (file === null) {
			// 	throw Error("You must upload the image of the product")
			// }
			const formData = new FormData()
			formData.append("image", file)
			formData.append("product_name", productName)
			formData.append("description", description)
			formData.append("price", price)

			if (file) {
				formData.append("image", file)
			}

			axios
				.post(`${import.meta.env.VITE_REACT_APP_API}/products/create-product`, formData)
				.then((response) => {
					//response
					// console.log(response.data)
					if (response.data.success) {
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
		setProductName("")
		setPrice("")
		setDescription("")
		setFile(null)
	}

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
							value={productName}
						/>
					</div>
					<div>
						<input
							type="text"
							name="description"
							placeholder="Product Description:"
							onChange={(e) => setDescription(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
							value={description}
						/>
					</div>
					<div>
						<input
							type="number"
							name="price"
							placeholder="Price"
							onChange={(e) => setPrice(e.target.value)}
							className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
							value={price}
						/>
					</div>

					<div className="flex justify-between my-1">
						<div>
							<label className="btn btn-outline-secondary col-md-12">
								{/* <input type="file" name="image" accept="image/*" onChange={handleImageChange} /> */}
								<input type="file" name="image" accept="image/*" onChange={handleFileChange} />
							</label>
						</div>
					</div>
					<button type="submit" className="bg-gray-600 text-white p-2 rounded-lg m-2 w-full">
						Update Product
					</button>
				</form>
			</div>
		</div>
	)
}

export default Update

// import React, { useState } from 'react';

// function UpdateProduct() {

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('price', price);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const response = await fetch(`/products/${productId}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.ok) {
//         // Handle successful update, e.g., update state
//       } else {
//         // Handle errors
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
//       <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
//       <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
//       <button type="submit">Update Product</button>
//     </form>
//   );
// }
