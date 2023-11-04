import { useState } from "react"
import CrudContext from "./CrudContext"

const CrudProvider = ({children})=>{
const [view, setView] = useState("read")
return (
    <CrudContext.Provider value={{view, setView}}>
{children}

    </CrudContext.Provider>
)
}

export default CrudProvider