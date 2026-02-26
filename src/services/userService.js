import { supabase } from '../lib/supabase';

/**
 * Normalize phone to digits only. Taiwan mobile: 10 digits (09xxxxxxxx).
 * If 9 digits, prepend 0.
 */
export function normalizePhone(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length === 9 && digits.startsWith('9')) {
    return '0' + digits;
  }
  return digits;
}

/**
 * Get or create a user by phone. Returns user id.
 * On unique conflict (race), retries select and returns id.
 */
export async function getOrCreateUserByPhone(phone) {
  const normalized = normalizePhone(phone);
  if (!normalized || normalized.length !== 10) {
    throw new Error('Invalid phone: must be 10 digits (e.g. 09xxxxxxxx)');
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('phone', normalized)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: created, error: insertError } = await supabase
    .from('users')
    .insert({ phone: normalized })
    .select('id')
    .single();

  if (!insertError) return created.id;

  if (insertError.code === '23505') {
    const { data: retry } = await supabase
      .from('users')
      .select('id')
      .eq('phone', normalized)
      .maybeSingle();
    if (retry) return retry.id;
  }

  throw new Error(insertError.message || 'Failed to get or create user');
}
