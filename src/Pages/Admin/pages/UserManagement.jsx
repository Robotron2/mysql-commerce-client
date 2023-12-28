/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import AdminLinks from "../components/AdminLinks"
import Header from "../../../Components/Layouts/Header"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

function UserManagement() {
	const localAuth = JSON.parse(localStorage.getItem("accessToken"))
	const [users, setUsers] = useState([])
	const [page, setPage] = useState(1)

	const getAllUsers = async () => {
		try {
			const users = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/admin/manage-users?page=${page}`, {
				headers: {
					accessToken: `${localAuth?.token}`,
				},
			})
			if (users.data.user.length === 0) {
				// toast.error("All products have been fetched!")
				toast("All users have been fetched!")
				setPage(1)
			}
			if (users) {
				console.log(users.data.user)
				setUsers(users.data.user)
			} else {
				console.log("There is nothing here papi!!")
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllUsers()
	}, [])
	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			<Header />
			<div className="hidden md:block md:px-14 lg:px-44 bg-gray-900">
				<AdminLinks />
			</div>

			<div className="font-semibold text-gray-900 text-center text-xl pt-10 mt-4">
				<div>Users&apos; Table</div>
			</div>

			<div className="flex flex-col px-44 border-red-50">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full text-left text-sm font-light">
								<thead className="border-b font-medium dark:border-neutral-500">
									<tr>
										<th scope="col" className="px-6 py-4">
											S/N
										</th>
										<th scope="col" className="px-6 py-4">
											Firstname
										</th>
										<th scope="col" className="px-6 py-4">
											Username
										</th>
										<th scope="col" className="px-6 py-4">
											Email
										</th>
										<th scope="col" className="px-6 py-4">
											Phone
										</th>
										<th scope="col" className="px-6 py-4">
											Address
										</th>
									</tr>
								</thead>
								<tbody>
									{users?.map((user, i) => {
										return (
											<>
												<tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={user.id}>
													<td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
													<td className="whitespace-nowrap px-6 py-4">{user.fullName}</td>
													<td className="whitespace-nowrap px-6 py-4">{user.username}</td>
													<td className="whitespace-nowrap px-6 py-4">{user.email}</td>
													<td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
													<td className="whitespace-nowrap px-6 py-4">{user.address}</td>
													{/* <td className="whitespace-nowrap px-6 py-4">
														<button>Edit</button>
														<button>Delete</button>
													</td> */}
												</tr>
											</>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="p-8 mx-auto w-full mt-4 flex justify-center">
				<button
					className="bg-gray-600 text-white text-center rounded-md p-3 hover:bg-gray-800 transition ease-in-out duration-300"
					onClick={() => {
						setPage(page + 1)
					}}
				>
					Click More
				</button>
			</div>
		</motion.div>
	)
}

export default UserManagement
