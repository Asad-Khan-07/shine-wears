import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
// import { useData } from '../context/DataContext';
// import { getCategories } from '../services/getCategories';
import { CategoryContext } from '../context/Category';

export default function Categories() {
  // const { categories } = useData();
  // const { categories } = useData();
const [data,setData]=useState([])
  const { category } = useContext(CategoryContext );
//   useEffect(()=>{
// const res=async () => {
//   const cat=await getCategories()
//   // console.log(cat.data);
//   setData(cat.data)
  
// }

// res()
//   },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="luxury-subheading mb-4">Collections</p>
            <h1 className="text-4xl md:text-5xl luxury-heading mb-4">Shop by Category</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our curated collections, each designed with a unique aesthetic 
              to complement your personal style.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </main>

      <Footer />
    </div>
  );
}
