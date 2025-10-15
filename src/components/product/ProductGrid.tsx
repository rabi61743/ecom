import { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";
import { FilterState } from "../search/SearchFilters";
import ProductQuickView from "./ProductQuickView";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

interface ProductGridProps {
  products?: Product[];
  filters: FilterState;
  className?: string;
}

export default function ProductGrid({ 
  products = [], 
  filters,
  className = ""
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addToCart, addToWishlist } = useApp();
  const navigate = useNavigate();

  // Default products for demo
  const defaultProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones with Active Noise Cancellation",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviewCount: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      category: "Electronics",
      isNew: true,
    },
    {
      id: "2",
      name: "Premium Cotton T-Shirt - Comfortable Fit",
      price: 24.99,
      rating: 4.2,
      reviewCount: 856,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      category: "Fashion",
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle - 32oz",
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.7,
      reviewCount: 2103,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
      category: "Sports & Outdoors",
    },
    {
      id: "4",
      name: "Smart Fitness Watch with Heart Rate Monitor",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.4,
      reviewCount: 1876,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      category: "Electronics",
      isNew: true,
    },
    {
      id: "5",
      name: "Organic Skincare Set - Natural Ingredients",
      price: 45.99,
      rating: 4.6,
      reviewCount: 743,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
      category: "Beauty & Personal Care",
    },
    {
      id: "6",
      name: "Ergonomic Office Chair - Lumbar Support",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.3,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
      category: "Home & Garden",
    },
    {
      id: "7",
      name: "Professional Camera Lens - 50mm f/1.8",
      price: 349.99,
      rating: 4.8,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&q=80",
      category: "Electronics",
    },
    {
      id: "8",
      name: "Yoga Mat - Non-Slip Premium Quality",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.5,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      category: "Sports & Outdoors",
    },
    {
      id: "9",
      name: "Bestselling Mystery Novel - Hardcover",
      price: 16.99,
      rating: 4.7,
      reviewCount: 3456,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      category: "Books",
    },
    {
      id: "10",
      name: "Ceramic Coffee Mug Set - 4 Pieces",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.4,
      reviewCount: 678,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&q=80",
      category: "Home & Garden",
    },
    {
      id: "11",
      name: "Wireless Gaming Mouse - RGB Lighting",
      price: 79.99,
      rating: 4.6,
      reviewCount: 1567,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
      category: "Electronics",
      isNew: true,
    },
    {
      id: "12",
      name: "Designer Sunglasses - UV Protection",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.3,
      reviewCount: 445,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
      category: "Fashion",
    }
  ];

  const allProducts = products.length > 0 ? products : defaultProducts;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for "relevance"
        break;
    }

    return filtered;
  }, [allProducts, filters]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleWishlist = (product: Product) => {
    addToWishlist(product);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
            <ProductCard
              product={product}
              onAddToCart={(product) => handleAddToCart(product, 1)}
              onQuickView={handleQuickView}
              onWishlist={handleWishlist}
            />
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onWishlist={handleWishlist}
      />
    </>
  );
}