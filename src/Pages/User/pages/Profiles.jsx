import Header from "../../../Components/Layouts/Header"
import { motion } from "framer-motion"

function Profiles() {
	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			<Header />
			<div className="md:px-14 lg:px-44 mb-96">
				<h1>Product Catalog</h1>
				<div className="p-8 mx-auto w-full mt-4 flex justify-center">
					<button
						className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
						onClick={() => {
							if (page >= 1) {
								setPage(page + 1)
							}
						}}
					>
						Click More
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default Profiles
