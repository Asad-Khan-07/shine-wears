import { createContext, useEffect, useState } from "react";
// import { getProducts } from "../services/getProduct";
import { getOrders } from "../services/getOrders";
// import { getProducts } from "../services/api";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getOrders();
      setOrder(res?.data );
      setLoading(false);

    };
    
    fetchProducts();
}, []);

  return (
    <OrderContext.Provider value={{ order, loading }}>
      {children}
    </OrderContext.Provider>
  );
};
