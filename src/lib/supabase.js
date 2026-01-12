import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using localStorage fallback.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper functions for itinerary operations
export const fetchItinerary = async (userId = 'default') => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('itineraries')
    .select('data')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching itinerary:', error);
    return null;
  }

  return data?.data || null;
};

export const saveItinerary = async (itineraryData, userId = 'default') => {
  if (!supabase) return false;

  const { error } = await supabase
    .from('itineraries')
    .upsert(
      {
        user_id: userId,
        data: itineraryData,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id' }
    );

  if (error) {
    console.error('Error saving itinerary:', error);
    return false;
  }

  return true;
};

export const deleteItinerary = async (userId = 'default') => {
  if (!supabase) return false;

  const { error } = await supabase
    .from('itineraries')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting itinerary:', error);
    return false;
  }

  return true;
};
