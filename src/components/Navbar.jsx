import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold tracking-[0.3em] luxury-heading text-primary">
              SHINE
            </span>
            <span className="text-2xl font-light tracking-[0.2em] luxury-heading ml-1">
            WEARS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-secondary'
                    : 'text-foreground hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Link
              to="/admin/login"
              className="hidden md:flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-secondary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm tracking-widest uppercase py-2 ${
                  isActive(link.path)
                    ? 'text-secondary'
                    : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm tracking-widest uppercase py-2 text-muted-foreground"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
