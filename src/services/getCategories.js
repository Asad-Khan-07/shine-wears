import { supabase } from "./supabase";

export const getCategories = async () => {
  return await supabase
    .from('Add Categories')
    .select('*')
    .order('created_at', { ascending: false });
};
