-- ================================================================
-- MIGRATION: Dynamic Admin System for Soniya Patange Website
-- ================================================================
-- Run this ENTIRE script in your Supabase SQL Editor.
-- It is SAFE to run — it does NOT modify or drop existing tables.
-- ================================================================


-- ================================================================
-- PART 1: NEW TABLE — pricing_categories
-- ================================================================
-- Stores makeup category types (HD Makeup, Luxury/Airbrush, etc.)
-- Each category has a name, tagline, popularity flag, and brand list.

CREATE TABLE IF NOT EXISTS public.pricing_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  is_popular BOOLEAN DEFAULT false,
  products JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

-- Add comment for documentation
COMMENT ON TABLE public.pricing_categories IS 'Bridal makeup pricing categories (HD, Airbrush, etc.)';
COMMENT ON COLUMN public.pricing_categories.products IS 'JSON array of brand names, e.g. ["NARS", "MAC"]';
COMMENT ON COLUMN public.pricing_categories.sort_order IS 'Display order on frontend (lower = first)';


-- ================================================================
-- PART 2: NEW TABLE — pricing_items
-- ================================================================
-- Stores individual pricing entries linked to a category.
-- Also supports standalone "Sider" items (no category needed).

CREATE TABLE IF NOT EXISTS public.pricing_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.pricing_categories(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  price TEXT NOT NULL,
  price_value INTEGER DEFAULT 0,
  is_sider BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

-- category_id is NULLABLE — Sider items have no parent category
COMMENT ON TABLE public.pricing_items IS 'Individual pricing entries (Bridal ₹15,000, etc.)';
COMMENT ON COLUMN public.pricing_items.category_id IS 'NULL for sider makeup items; references pricing_categories for HD/Airbrush';
COMMENT ON COLUMN public.pricing_items.price IS 'Formatted price string, e.g. ₹15,000';
COMMENT ON COLUMN public.pricing_items.price_value IS 'Numeric price value for sorting (e.g. 15000)';
COMMENT ON COLUMN public.pricing_items.is_sider IS 'True for sider makeup items that have no parent category';

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pricing_items_category ON public.pricing_items(category_id);
CREATE INDEX IF NOT EXISTS idx_pricing_items_sider ON public.pricing_items(is_sider) WHERE is_sider = true;


-- ================================================================
-- PART 3: NEW TABLE — courses
-- ================================================================
-- Stores makeup course details with curriculum and benefits as JSON.
-- Designed for multiple courses but currently has one active course.

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  start_date TEXT,
  timing TEXT,
  location TEXT,
  fees TEXT NOT NULL,
  fees_value INTEGER DEFAULT 0,
  curriculum JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

COMMENT ON TABLE public.courses IS 'Makeup academy course details';
COMMENT ON COLUMN public.courses.curriculum IS 'JSON array: [{"title":"...","description":"..."},...]';
COMMENT ON COLUMN public.courses.benefits IS 'JSON array of benefit strings: ["Complimentary products...",...]';
COMMENT ON COLUMN public.courses.is_active IS 'Only active courses are shown on the public website';
COMMENT ON COLUMN public.courses.fees IS 'Formatted fee string, e.g. ₹30,000';
COMMENT ON COLUMN public.courses.fees_value IS 'Numeric fee value for sorting (e.g. 30000)';


-- ================================================================
-- PART 4: ALTER EXISTING TABLE — settings
-- ================================================================
-- Adding new JSONB columns to the existing settings table.
-- Uses IF NOT EXISTS logic via DO block to avoid errors on re-run.

DO $$
BEGIN
  -- pricing_inclusion: text shown below pricing on Services/Packages pages
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'settings' AND column_name = 'pricing_inclusion'
  ) THEN
    ALTER TABLE public.settings ADD COLUMN pricing_inclusion TEXT
      DEFAULT 'Includes Makeup, Hairstyling, Draping, Jewellery & Hair Accessories';
  END IF;

  -- booking_policy: array of policy text items
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'settings' AND column_name = 'booking_policy'
  ) THEN
    ALTER TABLE public.settings ADD COLUMN booking_policy JSONB
      DEFAULT '[
        {"text": "50% advance payment required at the time of booking"},
        {"text": "Advance amount is non-refundable & non-transferable"},
        {"text": "Remaining balance to be paid before the service"},
        {"text": "Travel charges applicable for outstation locations"}
      ]'::jsonb;
  END IF;

  -- contact_persons: array of {name, role, phone} objects
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'settings' AND column_name = 'contact_persons'
  ) THEN
    ALTER TABLE public.settings ADD COLUMN contact_persons JSONB
      DEFAULT '[
        {"name": "Soniya Patange", "role": "Makeup Artist", "phone": "8624051090"},
        {"name": "Mayur Patange", "role": "Booking Manager", "phone": "9923494941"}
      ]'::jsonb;
  END IF;

  -- whatsapp_messages: object with bridal, course, general message templates
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'settings' AND column_name = 'whatsapp_messages'
  ) THEN
    ALTER TABLE public.settings ADD COLUMN whatsapp_messages JSONB
      DEFAULT '{
        "bridal": "Hi, I want to book bridal makeup 💍\nEvent Type:\nDate:\nLocation:\nPlease share availability and details ✨",
        "course": "Hi, I want to join the makeup course 🎓\nName:\nPhone:\nPlease share details and availability ✨",
        "general": "Hi, I want to enquire about your services ✨"
      }'::jsonb;
  END IF;

  -- urgency_labels: object with bridal and course urgency text
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'settings' AND column_name = 'urgency_labels'
  ) THEN
    ALTER TABLE public.settings ADD COLUMN urgency_labels JSONB
      DEFAULT '{
        "bridal": "Limited Dates Available",
        "course": "Limited Seats Available"
      }'::jsonb;
  END IF;
