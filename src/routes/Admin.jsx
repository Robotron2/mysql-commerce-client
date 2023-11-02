/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"
import useAuth from "../customHooks/auth/useAuth"
import Spinner from "./../Components/Utils/Spinner"
import Login from "../Pages/Auth/Pages/Login"

const Admin = () => {
	const [ok, setOk] = useState("")
	const [spinner, setSpinner] = useState(null)
	const [auth, setAuth] = useAuth()
	const localAuth = JSON.parse(localStorage.getItem("accessToken"))

	const authCheck = async () => {
		setSpinner(true)
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
		try {
			const authResponse = await axios.get(`${apiEndpoint}/auth/user/admin-auth`, {
				headers: {
					accessToken: `${localAuth?.token}`
				}
			})
			if (authResponse.data.ok) {
				setOk(true)
				setSpinner(false)
			}
			// console.log(authResponse)
		} catch (error) {
			console.log(error)
			setOk(false)
		}
		setSpinner(false)
	}

	useEffect(() => {
		authCheck()
	}, [auth?.token])

	return (
		<>
			{spinner && <Spinner />}
			{ok ? <Outlet /> : <Login />}
		</>
	)
}

export default Admin
