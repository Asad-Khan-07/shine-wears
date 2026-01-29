import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Search } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { InsertData } from '../../services/insert';
import { getProducts } from '../../services/getProduct';
// import { supabase } from '../../services/supabase';
import { ProductDelete } from '../../services/deleteProduct';
import { UpdateProduct } from '../../services/Updateproduct';

export default function AdminProducts() {
  const { categories, addProduct, updateProduct, deleteProduct } = useData();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    categoryName: '',
    image: '',
    featured: false,
    inStock: true,
    details: ''
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products, error } = await getProducts();
      if (error) console.error(error);
      else setData(products);
    };
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = data.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =filterCategory === 'all' || product.category_name.toString() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        categoryId: product.category_id,
        categoryName: product.category_name,
        image: product.image,
        featured: product.featured,
        inStock: product.in_stock,
        details: product.details // convert array to string
      });
      console.log(product.category_id);
      
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: categories[0]?.id || '',
        categoryName: categories[0]?.name || '',
        image: '',
        featured: false,
        inStock: true,
        details: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      category_id: formData.categoryId,
      category_name: formData.categoryName,
      details: formData.details.split('\n').filter(d => d.trim())
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setData(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      addProduct(productData);
      setData(prev => [...prev, productData]);
    }

    closeModal();
  };



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl luxury-heading">Products</h1>
            <p className="text-muted-foreground mt-1">Manage your product catalog</p>
          </div>
          <button onClick={() => openModal()} className="luxury-button flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="luxury-input pl-10"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="luxury-input w-full md:w-48"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.featured && <span className="text-xs text-secondary">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {product.category_name || 'Uncategorized'}
                    </td>
                    <td className="py-4">{formatPrice(product.price)}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(product)} className="p-2 hover:bg-muted rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => ProductDelete(product.category_id)} className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-background w-full max-w-2xl rounded-lg shadow-xl my-8">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl luxury-heading">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="luxury-input"
                      placeholder="Product name"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Category</label>
                    <select
                      value={JSON.stringify({id: formData.categoryId, name: formData.categoryName})}
                      onChange={(e) => {
                        const selected = JSON.parse(e.target.value);
                        setFormData({
                          ...formData,
                          // categoryId: selected.id,
                          // categoryName: selected.name
                        });
                      }}
                      className="luxury-input"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={JSON.stringify({id: cat.id, name: cat.name})}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="luxury-input"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm tracking-wider mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="luxury-input min-h-[100px]"
                      placeholder="Product description"
                      required
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2">
                    <label className="block text-sm tracking-wider mb-2">Details (one per line)</label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="luxury-input min-h-[80px]"
                      placeholder="18k White Gold&#10;1 Carat Diamond&#10;Handcrafted"
                    />
                  </div>

                  {/* Image */}
                  <div className="md:col-span-2">
                    <label className="block text-sm tracking-wider mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="luxury-input"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  {formData.image && (
                    <div className="md:col-span-2">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    </div>
                  )}

                  {/* Featured + InStock */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">In Stock</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 border border-border hover:bg-muted transition-colors">Cancel</button>
                    {editingProduct ? 
                  <button onClick={(e)=>{e.preventDefault(); UpdateProduct(formData)}}  className="flex-1 luxury-button"> Update Product</button>
                  : 
                  <button onClick={(e) =>{ e.preventDefault(); InsertData(formData)}}  className="flex-1 luxury-button">{editingProduct ? 'Update' : 'Add'} Product</button>
                  }
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
