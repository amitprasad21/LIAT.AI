-- ====================================================================
-- DUBAI MALL INTERACTIVE SALES DECK - DATABASE SCHEMA
-- Execute this SQL code in your Supabase SQL Editor
-- ====================================================================

-- 1. Table: leasing_inquiries (Leasing Tab Form submissions)
CREATE TABLE IF NOT EXISTS leasing_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    preferred_zone VARCHAR(255) NOT NULL,
    sqft_requirement VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS for leasing_inquiries
ALTER TABLE leasing_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous public insertions to leasing_inquiries
CREATE POLICY "Allow public insert to leasing_inquiries" 
ON leasing_inquiries 
FOR INSERT 
TO public 
WITH CHECK (true);


-- 2. Table: contact_submissions (Sticky bottom bar & Contact forms)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    intent VARCHAR(100) NOT NULL, -- 'lease', 'sponsor', or 'venue'
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous public insertions to contact_submissions
CREATE POLICY "Allow public insert to contact_submissions" 
ON contact_submissions 
FOR INSERT 
TO public 
WITH CHECK (true);


-- 3. Table: venue_enquiries (Venue reservations)
CREATE TABLE IF NOT EXISTS venue_enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    venue_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    expected_attendance INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS for venue_enquiries
ALTER TABLE venue_enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous public insertions to venue_enquiries
CREATE POLICY "Allow public insert to venue_enquiries" 
ON venue_enquiries 
FOR INSERT 
TO public 
WITH CHECK (true);


-- 4. Table: sponsorship_enquiries (Sponsorship packages booking)
CREATE TABLE IF NOT EXISTS sponsorship_enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package_tier VARCHAR(100) NOT NULL, -- 'Platinum', 'Gold', 'Silver', 'Event'
    brand_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable RLS for sponsorship_enquiries
ALTER TABLE sponsorship_enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous public insertions to sponsorship_enquiries
CREATE POLICY "Allow public insert to sponsorship_enquiries" 
ON sponsorship_enquiries 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Indexes for performance optimizations
CREATE INDEX IF NOT EXISTS idx_leasing_created_at ON leasing_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_venue_created_at ON venue_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sponsorship_created_at ON sponsorship_enquiries(created_at DESC);
