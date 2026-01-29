import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories } from '../data/categories';
import { initialProducts } from '../data/products';

const DataContext = createContext(undefined);

export function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage or use initial data
  useEffect(() => {
    const savedCategories = localStorage.getItem('luxuryJewelryCategories');
    const savedProducts = localStorage.getItem('luxuryJewelryProducts');
    const savedOrders = localStorage.getItem('luxuryJewelryOrders');

    setCategories(savedCategories ? JSON.parse(savedCategories) : initialCategories);
    setProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts);
    setOrders(savedOrders ? JSON.parse(savedOrders) : generateMockOrders());
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('luxuryJewelryCategories', JSON.stringify(categories));
      localStorage.setItem('luxuryJewelryProducts', JSON.stringify(products));
      localStorage.setItem('luxuryJewelryOrders', JSON.stringify(orders));
    }
  }, [categories, products, orders, isLoaded]);

  // Category CRUD
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      slug: category.name.toLowerCase().replace(/\s+/g, '-')
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updates) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, ...updates, slug: updates.name ? updates.name.toLowerCase().replace(/\s+/g, '-') : cat.slug }
          : cat
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Also remove products in this category
    setProducts(prev => prev.filter(prod => prod.categoryId !== id));
  };

  // Product CRUD
  const addProduct = (product) => {
    const category = categories.find(c => c.id === product.categoryId);
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      category: category?.slug || ''
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    const category = updates.categoryId 
      ? categories.find(c => c.id === updates.categoryId)
      : null;
    
    setProducts(prev =>
      prev.map(prod =>
        prod.id === id
          ? {
              ...prod,
              ...updates,
              slug: updates.name ? updates.name.toLowerCase().replace(/\s+/g, '-') : prod.slug,
              category: category?.slug || prod.category
            }
          : prod
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

  // Get products by category
  const getProductsByCategory = (categorySlug) => {
    return products.filter(prod => prod.category === categorySlug);
  };

  const getCategoryBySlug = (slug) => {
    return categories.find(cat => cat.slug === slug);
  };

  const getProductBySlug = (slug) => {
    return products.find(prod => prod.slug === slug);
  };

  const getFeaturedProducts = () => {
    return products.filter(prod => prod.featured);
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        orders,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        getCategoryBySlug,
        getProductBySlug,
        getFeaturedProducts
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Generate mock orders
function generateMockOrders() {
  return [
    {
      id: 1001,
      customerName: "Emma Thompson",
      customerEmail: "emma@example.com",
      items: [
        { name: "Eternal Diamond Solitaire", quantity: 1, price: 4999 }
      ],
      total: 4999,
      status: "Delivered",
      date: "2024-01-15"
    },
    {
      id: 1002,
      customerName: "Michael Chen",
      customerEmail: "michael@example.com",
      items: [
        { name: "Tennis Diamond Bracelet", quantity: 1, price: 7999 },
        { name: "Diamond Drop Earrings", quantity: 1, price: 2899 }
      ],
      total: 10898,
      status: "Processing",
      date: "2024-01-18"
    },
    {
      id: 1003,
      customerName: "Sarah Williams",
      customerEmail: "sarah@example.com",
      items: [
        { name: "Pearl Strand Necklace", quantity: 1, price: 1899 }
      ],
      total: 1899,
      status: "Shipped",
      date: "2024-01-20"
    },
    {
      id: 1004,
      customerName: "James Rodriguez",
      customerEmail: "james@example.com",
      items: [
        { name: "Gold Hoop Earrings", quantity: 2, price: 899 },
        { name: "Layered Gold Necklace Set", quantity: 1, price: 1599 }
      ],
      total: 3397,
      status: "Pending",
      date: "2024-01-22"
    }
  ];
}
