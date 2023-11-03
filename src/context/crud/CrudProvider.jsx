/* eslint-disable react/prop-types */
import { useState } from "react"
import CrudContext from "./CrudContext"

export default function CrudProvider({ children }) {
	const [view, setView] = useState("read")

	return <CrudContext.Provider value={{ view, setView }}>{children}</CrudContext.Provider>
}
