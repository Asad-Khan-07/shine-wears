import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { InsertCat } from '../../services/insertCategory';
import { getCategories } from '../../services/getCategories';
import { CategoryDelete } from '../../services/deleteCategories';
import { UpdateCategory } from '../../services/UpdateCategory';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    uuid:''
  });



 useEffect(() => {
    const fetchProducts = async () => {
      const { data:products, error } = await getCategories();
      if (error) console.error(error);
      else {setData(products);
      console.log(data);
      }
    };
    fetchProducts();
  }, []);



  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.category_name,
        description: category.description,
        image: category.img_url,
        uuid:category.uuid
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (editingCategory) {
  //     updateCategory(editingCategory.id, formData);
  //   } else {
  //     addCategory(formData);
  //   }
  //   closeModal();
  // };

  const handleDelete = (id) => {
    const productCount = products.filter(p => p.categoryId === id).length;
    const message = productCount > 0
      ? `This will also delete ${productCount} product(s) in this category. Are you sure?`
      : 'Are you sure you want to delete this category?';
    
    if (window.confirm(message)) {
      deleteCategory(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl luxury-heading">Categories</h1>
            <p className="text-muted-foreground mt-1">Manage your product categories</p>
          </div>
          <button
            onClick={() => openModal()}
            className="luxury-button flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((category) => {
            // const productCount = products.filter(p => p.categoryId === category.id).length;
            return (
              <div key={category.id} className="admin-card">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.img_url}
                    alt={category.category_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                <h3 className="text-lg font-medium mb-1">{category.category_name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {/* {productCount} {productCount === 1 ? 'product' : 'products'} */}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(category)}
                    className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded text-sm transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => CategoryDelete(category.uuid)}
                    className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background w-full max-w-md rounded-lg shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl luxury-heading">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form  className="p-6 space-y-4">
                <div>
                  <label className="block text-sm tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="luxury-input"
                    placeholder="Category name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm tracking-wider mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="luxury-input min-h-[100px]"
                    placeholder="Category description"
                    required
                  />
                </div>
                
                <div>
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
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                    {editingCategory ?  
                  <button onClick={(e)=>{e.preventDefault(); UpdateCategory(formData)}}  className="flex-1 luxury-button">
                    Update Category
                  </button>
                    : 
                  <button onClick={(e)=> {e.preventDefault(); InsertCat(formData)}}  type="submit" className="flex-1 luxury-button">
                    Add Category
                  </button>
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
