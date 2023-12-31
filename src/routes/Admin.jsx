/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"

import useAuth from "../Components/CustomHooks/UseAuth"

import Login from "../Pages/Auth/Pages/Login"
import Spinner from "../Components/Utils/Spinner"

const Admin = () => {
	const [ok, setOk] = useState("")
	const [spinner, setSpinner] = useState(null)
	const [auth, setAuth] = useAuth()
	const localAuth = JSON.parse(localStorage.getItem("accessToken"))
	axios.defaults.withCredentials = true

	const authCheck = async () => {
		setSpinner(true)
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const authResponse = await axios.get(`${apiEndpoint}/auth/user/admin-auth`, {
				headers: {
					accessToken: `${localAuth?.token}`,
				},
			})
			if (authResponse.data.ok) {
				setOk(true)
				// setSpinner(false)
			}
			// console.log(authResponse)
		} catch (error) {
			console.log(error)
			// setOk(false)
		}
		setSpinner(false)
	}

	useEffect(() => {
		authCheck()
	}, [auth?.token])

	return (
		<>
			{spinner && <Spinner />}
			{/* {(ok && !spinner) && <Outlet /> : <Login />} */}
			{ok && !spinner && <Outlet />}
			{!ok && !spinner && <Login />}
		</>
	)
}

export default Admin
