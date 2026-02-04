// import { supabase } from "./supabase";

import { supabase } from "./supabase";

export const InsertCat = async (formData) => {
//   e.preventDefault();
    try{
  const { error } = await supabase
    .from('Add Categories')
    .insert([
      {
        category_name: formData.name,
        description: formData.description,
        // price: Number(formData.price),
        // category_id: formData.categoryId,
        img_url: formData.image,
        // featured: formData.featured,
        // in_stock: formData.inStock,
        // details: formData.details,
        // category_name:formData.categoryName
      }
    ]);

  if (error) {
    alert(error.message);
    // alert("Error saving product");
  } else {
    alert("Category added successfully");
  }}
  catch(error){
    alert(error);
    
  }
};
