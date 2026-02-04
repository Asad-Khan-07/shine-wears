import { supabase } from "./supabase";

export const getOrders = async () => {
  return await supabase
    .from('Orders')
    .select('*')
    .order('created_at', { ascending: false });
};
