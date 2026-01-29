import { supabase } from "./supabase";

export const getProducts = async () => {
  return await supabase
    .from('Add Products')
    .select('*')
    .order('created_at', { ascending: false });
};
