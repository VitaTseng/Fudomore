import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useMenuItems = (storeId) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      fetchMenu();
    }
  }, [storeId]);

  const fetchMenu = async () => {
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('menu_categories')
        .select('*')
        .eq('store_id', storeId)
        .eq('is_active', true)
        .order('display_order');

      setCategories(categoriesData?.map(cat => ({
        id: cat.name,
        label: cat.display_name
      })) || []);

      // Fetch menu items with variations
      const { data: itemsData } = await supabase
        .from('menu_items')
        .select(`
          *,
          category:menu_categories(name),
          variations:item_variations(
            id, value, display_name, price_adjustment,
            is_default, display_order,
            type:variation_types(name, display_name)
          )
        `)
        .eq('store_id', storeId)
        .eq('is_available', true)
        .order('display_order');

      // Transform to current format
      const transformedItems = itemsData?.map(item => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.base_price),
        image: item.image_url,
        category: item.category?.name,
        variations: groupVariations(item.variations)
      }));

      setMenuItems(transformedItems || []);
    } catch (err) {
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const groupVariations = (variations) => {
    const grouped = {};
    variations?.forEach(v => {
      const typeName = v.type.name;
      if (!grouped[typeName]) {
        grouped[typeName] = {
          displayName: v.type.display_name,
          options: []
        };
      }
      grouped[typeName].options.push({
        value: v.value,
        display: v.display_name,
        priceAdjustment: parseFloat(v.price_adjustment || 0),
        isDefault: v.is_default
      });
    });
    return grouped;
  };

  return { menuItems, categories, loading };
};
