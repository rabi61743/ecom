import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import { Product } from "@/components/product/ProductCard";
import { useLocalStorage, useRecentlyViewed } from '@/hooks/useLocalStorage';
import { useToast } from './ToastContext';

export interface CartItem extends Product {
  quantity: number;
  inStock: boolean;
}

interface WishlistItem extends Product {
  dateAdded: string;
  inStock: boolean;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  
  // Auth
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  
  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Persistent state using localStorage
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
  const [wishlistItems, setWishlistItems] = useLocalStorage<Product[]>('wishlistItems', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { success, error } = useToast();

  // Add to cart with toast notification
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        success('Updated cart', `${product.name} quantity updated`);
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity,
          category: product.category,
          inStock: true
        };
        success('Added to cart', `${product.name} added to your cart`);
        return [...prev, newItem];
      }
    });
  }, [setCartItems, success]);

  // Update cart quantity
  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [setCartItems]);

  // Remove from cart
  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === productId);
      if (item) {
        success('Removed from cart', `${item.name} removed from your cart`);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [setCartItems, success]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    success('Cart cleared', 'All items removed from your cart');
  }, [setCartItems, success]);

  // Add to wishlist
  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        error('Already in wishlist', `${product.name} is already in your wishlist`);
        return prev;
      }
      success('Added to wishlist', `${product.name} added to your wishlist`);
      return [...prev, product];
    });
  }, [setWishlistItems, success, error]);

  // Remove from wishlist
  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => {
      const item = prev.find(item => item.id === productId);
      if (item) {
        success('Removed from wishlist', `${item.name} removed from your wishlist`);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [setWishlistItems, success]);

  // Move from wishlist to cart
  const moveToCart = useCallback((productId: string) => {
    const wishlistItem = wishlistItems.find(item => item.id === productId);
    if (wishlistItem) {
      addToCart(wishlistItem);
      removeFromWishlist(productId);
    }
  }, [wishlistItems, addToCart, removeFromWishlist]);

  // Bulk cart operations
  const moveAllToWishlist = useCallback(() => {
    cartItems.forEach(item => {
      const product: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        rating: 4.0, // Default rating
        reviewCount: 0,
        image: item.image,
        category: item.category
      };
      addToWishlist(product);
    });
    clearCart();
  }, [cartItems, addToWishlist, clearCart]);

  // Track product views
  const trackProductView = useCallback((productId: string) => {
    addToRecentlyViewed(productId);
  }, [addToRecentlyViewed]);

  // Calculate cart totals
  const cartTotal = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [cartItems]);

  // Auth functions
  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    setUser({
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe"
    });
    setIsAuthModalOpen(false);
  };

  const signup = async (data: any) => {
    // Mock signup - replace with actual API call
    setUser({
      id: "1",
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        user,
        login,
        signup,
        logout,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}