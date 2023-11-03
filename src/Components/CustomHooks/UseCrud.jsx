import { useContext } from "react"
import CrudContext from "../../context/crud/CrudContext"

export default function useCrud() {
	const context = useContext(CrudContext)
	if (!context) {
		throw new Error("useCrud must be used within a CrudProvider")
	}
	return context
}
