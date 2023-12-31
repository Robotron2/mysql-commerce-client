/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"

import useAuth from "../Components/CustomHooks/UseAuth"

import Login from "../Pages/Auth/Pages/Login"
import Spinner from "../Components/Utils/Spinner"

const User = () => {
	const [ok, setOk] = useState(false)
	const [spinner, setSpinner] = useState(null)
	const [auth, setAuth] = useAuth()
	const localAuth = JSON.parse(localStorage.getItem("accessToken"))
	// axios.defaults.withCredentials = true
	const authCheck = async () => {
		setSpinner(true)
		if (!localAuth) {
			setOk(false)
		}
		const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API}`
		//
		try {
			const response = await axios.get(`${apiEndpoint}/user/authorize-user`, {
				headers: {
					Authorization: `${localAuth}`,
				},
			})

			if (!response.data.success) {
				setOk(false)
			} else {
				setOk(true)
				setAuth({
					...auth,
					user: response.data?.user,
					token: localAuth,
				})
			}
		} catch (error) {
			console.log(error)
		}
		setSpinner(false)
	}

	useEffect(() => {
		authCheck()
	}, [auth?.token])

	return (
		<>
			{spinner && <Spinner />}
			{ok && !spinner && <Outlet />}
			{!ok && !spinner && <Login />}
		</>
	)
}

export default User

// Gogo Task Dedicated to me. 31/12/2023
//Get webservice running in no time.
// Create a mobile app that
//Subscriptions for the whole year as regards the website and the mobile app.
