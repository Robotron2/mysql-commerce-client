import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

function Register() {
	const navigate = useNavigate()

	const initialValues = {
		username: "",
		fullname: "",
		email: "",
		password: "",
		address: "",
		phone: "",
		secret: ""
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(15).required("Username is required during registration"),
		fullname: Yup.string().min(3).max(15).required("Fullname is required during registration"),
		phone: Yup.string()
			.required("Phone number is required during registration")
			.test("isNigerianPhoneNumber", "Invalid Nigerian phone number", (value) => {
				const nigerianPhoneNumberPattern = /^(\+234|0)[789]\d{9}$/
				return nigerianPhoneNumberPattern.test(value)
			}),
		secret: Yup.string().required("Secret word is required!"),
		email: Yup.string().email("must be a valid email").required("Email is required during registration"),
		password: Yup.string().min(4).max(20).required("Password is required!"),
		address: Yup.string().required("Address is required during registration")
	})

	const handleSubmit = async (data) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/auth/user/register`, data)
			// console.log(response)
			if (response.data.success) {
				//
				toast.success("Registered successfully")
				navigate("/login")
			}
		} catch (error) {
			// console.log(error)
			toast.error(error.response.data.error)
		}
	}

	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				<Form className="formContainer flex flex-col w-80">
					<label>Username: </label>
					<ErrorMessage name="username" component="span" />
					<Field autoComplete="off" id="inputCreatePost" className="inputCreatePost" name="username" placeholder="Enter your desired username" />

					<label>Fullname: </label>
					<ErrorMessage name="fullname" component="span" />
					<Field autoComplete="off" id="inputCreatePost1" className="inputCreatePost" name="fullname" placeholder="Enter your desired fullname" />

					<label>Email: </label>
					<ErrorMessage name="email" component="span" />
					<Field autoComplete="off" id="inputCreatePost2" className="inputCreatePost" name="email" placeholder="Enter your desired email" />

					<label>Phone: </label>
					<ErrorMessage name="phone" component="span" />
					<Field autoComplete="off" id="inputCreatePost3" className="inputCreatePost" name="phone" placeholder="Enter your phone number" />

					<label>Address: </label>
					<ErrorMessage name="address" component="span" />
					<Field autoComplete="off" id="inputCreatePost4" className="inputCreatePost" name="address" placeholder="Enter your home address" />

					<label>Secret Word: </label>
					<ErrorMessage name="secret" component="span" />
					<Field autoComplete="off" id="inputCreatePost5" className="inputCreatePost" name="secret" placeholder="Enter your secret word for password recovery" />

					<label>Password: </label>
					<ErrorMessage name="password" component="span" />
					<Field autoComplete="off" type="password" id="inputCreatePost6" className="inputCreatePost" name="password" placeholder="Enter your password" />

					<button type="submit" className="bg-red-500">
						Register
					</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Register
