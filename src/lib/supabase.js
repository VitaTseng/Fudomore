import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock user ID for development (replace with auth later)
export const MOCK_USER_ID = import.meta.env.VITE_MOCK_USER_ID;

// Mock user location (Taipei - 內湖區)
export const MOCK_USER_LOCATION = {
  lat: 25.0828,
  lng: 121.5654
};
