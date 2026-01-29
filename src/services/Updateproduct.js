
import { supabase } from "./supabase";

export const UpdateProduct = async (formData) => {
  const { data, error } = await supabase
    .from('Add Products')
    .update({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
    //   category_id: fzormData.categoryId,
      category_name: formData.categoryName,
      image: formData.image,
      featured: formData.featured,
      in_stock: formData.inStock,
      details: formData.details
    })
    .eq('category_id', formData.categoryId)     // 👈 YE MOST IMPORTANT LINE
    .select()
    .single();

  if (error) {
    console.error('Update Error:', error.message);
    console.log(formData.categoryId);
    // return { error };
    
  }else{
    alert("Product Updated Successfully")
  
  }


//   return { data };
};
