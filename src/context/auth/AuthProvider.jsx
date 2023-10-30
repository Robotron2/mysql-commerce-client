import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import axios from "axios"

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: ""
	})

	//default axios

	axios.defaults.headers.common["Authorization"] = auth?.token

	useEffect(() => {
		const userData = localStorage.getItem("auth")
		if (userData) {
			const parsedData = JSON.parse(userData)
			setAuth({
				...auth,
				user: parsedData.user,
				token: parsedData.token
			})
		}
	}, [])

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
}

export default AuthProvider
