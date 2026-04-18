-- Supabase Schema for Soniya Patange Bridal Makeup Artist & Academy
-- Run this in your Supabase SQL Editor

-- 1. Create Tables

-- Portfolio Table
CREATE TABLE public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Maharashtrian', 'South Indian', 'Engagement', 'Party')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Services Table
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT,
  category TEXT NOT NULL CHECK (category IN ('Bridal', 'Engagement', 'Party', 'Hairstyling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Bookings Table (Bridal Enquiries)
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('Bridal', 'Engagement', 'Party', 'Other')),
  location TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Confirmed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Course Enquiries Table
CREATE TABLE public.course_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  course_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Settings Table (Single row)
CREATE TABLE public.settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT DEFAULT 'Soniya Patange',
  whatsapp_number TEXT DEFAULT '+918624051090',
  instagram_link TEXT DEFAULT 'https://www.instagram.com/makeup_by_soniyapatange/',
  contact_email TEXT DEFAULT 'sam@gmail.com',
  location TEXT DEFAULT 'Sangli, Maharashtra',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);


-- 2. Setup Row Level Security (RLS)

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Portfolio Policies (Public can read, Admin can manage)
CREATE POLICY "Public can view portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Admin can insert portfolio" ON public.portfolio FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update portfolio" ON public.portfolio FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete portfolio" ON public.portfolio FOR DELETE USING (auth.role() = 'authenticated');

-- Services Policies
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin can insert services" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update services" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete services" ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials Policies
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update testimonials" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete testimonials" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Bookings Policies (Public can insert, Admin can read & update)
CREATE POLICY "Public can insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all bookings" ON public.bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can update bookings" ON public.bookings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete bookings" ON public.bookings FOR DELETE USING (auth.role() = 'authenticated');

-- Course Enquiries Policies (Public can insert, Admin can read & manage)
CREATE POLICY "Public can insert course enquiries" ON public.course_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all course enquiries" ON public.course_enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete course enquiries" ON public.course_enquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Settings Policies (Public can read, Admin can update)
CREATE POLICY "Public can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admin can update settings" ON public.settings FOR UPDATE USING (auth.role() = 'authenticated');


-- 3. Initial Default Data
INSERT INTO public.settings (business_name) VALUES ('Soniya Patange');

-- 4. Supabase Storage Setup (Run these manually in SQL Editor or Storage Dashboard)
-- Create bucket "portfolio" and set to public
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
CREATE POLICY "Public can view portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admin can insert portfolio images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update portfolio images" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete portfolio images" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
