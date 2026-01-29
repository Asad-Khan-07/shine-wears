import { supabase } from "./supabase";

export const InsertData = async (formData) => {
//   e.preventDefault();

  const { error } = await supabase
    .from('Add Products')
    .insert([
      {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        // category_id: formData.categoryId,
        image: formData.image,
        featured: formData.featured,
        in_stock: formData.inStock,
        details: formData.details,
        category_name:formData.categoryName
      }
    ]);

  if (error) {
    console.log(error.message);
    // alert("Error saving product");
  } else {
    alert("Product added successfully");
  }
};
