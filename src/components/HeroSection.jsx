import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { getProducts } from '../services/getProduct';

export default function HeroSection() {



  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80"
          alt="Luxury jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="luxury-subheading text-background/80 mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Timeless Elegance
        </p>
        
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl text-background luxury-heading mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Exquisite
          <span className="block text-secondary">Jewelry</span>
        </h1>
        
        <p 
          className="text-lg md:text-xl text-background/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          Discover our curated collection of fine jewelry, where each piece is crafted 
          to perfection and designed to be cherished for generations.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center px-10 py-4 bg-secondary text-secondary-foreground tracking-widest uppercase text-sm font-medium hover:bg-secondary/90 transition-all duration-300 group"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/categories"
            className="inline-flex items-center px-10 py-4 border-2 border-background text-background tracking-widest uppercase text-sm font-medium hover:bg-background hover:text-foreground transition-all duration-300"
          >
            View Categories
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-background/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
