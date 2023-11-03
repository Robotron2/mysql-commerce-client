import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import useAuth from "../../../Components/CustomHooks/UseAuth"

function Login() {
	const navigate = useNavigate()
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth()

	const initialValues = {
		email: "",
		password: ""
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("must be a valid email").required("Email is required during registration"),
		password: Yup.string().min(4).max(20).required("Password is required!")
	})

	const handleSubmit = async (data) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/auth/user/login`, data)
			if (response.success === false) {
				// console.log(response.data.error)
				toast.error(response.data.error)
			} else {
				const data = response.data
				console.log(response)
				setAuth({ data })
				localStorage.setItem("accessToken", JSON.stringify(data))
				toast.success("Logged in successfully")
				navigate(location.state || `/`)
			}
		} catch (error) {
			// console.log(error.response.data.error)
			toast.error(error.response.data.error)
		}
	}
	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			<Form className="formContainer flex flex-col w-80">
				<label>Email: </label>
				<ErrorMessage name="email" component="span" />
				<Field autoComplete="off" id="inputCreatePost2" className="inputCreatePost" name="email" placeholder="Enter your desired email" />

				<label>Password: </label>
				<ErrorMessage name="password" component="span" />
				<Field autoComplete="off" type="password" id="inputCreatePost6" className="inputCreatePost" name="password" placeholder="Enter your password" />

				<button type="submit" className="bg-red-500">
					Login
				</button>
			</Form>
		</Formik>
	)
}

export default Login
