import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export const useUserOrders = () => {
  const { userId } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            store:stores(name, address, phone),
            items:order_items(*)
          `)
          .eq('user_id', userId)
          .order('ordered_at', { ascending: false });

        if (error) throw error;
        setOrders(data?.map(transformOrder) || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const subscription = supabase
      .channel('user_orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`
        },
        () => fetchOrders()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [userId]);

  const refetch = () => {
    if (!userId) return;
    setLoading(true);
    supabase
      .from('orders')
      .select(`*, store:stores(name, address, phone), items:order_items(*)`)
      .eq('user_id', userId)
      .order('ordered_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setOrders(data?.map(transformOrder) || []);
        setLoading(false);
      });
  };

  return { orders, loading, refetch };
};

export const useActiveOrder = () => {
  const { userId } = useUser();
  const [activeOrder, setActiveOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setActiveOrder(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchActiveOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            store:stores(name),
            items:order_items(*)
          `)
          .eq('user_id', userId)
          .in('status', ['pending', 'confirmed', 'preparing', 'ready'])
          .order('ordered_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setActiveOrder(data ? transformActiveOrder(data) : null);
      } catch (err) {
        console.error('Error fetching active order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveOrder();

    const subscription = supabase
      .channel('active_order')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (['pending', 'confirmed', 'preparing', 'ready'].includes(payload.new?.status)) {
            fetchActiveOrder();
          }
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [userId]);

  return { activeOrder, loading };
};

export const useOrderStatus = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetchOrder();

    // Real-time updates for this order
    const subscription = supabase
      .channel(`order_${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          setOrder(transformOrder(payload.new));
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          store:stores(name, address, phone),
          items:order_items(*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      
      setOrder(transformOrder(data));
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  return { order, loading };
};

function transformOrder(order) {
  return {
    id: order.id,
    orderNumber: order.order_number.split('-')[2], // Extract short number
    status: order.status,
    storeName: order.store?.name,
    storeAddress: order.store?.address,
    storePhone: order.store?.phone,
    orderedAt: new Date(order.ordered_at),
    preparingAt: order.preparing_at ? new Date(order.preparing_at) : null,
    readyAt: order.ready_at ? new Date(order.ready_at) : null,
    completedAt: order.completed_at ? new Date(order.completed_at) : null,
    itemsCount: order.items?.length || 0,
    total: parseFloat(order.total_amount),
    pickupMethod: order.pickup_method,
    pickupTimeStart: order.pickup_time_start,
    pickupTimeEnd: order.pickup_time_end,
    items: order.items?.map(item => ({
      id: item.id,
      name: item.item_name,
      quantity: item.quantity,
      size: item.variations?.size,
      ice: item.variations?.ice,
      sugar: item.variations?.sugar,
      price: parseFloat(item.base_price),
      image: item.item_image_url
    })) || []
  };
}

function transformActiveOrder(order) {
  return {
    id: order.id,
    orderNumber: order.order_number.split('-')[2],
    status: order.status,
    storeName: order.store?.name,
    pickupTimeStart: order.pickup_time_start,
    pickupTimeEnd: order.pickup_time_end,
    total: parseFloat(order.total_amount),
    orderedAt: new Date(order.ordered_at),
    preparingAt: order.preparing_at ? new Date(order.preparing_at) : null,
    items: order.items?.map(item => ({
      id: item.id,
      name: item.item_name,
      quantity: item.quantity,
      size: item.variations?.size,
      ice: item.variations?.ice,
      sugar: item.variations?.sugar,
      price: parseFloat(item.item_total)
    })) || []
  };
}
