import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CrudProduct"
import AllProducts from "./Pages/Admin/pages/AllProducts"
import Register from "./Pages/Auth/Pages/Register"
import Login from "./Pages/Auth/Pages/Login"
import Admin from "./routes/Admin"
import UserManagement from "./Pages/Admin/pages/UserManagement"
import ProductCatalog from "./Pages/Products/pages/ProductCatalog"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					{/* Product Browsing */}
					<Route path="/products" element={<ProductCatalog />} />
					<Route path="/products/:id" element={<ProductCatalog />} />

					<Route path="/admin" element={<Admin />}>
						{/* Product Management */}
						<Route path="crud-product" element={<CreateProduct />} />
						<Route path="get-products" element={<AllProducts />} />

						{/* User Management */}
						<Route path="user-management" element={<UserManagement />} />
					</Route>
					<Route path="/user" element={<Admin />}>
						<Route path="get-products" element={<AllProducts />} />
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
