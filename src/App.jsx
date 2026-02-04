import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ProductContext, ProductProvider } from "./context/ProductContext";
import { useState } from "react";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import { CategoryProvider } from "./context/Category";
import { OrderProvider } from "./context/OrderContext";
import About from "./pages/About";
import ScrollToTop from "./components/scroll/scroll";
// import { CategoryContext, CategoryProvider } from "./context/Category";

const queryClient = new QueryClient();

const App = () => {
  const [pro, setPro] = useState([]); 
  return (
    <ProductProvider>
    <OrderProvider>
                <CategoryProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <DataProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
<ScrollToTop/>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/category/:slug" element={<CategoryProducts />} />
                    <Route path="/product/:slug" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/about" element={<About/>} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/categories" element={<AdminCategories />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />

                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
{/* </ScrollToTop> */}
                </BrowserRouter>
              </CartProvider>
            </DataProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
                </CategoryProvider>
   </OrderProvider>
   </ProductProvider>
  );
};

export default App;
