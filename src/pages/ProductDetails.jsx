import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/getProduct';
import { ProductContext } from '../context/ProductContext';

// Utility to slugify text
const slugify = (text = '') =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function ProductDetails() {
  const { slug } = useParams(); // product slug from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
const {pro}=useContext(ProductContext)

  // Fetch the product by slug
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProducts();
      const allProducts = res?.data || [];
      // Match product based on slug
      // console.log(slug);
      // console.log(found);
      // console.log(product);
      
    };
    
    fetchProduct();
    const found = pro.find((p) => p.name ===slug);
    setProduct(found );
  }, [pro]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
  
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/shop" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link
              to={`/category/${slugify(product.category_name)}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {product.category_name}
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground text-xs tracking-widest uppercase">
                  Featured
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <p className="luxury-subheading mb-2">{product.category_name}</p>
              <h1 className="text-3xl md:text-4xl luxury-heading mb-4">{product.name}</h1>
              <p className="text-2xl text-primary font-medium mb-6">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Product Details List */}
              {product.details && (
                <div className="mb-8">
                  <h3 className="text-sm tracking-widest uppercase mb-4">Details</h3>
                  <ul className="space-y-2">
                    {product.details.split('\n').map((detail, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-3" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm tracking-widest uppercase mb-4">Quantity</h3>
                <div className="flex items-center border border-border inline-flex">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-center min-w-[60px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart / Buy Now */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 flex items-center justify-center px-8 py-4 tracking-widest uppercase text-sm font-medium transition-all duration-300 ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                  className="luxury-button-outline"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
