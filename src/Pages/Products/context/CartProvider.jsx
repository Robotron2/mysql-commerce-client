/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import CartContext from "./CartContext"
import axios from "axios"

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(null)
	const [totalValue, setTotalValue] = useState(0)
	const [cartLength, setCartLength] = useState(0)
	const [fetchCart, setFetchCart] = useState(false)

	const updateCart = (newCart) => {
		setCart(newCart)
	}

	const updateTotalValue = (newValue) => {
		setTotalValue(newValue)
	}
	const updateCartLength = (length) => {
		setCartLength(length)
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
			// console.log(response.data.cart.CartItems.length)
			// console.log(response.data.totalValue)
		}
	}
	useEffect(() => {
		fetchCartData()
		fetchCartItemsTotal()
	}, [fetchCart])

	return (
		<CartContext.Provider
			value={{
				cart,
				totalValue,
				cartLength,
				updateCart,
				updateTotalValue,
				fetchCart,
				setFetchCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
export default CartProvider
