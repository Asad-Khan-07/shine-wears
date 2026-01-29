import { createContext, useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";
// import { getCategories } from "../services/getCategories";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategory(res?.data || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ category, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
