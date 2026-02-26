import { useState, useEffect } from 'react';
import { supabase, MOCK_USER_LOCATION } from '../lib/supabase';

export const useStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      
      // Call distance function
      const { data, error } = await supabase.rpc('get_stores_by_distance', {
        user_lat: MOCK_USER_LOCATION.lat,
        user_lng: MOCK_USER_LOCATION.lng,
        max_distance_meters: 5000
      });

      if (error) throw error;
      
      // Fetch store categories
      const storeIds = data.map(s => s.id);
      const { data: categoriesData } = await supabase
        .from('store_categories')
        .select('*')
        .in('store_id', storeIds);

      // Transform data to match current format
      const storesWithCategories = data.map(store => ({
        id: store.id,
        name: store.name,
        image: store.image_url,
        address: store.address,
        rating: parseFloat(store.rating),
        distance: store.distance_meters < 1000 
          ? `${store.distance_meters}m` 
          : `${(store.distance_meters / 1000).toFixed(1)}km`,
        distanceMeters: store.distance_meters,
        walkTime: store.walk_time,
        badges: categoriesData
          ?.filter(c => c.store_id === store.id)
          .map(c => c.category_name) || [],
        estimatedTime: store.estimated_prep_time
      }));
      
      setStores(storesWithCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { stores, loading, error, refetch: fetchStores };
};
