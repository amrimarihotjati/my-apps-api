-- Supabase Schema for Jual Beli Motor Bekas (CMS)
-- Execute this in the Supabase SQL Editor

-- 1. Table for Motorcycles
CREATE TABLE motorcycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price_min BIGINT NOT NULL,
    price_max BIGINT NOT NULL,
    image_url TEXT NOT NULL,
    engine_capacity VARCHAR(50),
    transmission VARCHAR(50),
    mileage VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table for News / Articles
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table for Slideshow / Banners
CREATE TABLE slideshows (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    action_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table for Marketplaces
CREATE TABLE marketplaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    base_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: 
-- You can use Supabase Edge Functions or a small Node.js script to automatically 
-- aggregate this data and generate the `config.json` that will be served via Cloudflare Workers.
