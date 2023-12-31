/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import UseProduct from "../hooks/UseProduct"
import { LazyLoadImage } from "react-lazy-load-image-component"
import UseCrud from "../hooks/UseCrud"

function UpdateProduct() {
	const { productId, setProductId } = UseProduct()
	const { view, setView } = UseCrud()
	const [productName, setProductName] = useState("")
	const [description, setDescription] = useState("")
	const [richDescription, setRichDescription] = useState("")
	const [stockQuantity, setStockQuantity] = useState("")
	const [price, setPrice] = useState("")
	const [image, setImage] = useState(null)
	const [localImage, setLocalImage] = useState(false)
	// const [category, setCategory] = useState("")
	const [isFeatured, setIsFeatured] = useState()
	// const [categories, setCategories] = useState([])
	const [updateImage, setUpdateImage] = useState(false)
	const [isCreating, setIsCreating] = useState(false)

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const handleFocus = (e) => {
		e.target.select()
	}

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			setImage(selectedFile)
			setUpdateImage(true)
			setLocalImage(true)
		}
	}

	const getInitialProducts = async () => {
		const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/products/product?id=${productId}`)
		console.log(response)

		setProductName(response.data?.product.name)
		setDescription(response.data?.product.description)
		setRichDescription(response.data?.product.richDescription)
		setStockQuantity(response.data?.product.countInStock)
		setPrice(response.data?.product.price)
		setImage(response.data?.product.image)
		setIsFeatured(response.data?.product.isFeatured)
	}

	useEffect(() => {
		getInitialProducts()
	}, [productId])

	const handleSelectIsFeatured = (e) => {
		setIsFeatured(e.target.value)
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append("richDescription", richDescription)
		formData.append("countInStock", stockQuantity)
		formData.append("price", price)
		formData.append("isFeatured", isFeatured)
		formData.append("updateImage", JSON.stringify(updateImage))

		if (updateImage === true) {
			formData.append("image", image)
		}

		setIsCreating(true)

		try {
			// console.log(updateImage)
			const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/products?productId=${productId}`, formData, {
				headers: {
					Authorization: localAuth,
				},
			})
			console.log(response)
			if (response.data.success) {
				setProductId("")
				setView("read")
				sessionStorage.removeItem("products-admin")
				toast.success(response.data.message)
			}
			if (response.data.error) {
				toast.error(response.data.error)
			}
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		}

		setIsCreating(false)
	}
	// /***
	//  * {
	// 				richDescription,
	// 				image: !_.isNull(newImageUrl) ? newImageUrl : product.image,
	// 				price,
	// 				countInStock,
	// 				isFeatured,
	// 			},
	//  /
	return (
		<>
			<div className="md:px-14 lg:px-44">
				<div className="form-container mt-8 shadow-lg bg-white rounded-md p-6">
					{/* <h1 className="font-bold text-2xl text-center mb-6">Update Product</h1> */}
					<form onSubmit={handleFormSubmit} encType="multipart/form-data">
						<div className="mt-1 flex flex-row gap-2 justify-between">
							<div className="w-full">
								<label>Product name</label>
								<input
									type="text"
									value={productName}
									onChange={(e) => setProductName(e.target.value)}
									className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2 disabled:cursor-not-allowed"
									placeholder="Name"
									onFocus={handleFocus}
									disabled
								/>
							</div>
							<div className="w-full">
								<label>Product Quantity</label>
								<input
									type="number"
									value={stockQuantity}
									min={0}
									onChange={(e) => setStockQuantity(e.target.value)}
									className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
									placeholder="Quantity"
									onFocus={handleFocus}
								/>
							</div>

							<div className="w-full">
								<label>Product Price: ${price}</label>
								<input
									type="number"
									name="price"
									placeholder="Price"
									min={0}
									onChange={(e) => setPrice(e.target.value)}
									className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
									value={price}
									onFocus={handleFocus}
								/>
							</div>
							<div className="w-full">
								<label>Make a Featured Product</label>
								<select
									className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
									onChange={handleSelectIsFeatured}
									value={isFeatured}
								>
									{/* <select className="form-select form-control rounded-pill" onChange={handleSelectIsFeatured} value={isFeatured}> */}

									<option disabled={true} value="">
										Select a category
									</option>

									<option value={true}>True</option>
									<option value={false}>False</option>
								</select>
							</div>
						</div>

						<div className="mt-1 flex flex-row gap-2 justify-between">
							<div className="w-full">
								<label htmlFor="">Product Description</label>
								<input
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2 disabled:cursor-auto"
									placeholder="Description"
									onFocus={handleFocus}
									disabled
								/>
							</div>
							<div className="w-full">
								<label htmlFor="">Product Detailed Description</label>

								<textarea
									name=""
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

						<div className="flex my-1 justify-between">
							{/* <div className="mt-1 flex flex-row gap-2 justify-between"> */}
							<div>
								{!localImage && (
									<LazyLoadImage
										alt={productName}
										src={image}
										className=" object-cover h-40 rounded-md w-40"
										placeholderSrc="../../../../src/assets/lazy.png"
									/>
								)}
								{localImage && (
									<LazyLoadImage
										alt={productName}
										src={URL.createObjectURL(image)}
										className=" object-cover h-40 rounded-md w-40"
										placeholderSrc="../../../../src/assets/lazy.png"
									/>
								)}
							</div>

							<div className="flex align-baseline">
								<input type="file" onChange={handleFileChange} accept="image/*" className="my-auto mx-auto" />
							</div>
						</div>
						<div className="flex flex-row">
							<button
								type="submit"
								className="bg-gray-600 text-white p-2 rounded-lg m-2 w-56 mx-auto disabled:cursor-not-allowed"
								disabled={isCreating}
							>
								{isCreating ? "Updating..." : "Update Product"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default UpdateProduct

/** 
function UpdateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setImage(selectedFile);
      setUpdateImage(true); // Enable image update when a new file is selected
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('updateImage', updateImage); // Include updateImage flag

    if (updateImage) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`/products/${productId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // Handle successful update, e.g., update state or show a success message
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input type="file" onChange={handleFileChange} accept="image/*" />

      <label>
        Update Image
        <input
          type="checkbox"
          checked={updateImage}
          onChange={() => setUpdateImage(!updateImage)}
        />
      </label>

      <button type="submit">Update Product</button>
    </form>
  );
}

export default UpdateProduct;














**/
