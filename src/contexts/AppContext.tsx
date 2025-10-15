import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/components/product/ProductCard";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        ...product,
        quantity,
        inStock: true
      }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, {
        ...product,
        dateAdded: new Date().toISOString(),
        inStock: true
      }];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (id: string) => {
    const item = wishlistItems.find(w => w.id === id);
    if (item) {
      addToCart(item, 1);
      removeFromWishlist(id);
    }
  };

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