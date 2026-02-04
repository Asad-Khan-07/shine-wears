import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../context/ProductContext';
import { CategoryContext } from '../context/Category';
import { useData } from '../context/DataContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useData();          // local categories
  const { pro } = useContext(ProductContext); // supabase products
 const { category } = useContext(CategoryContext );

  const [sortBy, setSortBy] = useState('featured');

  // ✅ category URL se lo
  const selectedCategory = searchParams.get('category') || 'all';

  // ✅ filter products by category_name
  const filteredProducts =
    selectedCategory === 'all'
      ? pro
      : pro.filter(
          (p) =>
            p.category_name &&
            p.category_name.toLowerCase() === selectedCategory.toLowerCase()
        );

  // ✅ sorting (SAFE & CORRECT)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }

    if (sortBy === 'price-high') {
      return b.price - a.price;
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }

    // featured first
    return Number(b.featured) - Number(a.featured);
  });

  // ✅ update URL
  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="luxury-subheading mb-4">Our Collection</p>
            <h1 className="text-4xl luxury-heading mb-4">
              Shop All Jewelry
            </h1>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">

            {/* Filters + Sort */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-muted'
                  }`}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`px-4 py-2 ${
                      selectedCategory === cat.name
                        ? 'bg-primary text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border bg-background"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No products found
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
