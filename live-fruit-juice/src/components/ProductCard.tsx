"use client";

import { CartItem, Product, JuiceSize } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

const sizeLabels: Record<JuiceSize, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<JuiceSize>("M");
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const sizePrice = {
    S: product.price_s,
    M: product.price_m,
    L: product.price_l,
  };

  const price = sizePrice[selectedSize];
  const totalPrice = price * quantity;

  const handleSizeSelect = (size: JuiceSize) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      productIcon: product.icon,
      size: selectedSize,
      price,
      quantity,
    });
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4 flex justify-center">
        <div
          className={`relative flex h-24 w-24 items-center justify-center rounded-full text-5xl transition-all duration-300 ${
            isHovered ? "scale-110 rotate-3" : "scale-100"
          }`}
          style={{
            background: `radial-gradient(circle, transparent 30%, rgba(46,196,182,0.1) 30%)`,
          }}
        >
          {product.icon}
        </div>
      </div>

      <h3 className="mb-1 text-center text-xl font-bold text-gray-800">
        {product.name}
      </h3>
      {product.description && (
        <p className="mb-4 text-center text-sm text-gray-500">
          {product.description}
        </p>
      )}

      <div className="mb-4 flex justify-center gap-2">
        {(["S", "M", "L"] as JuiceSize[]).map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`
              relative flex h-10 w-10 flex-col items-center justify-center rounded-full font-bold text-sm
              transition-all duration-200
              ${
                selectedSize === size
                  ? "scale-110 bg-gradient-to-r from-orange to-strawberry text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-mint/20 hover:text-mint"
              }
            `}
          >
            {size}
            <span className="text-xs opacity-70">{sizeLabels[size]}</span>
          </button>
        ))}
      </div>

      <div className="mb-4 text-center">
        <span className="text-2xl font-bold text-orange">
          ${totalPrice.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">
          {" "}
          (${price.toFixed(2)}/ea)
        </span>
      </div>

      <div className="mb-3 flex items-center justify-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          −
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          +
        </button>
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={handleAddToCart}
      >
        Add to Cart 🛒
      </Button>
    </div>
  );
}
