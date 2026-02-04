import React, { useContext, useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
// import { useData } from '../context/DataContext';
import { getCategories } from '../services/getCategories';
import { CategoryContext } from '../context/Category';

export default function FeaturedCategories() {
   const { category } = useContext(CategoryContext );
 
// const [data,setData]=useState([])
//   useEffect(()=>{
// const res=async () => {
//   const cat=await getCategories()
//   // console.log(cat.data);
//   setData(cat.data)
  
// }

// res()
//   },[])

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="luxury-subheading mb-4">Our Collections</p>
          <h2 className="text-4xl md:text-5xl luxury-heading mb-6">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collections, each designed to complement 
            your unique style and celebrate life's precious moments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.map((cat, index) => (
            <div
              key={cat.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
