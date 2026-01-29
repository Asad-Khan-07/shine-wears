import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../context/ProductContext';

const slugify = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

export default function CategoryProducts() {
  const { slug } = useParams();
  const { pro } = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!pro || pro.length === 0) return;

    const filtered = pro.filter(
      (p) => slugify(p.category_name) === slug
    );

    if (filtered.length > 0) {
    setCategory({
      name: filtered[0].category_name,
      image: filtered[0].image,
    });
    } else {
      setCategory(null);
    }
    setProducts(filtered);
  }, [pro]);


  /* ✅ LOADER — YAHAN DECIDE HOGA */
  if (!pro || pro.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  /* ❌ NOT FOUND (sirf data aane ke baad) */
  if (!category) {
    return (    <div className="min-h-screen">
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

      <main className="pt-20">
        <section className="relative h-80 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 h-full flex justify-center items-center">
            <h1 className="text-4xl md:text-6xl luxury-heading text-background">
              {/* {category.name} */}
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Link
              to="/categories"
              className="inline-flex items-center text-muted-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
