// Search component
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = () => {
	const [keyword, setKeyword] = useState("")
	const navigate = useNavigate()

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
			<input
				type="text"
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value)
				}}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						// console.log("Enter key pressed ✅")
						navigate(`/products/search?keyword=${keyword}`)
					}
				}}
				placeholder="Search product name or category"
				className="w-full bg-transparent focus:outline-none ml-1"
			/>
		</>
	)
}

export default Search
