/* eslint-disable react/prop-types */
import {useState} from "react"

import ProductContext from "./ProductContext"

const ProductProvider = ({children})=>{
  const [productId, setProductId] = useState("")

  return (<ProductContext.Provider value={{productId, setProductId}}>
    {children}
  </ProductContext.Provider>)
}

export default ProductProvider
