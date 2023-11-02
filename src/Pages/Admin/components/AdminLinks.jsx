import { Link } from "react-router-dom"

function AdminLinks() {
	return (
		<>
			<div className="w-full secondary-nav md:flex justify-around lg:justify-between items-center p-3 text-white">
				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link>Dashboard</Link>
					{/* A dashboard with an overview of key e-commerce metrics like sales, orders, and product management tools. */}
				</h6>
				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link to={"/admin/crud-product"}>Product Management</Link>
					{/* Pages to add, edit, and delete products. Product categories and attributes can also be managed here. */}
				</h6>
				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link>Order Management</Link>
					{/* Admins should have access to view and manage orders, update order statuses, and handle customer inquiries. */}
				</h6>
				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link>User Manegement</Link>
					{/* If admin roles are tied to users, you might need user management pages for managing admin accounts and other users. */}
				</h6>
				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link>Reports and Analytics</Link>
					{/* Admins might need access to reporting and analytics tools to analyze sales data, customer behavior, and other e-commerce metrics. */}
				</h6>

				<h6 className="font-semibold text-sm hover:bg-white hover:text-gray-900 p-2 rounded transition duration-300 ease-in-out cursor-pointer">
					<Link>Settings</Link>
					{/* Allow admins to configure system settings, including payment gateways, shipping options, and other site-specific configurations. */}
				</h6>
			</div>
		</>
	)
}

export default AdminLinks
