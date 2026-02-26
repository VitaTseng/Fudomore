import { supabase } from '../lib/supabase';
import { getOrCreateUserByPhone } from './userService';

export const createOrder = async ({ storeId, items, orderData, phone }) => {
  try {
    if (!phone || typeof phone !== 'string') {
      throw new Error('Phone number is required');
    }
    const userId = await getOrCreateUserByPhone(phone);

    const subtotal = items.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );
    const serviceFee = 5;
    const total = subtotal + serviceFee;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        store_id: storeId,
        subtotal,
        service_fee: serviceFee,
        total_amount: total,
        pickup_method: orderData.deliveryMethod || 'self-pickup',
        pickup_time_start: orderData.pickupTime?.start,
        pickup_time_end: orderData.pickupTime?.end,
        payment_method: orderData.paymentMethod,
        invoice_type: orderData.invoiceType,
        invoice_number: orderData.invoiceCarrier,
        customer_note: orderData.note,
        estimated_ready_at: new Date(Date.now() + 15 * 60 * 1000),
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.id,
      item_name: item.name,
      item_image_url: item.image,
      base_price: item.price,
      quantity: item.quantity,
      variations: item.customizations || {},
      variation_display: item.customizations || {},
      variation_price: 0,
      item_total: item.price * item.quantity,
      special_instructions: item.note
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, order: data };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
};
