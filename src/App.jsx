import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CrudProduct"
import AllProducts from "./Pages/Admin/pages/AllProducts"
import Register from "./Pages/Auth/Pages/Register"
import Login from "./Pages/Auth/Pages/Login"
import Admin from "./routes/Admin"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					<Route path="/admin" element={<Admin />}>
						<Route path="crud-product" element={<CreateProduct />} />
						<Route path="get-products" element={<AllProducts />} />
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
