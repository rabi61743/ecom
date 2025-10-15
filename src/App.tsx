import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/layout/Header";
import ProductDetail from "./components/product/ProductDetail";
import Checkout from "./components/checkout/Checkout";
import OrderConfirmation from "./components/checkout/OrderConfirmation";
import UserAccount from "./components/account/UserAccount";
import ShoppingCart from "./components/cart/ShoppingCart";
import AuthModal from "./components/auth/AuthModal";
import routes from "tempo-routes";
import { useApp } from "./contexts/AppContext";

function App() {
  const { addToCart, addToWishlist } = useApp();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                />
              } 
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/account" element={<UserAccount />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
      
      {/* Global Components */}
      <ShoppingCart />
      <AuthModal />
    </div>
  );
}

export default App;