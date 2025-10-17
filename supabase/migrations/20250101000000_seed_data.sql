-- Categories seed data
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('11111111-1111-1111-1111-111111111111'::uuid, 'Electronics', 'electronics', 'Latest electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', NULL, 1, true),
('22222222-2222-2222-2222-222222222222'::uuid, 'Clothing', 'clothing', 'Fashion and apparel for everyone', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80', NULL, 2, true),
('33333333-3333-3333-3333-333333333333'::uuid, 'Home & Garden', 'home-garden', 'Everything for your home', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80', NULL, 3, true),
('44444444-4444-4444-4444-444444444444'::uuid, 'Sports', 'sports', 'Sports equipment and gear', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', NULL, 4, true),
('55555555-5555-5555-5555-555555555555'::uuid, 'Books', 'books', 'Books and reading materials', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80', NULL, 5, true);

-- Brands seed data
INSERT INTO public.brands (id, name, slug, logo_url, description, is_active) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'TechPro', 'techpro', 'https://api.dicebear.com/7.x/initials/svg?seed=TP', 'Premium technology brand', true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'StyleWear', 'stylewear', 'https://api.dicebear.com/7.x/initials/svg?seed=SW', 'Modern fashion brand', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid, 'HomeComfort', 'homecomfort', 'https://api.dicebear.com/7.x/initials/svg?seed=HC', 'Quality home products', true),
('dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid, 'ActiveLife', 'activelife', 'https://api.dicebear.com/7.x/initials/svg?seed=AL', 'Sports and fitness gear', true),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'::uuid, 'ReadMore', 'readmore', 'https://api.dicebear.com/7.x/initials/svg?seed=RM', 'Quality books publisher', true);

-- Products seed data
INSERT INTO public.products (id, name, slug, description, category_id, brand_id, price, original_price, sku, stock_quantity, is_active, is_featured, is_new, rating_average, review_count) VALUES
('10000000-0000-0000-0000-000000000001'::uuid, 'Wireless Headphones Pro', 'wireless-headphones-pro', 'Premium noise-cancelling wireless headphones with 30-hour battery life', '11111111-1111-1111-1111-111111111111'::uuid, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 199.99, 249.99, 'WHP-001', 50, true, true, true, 4.5, 128),
('10000000-0000-0000-0000-000000000002'::uuid, 'Smart Watch Ultra', 'smart-watch-ultra', 'Advanced fitness tracking with heart rate monitor and GPS', '11111111-1111-1111-1111-111111111111'::uuid, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 399.99, 499.99, 'SWU-001', 30, true, true, true, 4.7, 256),
('10000000-0000-0000-0000-000000000003'::uuid, 'Classic Denim Jacket', 'classic-denim-jacket', 'Timeless denim jacket with modern fit', '22222222-2222-2222-2222-222222222222'::uuid, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 79.99, 99.99, 'CDJ-001', 100, true, false, false, 4.3, 89),
('10000000-0000-0000-0000-000000000004'::uuid, 'Running Shoes Elite', 'running-shoes-elite', 'Professional running shoes with advanced cushioning', '44444444-4444-4444-4444-444444444444'::uuid, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid, 129.99, 159.99, 'RSE-001', 75, true, true, false, 4.6, 342),
('10000000-0000-0000-0000-000000000005'::uuid, 'Coffee Maker Deluxe', 'coffee-maker-deluxe', 'Programmable coffee maker with thermal carafe', '33333333-3333-3333-3333-333333333333'::uuid, 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid, 89.99, 119.99, 'CMD-001', 40, true, false, true, 4.4, 167),
('10000000-0000-0000-0000-000000000006'::uuid, 'Yoga Mat Premium', 'yoga-mat-premium', 'Extra thick non-slip yoga mat with carrying strap', '44444444-4444-4444-4444-444444444444'::uuid, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid, 39.99, 49.99, 'YMP-001', 150, true, false, false, 4.8, 423),
('10000000-0000-0000-0000-000000000007'::uuid, 'Mystery Novel Collection', 'mystery-novel-collection', 'Bestselling mystery novels bundle (5 books)', '55555555-5555-5555-5555-555555555555'::uuid, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'::uuid, 49.99, 74.99, 'MNC-001', 60, true, false, true, 4.2, 94),
('10000000-0000-0000-0000-000000000008'::uuid, 'Laptop Stand Aluminum', 'laptop-stand-aluminum', 'Ergonomic adjustable laptop stand', '11111111-1111-1111-1111-111111111111'::uuid, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 59.99, 79.99, 'LSA-001', 80, true, false, false, 4.5, 201);

-- Product images seed data
INSERT INTO public.product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
('10000000-0000-0000-0000-000000000001'::uuid, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'Wireless Headphones Pro - Front View', 0, true),
('10000000-0000-0000-0000-000000000001'::uuid, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80', 'Wireless Headphones Pro - Side View', 1, false),
('10000000-0000-0000-0000-000000000002'::uuid, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 'Smart Watch Ultra - Main', 0, true),
('10000000-0000-0000-0000-000000000002'::uuid, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80', 'Smart Watch Ultra - Display', 1, false),
('10000000-0000-0000-0000-000000000003'::uuid, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'Classic Denim Jacket', 0, true),
('10000000-0000-0000-0000-000000000004'::uuid, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'Running Shoes Elite', 0, true),
('10000000-0000-0000-0000-000000000005'::uuid, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80', 'Coffee Maker Deluxe', 0, true),
('10000000-0000-0000-0000-000000000006'::uuid, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80', 'Yoga Mat Premium', 0, true),
('10000000-0000-0000-0000-000000000007'::uuid, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80', 'Mystery Novel Collection', 0, true),
('10000000-0000-0000-0000-000000000008'::uuid, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', 'Laptop Stand Aluminum', 0, true);

-- Product variants seed data
INSERT INTO public.product_variants (product_id, sku, name, price_modifier, stock_quantity, attributes) VALUES
('10000000-0000-0000-0000-000000000003'::uuid, 'CDJ-001-S', 'Small', 0, 25, '{"size": "S"}'),
('10000000-0000-0000-0000-000000000003'::uuid, 'CDJ-001-M', 'Medium', 0, 40, '{"size": "M"}'),
('10000000-0000-0000-0000-000000000003'::uuid, 'CDJ-001-L', 'Large', 0, 25, '{"size": "L"}'),
('10000000-0000-0000-0000-000000000003'::uuid, 'CDJ-001-XL', 'X-Large', 0, 10, '{"size": "XL"}'),
('10000000-0000-0000-0000-000000000004'::uuid, 'RSE-001-8', 'Size 8', 0, 15, '{"size": "8"}'),
('10000000-0000-0000-0000-000000000004'::uuid, 'RSE-001-9', 'Size 9', 0, 20, '{"size": "9"}'),
('10000000-0000-0000-0000-000000000004'::uuid, 'RSE-001-10', 'Size 10', 0, 25, '{"size": "10"}'),
('10000000-0000-0000-0000-000000000004'::uuid, 'RSE-001-11', 'Size 11', 0, 15, '{"size": "11"}');

-- Promo codes seed data
INSERT INTO public.promo_codes (code, description, discount_type, discount_value, min_purchase_amount, max_discount_amount, usage_limit, valid_from, valid_until, is_active) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10, 50, 50, 1000, NOW(), NOW() + INTERVAL '30 days', true),
('SAVE20', 'Save 20% on orders over $100', 'percentage', 20, 100, 100, 500, NOW(), NOW() + INTERVAL '60 days', true),
('FREESHIP', 'Free shipping on all orders', 'fixed', 10, 0, 10, NULL, NOW(), NOW() + INTERVAL '90 days', true),
('SUMMER25', 'Summer sale - 25% off', 'percentage', 25, 75, 150, 200, NOW(), NOW() + INTERVAL '45 days', true);

-- Newsletter subscribers seed data
INSERT INTO public.newsletter_subscribers (email, status) VALUES
('subscriber1@example.com', 'active'),
('subscriber2@example.com', 'active'),
('subscriber3@example.com', 'active'),
('subscriber4@example.com', 'unsubscribed');

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE cart_items;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE product_views;