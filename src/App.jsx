import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import CreateProduct from "./Pages/Admin/pages/CreateProduct"
import AllProducts from "./Pages/Admin/pages/AllProducts"
import Register from "./Pages/Auth/Pages/Register"
import Login from "./Pages/Auth/Pages/Login"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					<Route path="/create-product" element={<CreateProduct />} />
					<Route path="/get-products" element={<AllProducts />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