END $$;

-- Update existing settings row to populate new columns with defaults
-- (Only updates if the column values are currently NULL)
UPDATE public.settings
SET
  pricing_inclusion = COALESCE(pricing_inclusion, 'Includes Makeup, Hairstyling, Draping, Jewellery & Hair Accessories'),
  booking_policy = COALESCE(booking_policy, '[
    {"text": "50% advance payment required at the time of booking"},
    {"text": "Advance amount is non-refundable & non-transferable"},
    {"text": "Remaining balance to be paid before the service"},
    {"text": "Travel charges applicable for outstation locations"}
  ]'::jsonb),
  contact_persons = COALESCE(contact_persons, '[
    {"name": "Soniya Patange", "role": "Makeup Artist", "phone": "8624051090"},
    {"name": "Mayur Patange", "role": "Booking Manager", "phone": "9923494941"}
  ]'::jsonb),
  whatsapp_messages = COALESCE(whatsapp_messages, '{
    "bridal": "Hi, I want to book bridal makeup 💍\nEvent Type:\nDate:\nLocation:\nPlease share availability and details ✨",
    "course": "Hi, I want to join the makeup course 🎓\nName:\nPhone:\nPlease share details and availability ✨",
    "general": "Hi, I want to enquire about your services ✨"
  }'::jsonb),
  urgency_labels = COALESCE(urgency_labels, '{
    "bridal": "Limited Dates Available",
    "course": "Limited Seats Available"
  }'::jsonb);


-- ================================================================
-- PART 5: ROW LEVEL SECURITY — New Tables
-- ================================================================

-- pricing_categories RLS
ALTER TABLE public.pricing_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view pricing categories"
  ON public.pricing_categories FOR SELECT USING (true);

CREATE POLICY "Admin can insert pricing categories"
  ON public.pricing_categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update pricing categories"
  ON public.pricing_categories FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete pricing categories"
  ON public.pricing_categories FOR DELETE
  USING (auth.role() = 'authenticated');


-- pricing_items RLS
ALTER TABLE public.pricing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view pricing items"
  ON public.pricing_items FOR SELECT USING (true);

CREATE POLICY "Admin can insert pricing items"
  ON public.pricing_items FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update pricing items"
  ON public.pricing_items FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete pricing items"
  ON public.pricing_items FOR DELETE
  USING (auth.role() = 'authenticated');


-- courses RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view courses"
  ON public.courses FOR SELECT USING (true);

CREATE POLICY "Admin can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update courses"
  ON public.courses FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete courses"
  ON public.courses FOR DELETE
  USING (auth.role() = 'authenticated');


-- ================================================================
-- PART 6: SEED DATA — Initial pricing, course data
-- ================================================================
-- Only inserts if tables are empty (safe for re-runs).

-- Seed pricing categories (only if empty)
INSERT INTO public.pricing_categories (name, tagline, is_popular, products, sort_order)
SELECT * FROM (VALUES
  (
    'HD Makeup',
    'Professional HD finish for a flawless, camera-ready look',
    false,
    '["NARS", "MAC", "HUDA", "Charlotte Tilbury", "Too Faced", "Tarte"]'::jsonb,
    1
  ),
  (
    'Luxury / Airbrush Makeup',
    'Ultra-premium airbrush finish for a luxurious, long-lasting glow',
    true,
    '["Dior", "Charlotte Tilbury", "NARS", "Anastasia Beverly Hills", "Urban Decay"]'::jsonb,
    2
  )
) AS seed(name, tagline, is_popular, products, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.pricing_categories LIMIT 1);


