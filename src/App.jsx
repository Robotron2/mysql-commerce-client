import "./App.css"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CrudProduct"
import AllProducts from "./Pages/Admin/pages/AllProducts"
import Register from "./Pages/Auth/Pages/Register"
import Login from "./Pages/Auth/Pages/Login"
import Admin from "./routes/Admin"
import UserManagement from "./Pages/Admin/pages/UserManagement"
import ProductCatalog from "./Pages/Products/pages/ProductCatalog"
import ViewProduct from "./Pages/Products/pages/ViewProduct"

import React from "react"
import SearchResult from "./Components/Layouts/components/SearchResult"
import CategoryView from "./Pages/Products/pages/CategoryView"
import MyCart from "./Pages/User/pages/MyCart"
import Profiles from "./Pages/User/pages/Profiles"
import User from "./routes/UserRoute"

const ScrollToTop = () => {
	const { pathname } = useLocation()

	React.useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

function App() {
	return (
		<>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					{/* Product Browsing */}
					<Route path="/products" element={<ProductCatalog />} />
					<Route path="/products/:id" element={<ViewProduct />} />
					<Route path="/products/search" element={<SearchResult />} />
					<Route path="/category/:id" element={<CategoryView />} />
					<Route path="/cart" element={<MyCart />} />

					<Route path="/admin" element={<Admin />}>
						{/* Product Management */}
						<Route path="crud-product" element={<CreateProduct />} />
						<Route path="get-products" element={<AllProducts />} />

						{/* User Management */}
						<Route path="user-management" element={<UserManagement />} />
					</Route>

					<Route path="/user" element={<User />}>
						<Route path="profile" element={<Profiles />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
