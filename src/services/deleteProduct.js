import { supabase } from "./supabase";

export const ProductDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  const { error } = await supabase
    .from('Add Products')  // table name
    .delete()
    .eq('category_id', id);     // filter by the product id

  if (error) {
    console.error('Delete Error:', error.message);
    alert('Failed to delete product!');
  } else {
    // setData(prev => prev.filter(p => p.id !== id)); // update UI
    alert('Product deleted successfully!');
  }
};