-- Seed HD Makeup pricing items
INSERT INTO public.pricing_items (category_id, event_type, price, price_value, is_sider, sort_order)
SELECT pc.id, v.event_type, v.price, v.price_value, false, v.sort_order
FROM public.pricing_categories pc
CROSS JOIN (VALUES
  ('Bridal',                            '₹15,000', 15000, 1),
  ('Engagement',                        '₹10,000', 10000, 2),
  ('Sangeet / Cocktail / Reception',    '₹10,000', 10000, 3),
  ('Mehendi / Haldi',                   '₹8,000',  8000,  4)
) AS v(event_type, price, price_value, sort_order)
WHERE pc.name = 'HD Makeup'
  AND NOT EXISTS (SELECT 1 FROM public.pricing_items WHERE category_id = pc.id LIMIT 1);


-- Seed Luxury / Airbrush Makeup pricing items
INSERT INTO public.pricing_items (category_id, event_type, price, price_value, is_sider, sort_order)
SELECT pc.id, v.event_type, v.price, v.price_value, false, v.sort_order
FROM public.pricing_categories pc
CROSS JOIN (VALUES
  ('Bridal',                            '₹20,000', 20000, 1),
  ('Engagement',                        '₹18,000', 18000, 2),
  ('Sangeet / Cocktail / Reception',    '₹15,000', 15000, 3),
  ('Mehendi / Haldi',                   '₹12,000', 12000, 4)
) AS v(event_type, price, price_value, sort_order)
WHERE pc.name = 'Luxury / Airbrush Makeup'
  AND NOT EXISTS (SELECT 1 FROM public.pricing_items WHERE category_id = pc.id LIMIT 1);


-- Seed Sider Makeup items (no category)
INSERT INTO public.pricing_items (category_id, event_type, price, price_value, is_sider, sort_order)
SELECT NULL, v.event_type, v.price, v.price_value, true, v.sort_order
FROM (VALUES
  ('Simple Makeup', '₹3,000', 3000, 1),
  ('HD Makeup',     '₹5,000', 5000, 2)
) AS v(event_type, price, price_value, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.pricing_items WHERE is_sider = true LIMIT 1);


-- Seed course (only if empty)
INSERT INTO public.courses (name, duration, start_date, timing, location, fees, fees_value, curriculum, benefits, is_active)
SELECT * FROM (VALUES (
  'Professional Makeup Course',
  '30 Days',
  '15 May 2026',
  '11 AM – 4 PM',
  'Sangli',
  '₹30,000',
  30000,
  '[
    {"title": "Basic to Advanced Makeup", "description": "Master fundamentals through professional-level techniques for all skin types and tones."},
    {"title": "Bridal Hairstyling", "description": "Learn traditional and modern bridal hairstyles including buns, braids, and gajra setting."},
    {"title": "Saree Draping & Pre-pleating", "description": "Expert techniques for Nauvari, Nivi, Bengali, and other regional draping styles."},
    {"title": "Social Media & Photography", "description": "Build your portfolio with professional photography and social media marketing skills."},
    {"title": "Marketing Strategies", "description": "Learn client acquisition, pricing strategy, and brand building for your makeup business."},
    {"title": "Hands-on Practice", "description": "Real model practice sessions to build confidence and refine your technique."},
    {"title": "Certificate Provided", "description": "Receive a professional certification upon successful course completion."}
  ]'::jsonb,
  '["Complimentary products provided during practice sessions", "Real practical training on live models", "Small batch size for personalised attention", "Career guidance and client handling techniques"]'::jsonb,
  true
)) AS seed(name, duration, start_date, timing, location, fees, fees_value, curriculum, benefits, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.courses LIMIT 1);


-- ================================================================
-- PART 7: VERIFICATION QUERIES
-- ================================================================
-- Run these after the script to confirm everything is correct.

-- Check pricing_categories
SELECT id, name, is_popular, sort_order,
       jsonb_array_length(products) AS product_count
FROM public.pricing_categories
ORDER BY sort_order;

-- Check pricing_items with their categories
SELECT
  pi.event_type,
  pi.price,
  pi.price_value,
  pi.is_sider,
  pc.name AS category_name
FROM public.pricing_items pi
LEFT JOIN public.pricing_categories pc ON pi.category_id = pc.id
ORDER BY pi.is_sider, pc.sort_order, pi.sort_order;

-- Check courses
SELECT id, name, duration, start_date, fees,
       jsonb_array_length(curriculum) AS curriculum_items,
       jsonb_array_length(benefits) AS benefit_items,
       is_active
FROM public.courses;

-- Check settings new columns
SELECT
  pricing_inclusion,
  jsonb_array_length(booking_policy) AS policy_count,
  jsonb_array_length(contact_persons) AS contacts_count,
  whatsapp_messages ? 'bridal' AS has_bridal_msg,
  urgency_labels ? 'bridal' AS has_bridal_label
FROM public.settings
LIMIT 1;
