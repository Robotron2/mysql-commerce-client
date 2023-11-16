/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import CartContext from "./CartContext"
import axios from "axios"
import useAuth from "../../../Components/CustomHooks/UseAuth"

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(null)
	const [totalValue, setTotalValue] = useState(0)
	const [cartLength, setCartLength] = useState(0)
	const [cartItems, setCartItems] = useState([])
	const [fetchCart, setFetchCart] = useState(false)
	const [auth] = useAuth()
	// console.log(auth)

	const updateCart = (newCart) => {
		setCart(newCart)
	}

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
		const response = await axios.get(`${apiEndpoint}/carts`, {
			headers: {
				accessToken: `${localAuth?.token}`,
			},
		})
		if (response.data.success) {
			updateCart(response.data.cart)
		}
		// console.log(response.data.cart)
	}

	const fetchCartItemsTotal = async () => {
		const response = await axios.get(`${apiEndpoint}/carts/total`, {
			headers: {
				accessToken: `${localAuth?.token}`,
			},
		})
		if (response.data.success) {
			updateTotalValue(response.data.totalValue)
			updateCartLength(response.data.cart.CartItems.length)
			updateCartItems(response.data.cart.CartItems)
			// console.log(response.data.cart.CartItems.length)
			// console.log(response.data.totalValue)
			// console.log(response.data)
		}
	}
	useEffect(() => {
		fetchCartData()
		fetchCartItemsTotal()
	}, [fetchCart, auth])

	return (
		<CartContext.Provider
			value={{
				cart,
				totalValue,
				cartLength,
				fetchCart,
				cartItems,
				updateCart,
				updateCartItems,
				setCartLength,
				updateTotalValue,
				setFetchCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
export default CartProvider
