import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
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
		secret: "",
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(3)
			.max(15)
			.required("Username is required during registration"),
		fullname: Yup.string()
			.min(3)
			.max(15)
			.required("Fullname is required during registration"),
		phone: Yup.string()
			.required("Phone number is required during registration")
			.test(
				"isNigerianPhoneNumber",
				"Invalid Nigerian phone number",
				(value) => {
					const nigerianPhoneNumberPattern = /^(\+234|0)[789]\d{9}$/
					return nigerianPhoneNumberPattern.test(value)
				}
			),
		secret: Yup.string().required("Secret word is required!"),
		email: Yup.string()
			.email("Enter a valid email")
			.required("Email is required during registration"),
		password: Yup.string()
			.min(4, "Password must be atleast four characters.")
			.max(20, "Password cannot be longer than 20 characters")
			.required("Password is required!"),
		address: Yup.string().required("Address is required during registration"),
	})

	const handleSubmit = async (data) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_REACT_APP_API}/auth/user/register`,
				data
			)
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
			<>
				<div>
					<div className="m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
						<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
							<div>
								{/* <img
								src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
								className="w-32 mx-auto"
							/> */}
							</div>
							<div className="mt-12 flex flex-col items-center">
								<h1 className="text-2xl xl:text-3xl font-bold text-gray-800">
									Roboshoppp
								</h1>
								<Formik
									initialValues={initialValues}
									onSubmit={handleSubmit}
									validationSchema={validationSchema}
								>
									<div className="w-full flex-1 mt-8">
										<div className="mx-auto max-w-xs">
											{/* <input
												className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
												type="email"
												placeholder="Email"
											/>

											<label>Username: </label> */}
											<Form>
												<ErrorMessage
													name="username"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													// id="inputCreatePost"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
													name="username"
													placeholder="Username"
												/>

												<ErrorMessage
													name="fullname"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													// id="inputCreatePost"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													name="fullname"
													placeholder="Full name"
												/>

												<ErrorMessage
													name="email"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													// id="inputCreatePost"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													name="email"
													placeholder="Email"
												/>

												<ErrorMessage
													name="phone"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													// id="inputCreatePost3"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													name="phone"
													placeholder="Enter your phone number"
												/>

												<ErrorMessage
													name="address"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													// id="inputCreatePost4"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													name="address"
													placeholder="Enter your home address"
												/>

												<ErrorMessage
													name="password"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													type="password"
													placeholder="Password"
													name="password"
												/>

												<ErrorMessage
													name="secret"
													component="span"
													className="text-red-600 text-sm"
												/>
												<Field
													autoComplete="off"
													id="inputCreatePost5"
													className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
													name="secret"
													placeholder="Secret word for password recovery"
												/>
												<button
													className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
													type="submit"
												>
													<svg
														className="w-6 h-6 -ml-2"
														fill="none"
														stroke="currentColor"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
														<circle cx="8.5" cy={7} r={4} />
														<path d="M20 8v6M23 11h-6" />
													</svg>
													<span className="ml-3">Sign Up</span>
												</button>
											</Form>

											{/* <p className="mt-6 text-xs text-gray-600 text-center">
												I agree to abide by templatana&apos;s
												<a
													href="#"
													className="border-b border-gray-500 border-dotted"
												>
													Terms of Service
												</a>
												and its
												<a
													href="#"
													className="border-b border-gray-500 border-dotted"
												>
													Privacy Policy
												</a>
											</p> */}
											<Link
												to={"/Login"}
												className="mt-6 text-xs text-gray-700 text-center font-semibold"
											>
												Login here
											</Link>
										</div>
									</div>
								</Formik>
							</div>
						</div>
						<div className="flex-1 bg-gray-100 text-center hidden lg:flex">
							<div
								className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
								style={{
									backgroundImage:
										'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
								}}
							/>
						</div>
					</div>
				</div>
			</>
		</div>
	)
}

export default Register
