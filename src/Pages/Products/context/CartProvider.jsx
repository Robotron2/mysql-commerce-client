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

	// const updateCart = (newCart) => {
	// 	setCart(newCart)
	// }

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
			// updateCart(response.data?.userCart.cart)
			updateTotalValue(response.data?.total)
			updateCartLength(response.data?.length)
			updateCartItems(response.data?.userCart.cart)
		}
		// console.log(response.data)
	}

	// {
	//     "userCart": {
	//       "_id": "65970f8959d6339631b92ff3",
	//       "cart": [
	//         {
	//           "quantity": 2,
	//           "product": {
	//             "_id": "659172029ddc090e1db0a339",
	//             "name": "Product two",
	//             "image": "http://localhost:4000/public/upload/Accessories---Bluetooth-Ultra-Thin-Wireless-Mouse-2.4G-Charging-Black.jpg-1704040345468.jpeg",
	//             "price": 20,
	//             "id": "659172029ddc090e1db0a339"
	//           },
	//           "_id": "65972b9ff05a029354ceb3bc",
	//           "id": "65972b9ff05a029354ceb3bc"
	//         },
	//         {
	//           "quantity": 1,
	//           "product": {
	//             "_id": "659171969ddc090e1db0a333",
	//             "name": "Product one",
	//             "image": "http://localhost:4000/public/upload/Accessories---Ace-Elec-F9-Wireless-Fingerprint-Touch-Bluetooth-Headset.jpg-1704030614450.jpeg",
	//             "price": 20,
	//             "id": "659171969ddc090e1db0a333"
	//           },
	//           "_id": "65972daaf05a029354ceb413",
	//           "id": "65972daaf05a029354ceb413"
	//         },
	//         {
	//           "quantity": 1,
	//           "product": {
	//             "_id": "65940fc53f79dea27a772523",
	//             "name": "Apple MacBook Pro 16.2 inches - 32GB - 1TB - 10 Cores - M1 Max",
	//             "image": "http://localhost:4000/public/upload/Computer---Apple-MacBook-Pro-16.2-inches---32GB---1TB---10-Cores---M1-Max---Silver.jpg-1704202181899.jpeg",
	//             "price": 349.99,
	//             "id": "65940fc53f79dea27a772523"
	//           },
	//           "_id": "65972db2f05a029354ceb431",
	//           "id": "65972db2f05a029354ceb431"
	//         },
	//         {
	//           "quantity": 1,
	//           "product": {
	//             "_id": "659411083f79dea27a7725a7",
	//             "name": "Hp Envy 15 X360 Touchscreen-12th Gen Intel Core I7, 16GB RAM,1TB SSD",
	//             "image": "http://localhost:4000/public/upload/Computer---Hp-Envy-15-X360-Touchscreen-12th-Gen-Intel-Core-I7,-16GB-RAM,1TB-SSD,-Backlit-Keyboard,-Wins-11.jpg-1704202504519.jpeg",
	//             "price": 299.99,
	//             "id": "659411083f79dea27a7725a7"
	//           },
	//           "_id": "65972db8f05a029354ceb43b",
	//           "id": "65972db8f05a029354ceb43b"
	//         }
	//       ],
	//       "id": "65970f8959d6339631b92ff3"
	//     },
	//     "total": 709.98,
	//     "length": 4
	// }

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
