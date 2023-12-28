import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../../Components/CustomHooks/UseAuth"
import { useState } from "react"
import Spinner from "../../../Components/Utils/Spinner"
import Waves from "../../../Components/Layouts/Waves"
import { motion } from "framer-motion"

function Login() {
	const navigate = useNavigate()
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth()
	const [isLoading, setIsLoading] = useState(false)

	const initialValues = {
		email: "",
		password: "",
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Enter a valid email!").required("Email is required during registration."),
		password: Yup.string().min(4, "Password must be atleast four characters").max(20, "Password cannot be longer than 20 characters.").required("Password is required!"),
	})

	const handleSubmit = async (data) => {
		setIsLoading(true)

		try {
			const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/auth/user/login`, data)
			if (response.success === false) {
				// console.log(response.data.error)
				toast.error(response.data.error)
			} else {
				const data = response.data
				// console.log(response)
				setAuth({ data })
				localStorage.setItem("accessToken", JSON.stringify(data))
				toast.success("Logged in successfully")
				navigate(location.state || `/`)
			}
		} catch (error) {
			// console.log(error.response.data.error)
			console.log(error)
			toast.error(error.response.data.error)
		}
		setIsLoading(false)
	}

	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
			{isLoading && <Spinner />}
			{!isLoading && (
				<div>
					<>
						{/* Waves */}

						<Waves>
							<div className="m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
								<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
									<div>
										{/* <img
								src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
								className="w-32 mx-auto"
							/> */}
									</div>
									<div className="mt-12 flex flex-col items-center">
										<h1 className="text-2xl xl:text-3xl font-bold text-gray-800">Roboshoppp</h1>
										<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
											<div className="w-full flex-1 mt-8">
												<div className="mx-auto max-w-xs">
													{/* <input
												className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
												type="email"
												placeholder="Email"
											/>

											<label>Username: </label> */}
													<Form>
														<ErrorMessage name="email" component="span" className="text-red-600 text-sm" />
														<Field
															autoComplete="off"
															// id="inputCreatePost"
															className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
															name="email"
															placeholder="Email"
														/>

														<ErrorMessage name="password" component="span" className="text-red-600 text-sm" />
														<Field
															autoComplete="off"
															className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
															type="password"
															placeholder="Password"
															name="password"
														/>

														<button
															className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
															type="submit"
														>
															<svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
																<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
																<circle cx="8.5" cy={7} r={4} />
																<path d="M20 8v6M23 11h-6" />
															</svg>
															<span className="ml-3">Sign In</span>
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
													<Link to={"/register"} className="mt-6 text-xs  text-gray-700 text-center font-semibold">
														Register here
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
											backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
										}}
									/>
								</div>
							</div>
						</Waves>
					</>
				</div>
			)}
		</motion.div>
	)
}

export default Login
