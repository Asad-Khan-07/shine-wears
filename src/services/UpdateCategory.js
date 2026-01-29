
import { supabase } from "./supabase";

export const UpdateCategory = async ( formData) => {
  const { data, error } = await supabase
    .from('Add Categories')
    .update({
      category_name: formData.name,
      description: formData.description,
      img_url: formData.image
    //   uuid:formData.uuid  
    })
    .eq('uuid', formData.uuid)     // 👈 YE MOST IMPORTANT LINE
    .select()
    .single();

  if (error) {
    console.error('Update Error:', error);
    // return { error };
  }else{
    alert("Category update succesfully")
  }

//   return { data };
};
