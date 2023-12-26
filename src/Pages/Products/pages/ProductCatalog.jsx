/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import toast from "react-hot-toast";
// import Header from "../../../Components/Layouts/Header"

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const baseUrl = `${import.meta.env.VITE_REACT_APP_API}`;

  const fetchProducts = async () => {
    const localProducts = JSON.parse(sessionStorage.getItem("products-user"));
    if (localProducts && page == 1) {
      setProducts(localProducts);
    } else {
      try {
        const response = await axios.get(`${baseUrl}/products?page=${page}`);
        if (response.data && response.data.products.length === 0) {
          toast("All products have been fetched!");
          setPage(1);
        }
        if (page === 1) {
          sessionStorage.setItem(
            "products-user",
            JSON.stringify(response.data.products),
          );
          setProducts(response.data.products);
        }
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
        toast.error("An error occured.");
      }
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${baseUrl}/category`);
    if (response.data.success) {
      setCategories(response?.data.allCategories);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
  };

  const applyFilter = async () => {
    const response = await axios.get(`${baseUrl}/products/filter`, {
      params: filter,
    });
    if (response.data.products.length < 1) {
      toast(response.data.message);
    } else {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [page]);

  return (
    <>
      {/* <Header /> */}
      <div className="md:px-14 lg:px-44 mb-96">
        <h1>Product Catalog</h1>
        {categories.length > 0 && (
          <>
            <ProductFilter
              filter={filter}
              categories={categories}
              onChange={handleFilterChange}
              onApplyFilter={applyFilter}
            />
          </>
        )}

        <ProductList products={products} />
        <div className="p-8 mx-auto w-full mt-4 flex justify-center">
          <button
            className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
            onClick={() => {
              if (page >= 1) {
                setPage(page + 1);
              }
            }}
          >
            Click More
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCatalog;
