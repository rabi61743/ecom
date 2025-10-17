
-- Additional Categories with subcategories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('66666666-6666-6666-6666-666666666666'::uuid, 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80', NULL, 6, true),
('77777777-7777-7777-7777-777777777777'::uuid, 'Beauty & Health', 'beauty-health', 'Beauty products and health essentials', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', NULL, 7, true),
('88888888-8888-8888-8888-888888888888'::uuid, 'Toys & Games', 'toys-games', 'Fun for all ages', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80', NULL, 8, true),
('99999999-9999-9999-9999-999999999999'::uuid, 'Automotive', 'automotive', 'Car accessories and parts', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', NULL, 9, true),
('aaaaaaaa-1111-1111-1111-111111111111'::uuid, 'Pet Supplies', 'pet-supplies', 'Everything for your pets', 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80', NULL, 10, true);

-- Electronics Subcategories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('11111111-1111-1111-1111-111111111112'::uuid, 'Smartphones', 'smartphones', 'Latest mobile phones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', '11111111-1111-1111-1111-111111111111'::uuid, 1, true),
('11111111-1111-1111-1111-111111111113'::uuid, 'Laptops', 'laptops', 'Computers and notebooks', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', '11111111-1111-1111-1111-111111111111'::uuid, 2, true),
('11111111-1111-1111-1111-111111111114'::uuid, 'Audio', 'audio', 'Headphones and speakers', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', '11111111-1111-1111-1111-111111111111'::uuid, 3, true),
('11111111-1111-1111-1111-111111111115'::uuid, 'Cameras', 'cameras', 'Photography equipment', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', '11111111-1111-1111-1111-111111111111'::uuid, 4, true);

-- Fashion Subcategories
INSERT INTO public.categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('66666666-6666-6666-6666-666666666667'::uuid, 'Men''s Fashion', 'mens-fashion', 'Clothing for men', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80', '66666666-6666-6666-6666-666666666666'::uuid, 1, true),
('66666666-6666-6666-6666-666666666668'::uuid, 'Women''s Fashion', 'womens-fashion', 'Clothing for women', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', '66666666-6666-6666-6666-666666666666'::uuid, 2, true),
('66666666-6666-6666-6666-666666666669'::uuid, 'Accessories', 'accessories', 'Bags, watches, jewelry', 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80', '66666666-6666-6666-6666-666666666666'::uuid, 3, true);

-- Real Brand Names
INSERT INTO public.brands (id, name, slug, logo_url, description, is_active) VALUES
('b0000000-0000-0000-0000-000000000001'::uuid, 'Apple', 'apple', 'https://api.dicebear.com/7.x/initials/svg?seed=Apple', 'Think Different', true),
('b0000000-0000-0000-0000-000000000002'::uuid, 'Samsung', 'samsung', 'https://api.dicebear.com/7.x/initials/svg?seed=Samsung', 'Inspire the World', true),
('b0000000-0000-0000-0000-000000000003'::uuid, 'Sony', 'sony', 'https://api.dicebear.com/7.x/initials/svg?seed=Sony', 'Be Moved', true),
('b0000000-0000-0000-0000-000000000004'::uuid, 'Nike', 'nike', 'https://api.dicebear.com/7.x/initials/svg?seed=Nike', 'Just Do It', true),
('b0000000-0000-0000-0000-000000000005'::uuid, 'Adidas', 'adidas', 'https://api.dicebear.com/7.x/initials/svg?seed=Adidas', 'Impossible is Nothing', true),
('b0000000-0000-0000-0000-000000000006'::uuid, 'Puma', 'puma', 'https://api.dicebear.com/7.x/initials/svg?seed=Puma', 'Forever Faster', true),
('b0000000-0000-0000-0000-000000000007'::uuid, 'Under Armour', 'under-armour', 'https://api.dicebear.com/7.x/initials/svg?seed=UA', 'I Will', true),
('b0000000-0000-0000-0000-000000000008'::uuid, 'Dell', 'dell', 'https://api.dicebear.com/7.x/initials/svg?seed=Dell', 'Technology that works', true),
('b0000000-0000-0000-0000-000000000009'::uuid, 'HP', 'hp', 'https://api.dicebear.com/7.x/initials/svg?seed=HP', 'Keep Reinventing', true),
('b0000000-0000-0000-0000-000000000010'::uuid, 'Lenovo', 'lenovo', 'https://api.dicebear.com/7.x/initials/svg?seed=Lenovo', 'Smarter Technology', true),
('b0000000-0000-0000-0000-000000000011'::uuid, 'Canon', 'canon', 'https://api.dicebear.com/7.x/initials/svg?seed=Canon', 'Delighting You Always', true),
('b0000000-0000-0000-0000-000000000012'::uuid, 'Nikon', 'nikon', 'https://api.dicebear.com/7.x/initials/svg?seed=Nikon', 'At the Heart of the Image', true),
('b0000000-0000-0000-0000-000000000013'::uuid, 'Bose', 'bose', 'https://api.dicebear.com/7.x/initials/svg?seed=Bose', 'Better Sound Through Research', true),
('b0000000-0000-0000-0000-000000000014'::uuid, 'JBL', 'jbl', 'https://api.dicebear.com/7.x/initials/svg?seed=JBL', 'Dare to Listen', true),
('b0000000-0000-0000-0000-000000000015'::uuid, 'Zara', 'zara', 'https://api.dicebear.com/7.x/initials/svg?seed=Zara', 'Love Your Curves', true),
('b0000000-0000-0000-0000-000000000016'::uuid, 'H&M', 'hm', 'https://api.dicebear.com/7.x/initials/svg?seed=HM', 'Fashion and Quality', true),
('b0000000-0000-0000-0000-000000000017'::uuid, 'Levi''s', 'levis', 'https://api.dicebear.com/7.x/initials/svg?seed=Levis', 'Quality Never Goes Out of Style', true),
('b0000000-0000-0000-0000-000000000018'::uuid, 'Gap', 'gap', 'https://api.dicebear.com/7.x/initials/svg?seed=Gap', 'Meet Me at the Gap', true),
('b0000000-0000-0000-0000-000000000019'::uuid, 'IKEA', 'ikea', 'https://api.dicebear.com/7.x/initials/svg?seed=IKEA', 'The Wonderful Everyday', true),
('b0000000-0000-0000-0000-000000000020'::uuid, 'KitchenAid', 'kitchenaid', 'https://api.dicebear.com/7.x/initials/svg?seed=KA', 'For the Way It''s Made', true);
