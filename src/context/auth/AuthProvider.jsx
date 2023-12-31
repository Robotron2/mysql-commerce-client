import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState()

	useEffect(() => {
		const parsedData = JSON.parse(localStorage.getItem("accessToken"))
		if (parsedData) {
			setAuth({ token: parsedData.token })
		}
	}, [])

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
}

export default AuthProvider
