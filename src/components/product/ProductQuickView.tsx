import { useState } from "react";
import { X, Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "./ProductCard";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onWishlist?: (product: Product) => void;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart = () => {},
  onWishlist = () => {}
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock additional images for demo
  const productImages = [
    product.image,
    product.image.replace('?w=400', '?w=400&sat=-100'), // B&W version
    product.image.replace('?w=400', '?w=400&hue=180'), // Color shifted
  ];

  const features = [
    "Premium quality materials",
    "Fast shipping available", 
    "30-day return policy",
    "Secure payment options"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Quick View</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image thumbnails */}
            <div className="flex gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category and badges */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.isNew && <Badge className="bg-green-500">New</Badge>}
              {discountPercentage > 0 && (
                <Badge variant="destructive">-{discountPercentage}%</Badge>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => onAddToCart(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onWishlist(product)}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping and Security */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Secure payment & 30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}