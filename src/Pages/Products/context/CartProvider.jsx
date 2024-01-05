/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import CartContext from "./CartContext"
import axios from "axios"
import useAuth from "../../../Components/CustomHooks/UseAuth"

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
	// const [cart, setCart] = useState(null)
	const [totalValue, setTotalValue] = useState(0)
	const [cartLength, setCartLength] = useState(0)
	const [cartItems, setCartItems] = useState([])
	const [fetchCart, setFetchCart] = useState(false)
	const [auth] = useAuth()

	const updateTotalValue = (newValue) => {
		setTotalValue(newValue)
	}
	const updateCartLength = (length) => {
		setCartLength(length)
	}
	const updateCartItems = (items) => {
		setCartItems(items)
	}

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))
	const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
	const fetchCartData = async () => {
		const response = await axios.get(`${apiEndpoint}/carts/cart-info`, {
			headers: {
				Authorization: localAuth,
			},
		})
		if (response.data.success) {
			updateTotalValue(response.data?.total)
			updateCartLength(response.data?.length)
			updateCartItems(response.data?.userCart.cart)
		}
	}

	useEffect(() => {
		fetchCartData()
	}, [fetchCart, auth])

	return (
		<CartContext.Provider
			value={{
				// cart,
				totalValue,
				cartLength,
				fetchCart,
				cartItems,
				// updateCart,
				updateCartItems,
				setCartLength,
				updateTotalValue,
				setFetchCart,
				updateCartLength,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
export default CartProvider
