import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
// import { useData } from '../context/DataContext';
import { getProducts } from '../services/getProduct';
import { ProductContext } from '../context/ProductContext';

export default function FeaturedProducts() {
  // const { getFeaturedProducts } = useData();
  // const featuredProducts = getFeaturedProducts().slice(0, 4);
  const {pro,setPro}=useContext(ProductContext)

// const [data,setData]=useState([])
//   useEffect(()=>{
// const res=async () => {
//   const cat=await getProducts()
//   // console.log(cat.data);
//   setPro(cat.data)
// const featuredOnly = cat.data.filter(p => p.featured === true)  
//   // if (featuredOnly) {
//     // console.log("featured");
//     setData(featuredOnly)
    
//     // console.log(data);
    
//   // }

  
// }

// res()
//   },[])






  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="luxury-subheading mb-4">Curated Selection</p>
          <h2 className="text-4xl md:text-5xl luxury-heading mb-6">Featured Pieces</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of extraordinary pieces, each one a testament 
            to exceptional craftsmanship and timeless design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {pro.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors tracking-widest uppercase text-sm group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
