import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };
// console.log(product.name);

  return (
    <Link
      to={`/product/${product.name}`}
      className="group block"
    >
      <div className="luxury-card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground text-xs tracking-widest uppercase">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            {product.category}
          </p>
          <h3 className="text-lg luxury-heading mb-2 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
          <p className="text-primary font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
