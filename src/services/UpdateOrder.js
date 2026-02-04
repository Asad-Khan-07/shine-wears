
import { supabase } from "./supabase";

export const UpdateOrder = async ( uuid,s) => {
  const { data, error } = await supabase
    .from('Orders')
    .update({
      status: s,
      // description: formData.description,
      // img_url: formData.image
    //   uuid:formData.uuid  
    })
    .eq('uuid', uuid)     // 👈 YE MOST IMPORTANT LINE
    .select()
    .single();

  if (error) {
   alert('Update Error:', error.message);
    // return { error };
    // console.log(uuid);
    // console.log(s);
    
    
  }else{
    alert("Category update succesfully")
    // console.log(uuid);
    // console.log(s);
    
  }

//   return { data };
};
