/* eslint-disable react/prop-types */
import { useState } from "react";

import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  return (
    <ProductContext.Provider
      value={{ productId, setProductId, categoryId, setCategoryId }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
