import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./context/auth/AuthProvider.jsx"
import ProductProvider from "./Pages/Admin/context/ProductProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<ProductProvider>
			<Toaster />
			<App />
			</ProductProvider>
		</AuthProvider>
	</React.StrictMode>
)
