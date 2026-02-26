-- Migration: Add public.users table and point orders.user_id to it
-- Run this in Supabase SQL Editor after the initial schema (brands, stores, orders, etc.) exists.

-- 1. Create public.users table (phone-based accounts)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Point orders.user_id to public.users instead of auth.users
ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

ALTER TABLE public.orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;

-- 3. Optional: point order_status_history.created_by to public.users
ALTER TABLE public.order_status_history
  DROP CONSTRAINT IF EXISTS order_status_history_created_by_fkey;

ALTER TABLE public.order_status_history
  ADD CONSTRAINT order_status_history_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;

-- 4. RLS for users: anon can SELECT (look up by phone) and INSERT (create new user)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users table anon select" ON public.users;
CREATE POLICY "Users table anon select" ON public.users
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Users table anon insert" ON public.users;
CREATE POLICY "Users table anon insert" ON public.users
  FOR INSERT TO anon WITH CHECK (true);

-- 5. Orders: allow anon to INSERT and SELECT (app creates orders and reads by user_id)
-- If RLS was previously disabled, enable it and add policies:
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

CREATE POLICY "Orders anon select" ON public.orders
  FOR SELECT TO anon USING (true);

CREATE POLICY "Orders anon insert" ON public.orders
  FOR INSERT TO anon WITH CHECK (true);
