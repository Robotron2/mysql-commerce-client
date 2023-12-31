/* eslint-disable no-unused-vars */
import { Link, json, useNavigate } from "react-router-dom"
import brand from "../../assets/brandLogo.png"
import { useEffect, useState } from "react"

import useAuth from "../CustomHooks/UseAuth"
import toast from "react-hot-toast"
import UseCrud from "../../Pages/Admin/hooks/UseCrud"
import UseCart from "../../Pages/Products/hooks/UseCart"
import Search from "./components/Search"
import axios from "axios"

const Header = () => {
	const [auth, setAuth] = useAuth()
	const { view, setView } = UseCrud()

	const [nav, setNav] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [adminSession, setAdminSession] = useState(false)
	const [userSession, setUserSession] = useState(false)
	const [user, setUser] = useState(null)
	const { cartLength, setCartLength, updateCartItems } = UseCart()

	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("accessToken")
		setIsLoggedIn(false)
		setAdminSession(false)
		setUserSession(false)
		toast.success("Logged out successfully!")
		setView("")
		setCartLength(0)
		updateCartItems([])
		navigate("/")
	}

	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const fetchRoles = async () => {
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const response = await axios.get(`${apiEndpoint}/user/authorize-roles`, {
				headers: {
					Authorization: localAuth,
				},
			})
			// console.log(response)
			if (response.data.success) {
				toast.success(response.data.message)
				setUser(response.data?.user)
				console.log(user.name)
			}
			const roles = response.data.roles
			// console.log(roles)
			if (roles && roles.isCustomer) {
				setUserSession(true)
				setAdminSession(false)
			}
			if (roles && roles.isAdmin) {
				setUserSession(false)
				setAdminSession(true)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchRoles()
	}, [])

	return (
		<>
			{/* Overlay */}
			{nav && (
				<div
					className="overlay w-full h-screen bg-black/80 fixed top-0 left-0 z-40 transition ease-in-out duration-500"
					onClick={() => setNav(!nav)}
				></div>
			)}

			<div className="bg-gray-800 text-white p-4">
				{/* Mobile navigations */}
				{nav && (
					<div className="fixed top-0 left-0 w-[300px] h-screen bg-gray-800 z-40 duration-700 transition ease-in-out" onClick={() => setNav(!nav)}>
						{/* close nav */}
						<div className="flex justify-between items-center p-1 text-gray-200" onClick={() => setNav(!nav)}>
							<h2 className="text-2xl p-4 ">
								Robo<span className="font-bold underline">Shopp</span>
							</h2>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-8 h-8 mr-2 font-extrabold cursor-pointer"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
						<nav>
							{adminSession && (
								<ul className="flex flex-col p-4 text-gray-200 mt-10">
									<Link>
										<li className="text-lg flex my-2">Dashboard</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Product Management</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Order Mangement</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">User Management</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Reports and Analytics</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Settings</li>
									</Link>
								</ul>
							)}

							{userSession && (
								<ul className="flex flex-col p-4 text-gray-200 mt-10">
									<Link to={`/user/profile`}>
										<li className="text-lg flex my-2">My Profile</li>
									</Link>
									<Link to={`/cart`}>
										<li className="text-lg flex my-2">My Cart</li>
									</Link>
								</ul>
							)}

							{isLoggedIn === false && (
								<ul className="flex flex-col p-4 text-gray-200 mt-10">
									<Link>
										<li className="text-lg flex my-2">Home</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Contact Us</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">Terms and Conditions</li>
									</Link>
									<Link>
										<li className="text-lg flex my-2">FAQs</li>
									</Link>
								</ul>
							)}

							<ul>
								{isLoggedIn && userSession && (
									<div className="col-start-10 row-start-1 col-span-12 login flex justify-between items-center w-56 ">
										<Link
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center capitalize font-semibold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											to={"/user/profile"}
										>
											{user?.name}
										</Link>
										<button
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center text-bold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											onClick={handleLogout}
										>
											Logout
										</button>
									</div>
								)}

								{isLoggedIn && adminSession && (
									<div className="col-start-10 row-start-1 col-span-12 login flex justify-between items-center w-56 ">
										<Link
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center capitalize font-semibold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											to={"/admin/crud-product"}
										>
											{user?.name}
										</Link>
										<button
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center text-bold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											onClick={handleLogout}
										>
											Logout
										</button>
									</div>
								)}

								{isLoggedIn === false && (
									<div className="col-start-10 row-start-1 col-span-12 login flex justify-between items-center w-56 ">
										<Link
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											to="/login"
										>
											Login
										</Link>
										<Link
											className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
											to="/register"
										>
											Sign Up
										</Link>
									</div>
								)}
							</ul>
						</nav>
					</div>
				)}

				{/*Large screen*/}
				<div className="grid grid-cols-12 gap-1 lg:flex lg:justify-between items-center md:px-10">
					<div
						className="nav-menu lg:hidden text-white text-2xl  flex items-center col-span-1 col-start-1 col-end-1 row-start-1"
						onClick={() => setNav(!nav)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 cursor-pointer"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</div>

					<Link to={"/"} className="logo flex items-center col-span-1 col-start-2 lg:col-start-1 row-start-1 row-span-2 cursor-pointer">
						<img src={brand} alt="Brand" className="hidden sm:block w-10 lg:w-full h-10" />
						<h1 className="font-bold text-gray-100">RoboShopp</h1>
					</Link>
					<div className="search flex bg-gray-500 items-center w-full lg:w-96 p-1 md:p-2 rounded-full col-start-1 lg:col-start-6 col-end-12 row-start-3">
						<Search />
					</div>

					{/* Auth State */}

					{isLoggedIn && userSession && (
						<div className=" login md:flex justify-between items-center w-56 col-span-3 hidden md:col-start-7 row-start-1">
							<Link
								className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center capitalize font-semibold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								to={"/admin/crud-product"}
							>
								{user?.name}
							</Link>
							<button
								className=" mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center text-bold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}

					{isLoggedIn && adminSession && (
						<div className=" login md:flex justify-between items-center w-56 col-span-3 hidden md:col-start-7 row-start-1">
							<Link
								className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center capitalize font-semibold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								to={"/admin/crud-product"}
							>
								{user?.name}
							</Link>
							<button
								className=" mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center text-bold hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}

					{isLoggedIn === false && (
						<div className=" login md:flex justify-between items-center w-56 col-span-3 hidden md:col-start-7 row-start-1">
							<Link
								className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								// className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center capitalize font-semibold
								to="/login"
							>
								Login
							</Link>
							<Link
								className="mx-1 bg-white text-gray-900 p-2 rounded-full w-full text-sm text-center hover:bg-slate-500 hover:text-white transition duration-300 ease-in-out"
								to="/register"
							>
								Sign Up
							</Link>
						</div>
					)}

					<Link to={"/cart"} className="cart col-start-11 col-span-2 md:row-start-1 row-start-1 flex md:justify-between cursor-pointer items-center ">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
						<p className="font-semibold text-gray-200 mr-1">Cart</p>
						<span className="font-bold">{cartLength}</span>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Header
