/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseProduct from "../hooks/UseProduct";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [localImage, setLocalImage] = useState(false);

  const { productId, setProductId } = UseProduct();

  const handleFocus = (e) => {
    e.target.select();
  };

  const getInitialProducts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/products/product/${productId}`
    );

    console.log(response);

    setProductName(response.data.product.productName);
    setDescription(response.data.product.description);
    setStockQuantity(response.data.product.stockQuantity);
    setPrice(response.data.product.price);
    setImage(response.data.product.Image.filePath);
  };

  useEffect(() => {
    // Fetch the current product data and pre-fill the input fields
    getInitialProducts();
  }, [productId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("stock_quantity", stockQuantity);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/products/${productId}`
      );
      if (response.ok) {
        // Handle successful update, e.g., update state
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="md:px-14 lg:px-44">
        <div className="form-container mt-8 shadow-lg bg-white rounded-md p-6">
          <h1 className="font-bold text-2xl text-center mb-6">
            Update Product
          </h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="flex flex-col">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
                placeholder="Name"
                onFocus={handleFocus}
              />
            </div>
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
                placeholder="Description"
                onFocus={handleFocus}
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
                onFocus={handleFocus}
              />
            </div>
            <div>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="bg-gray-200 shadow-md p-2 text-gray-900 focus:outline-none rounded-md w-full my-2"
                placeholder="Quantity"
                onFocus={handleFocus}
              />
            </div>

            <div className="flex justify-between my-1">
              {!localImage && (
                <LazyLoadImage
                  alt={productName}
                  src={`${import.meta.env.VITE_REACT_APP_API}/${image}`}
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
              <div className="">
                <label className="btn btn-outline-secondary col-md-12">
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      console.log(e.target.files);
                    }}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-600 text-white p-2 rounded-lg m-2 w-full"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
