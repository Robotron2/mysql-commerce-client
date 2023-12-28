import CartComponent from "../../../Components/Layouts/CartComponent"
import Header from "../../../Components/Layouts/Header"
import { motion } from "framer-motion"

function MyCart() {
	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			<Header />
			<CartComponent />
		</motion.div>
	)
}

export default MyCart
