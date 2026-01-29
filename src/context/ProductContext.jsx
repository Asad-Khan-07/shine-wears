import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/getProduct";
// import { getProducts } from "../services/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setPro(res?.data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ pro, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
