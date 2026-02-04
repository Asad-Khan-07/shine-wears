import { supabase } from "./supabase";
import { toast } from 'sonner';
export const PlaceOrder = async (formData) => {
  const { data, error } = await supabase
    .from("Orders")
    .insert([
      {
        first_Name: formData.Firstname,
        last_Name: formData.Lastname,
        email: formData.Email,
        Phone: formData.Phone,
        items: formData.Item, // JSON
        Quantity: formData.Quantity,
        Total: formData.Total,
        Address: formData.Address,
        City: formData.City,
        State: formData.State,
        zip_Code: formData.Zipcode,
        status:formData.status
      }
    ]);

  if (error) {
    // alert("Order Error:", error.message);
    // console.log(error.message);
    toast.error("Could not Place Order")
  } else {
    // alert("Order placed successfully ✅");
    toast.success("Order Placed successfully")
  }
};
