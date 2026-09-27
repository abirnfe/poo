"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useProducts } from "@/hooks/useProducts";
import { CartItem } from "@/lib/types";

export default function CustomerHomePage() {
  const { products, loading } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, { ...item }];
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setCartItems([]);
  };

  const handleSubmitOrder = async (note: string, customerName: string) => {
    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.productId,
        product_name: item.productName,
        product_icon: item.productIcon,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
      })),
      note: note || null,
      customer_name: customerName || null,
      status: "pending" as const,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (response.ok && result.data) {
      return { success: true, orderId: result.data.id };
    }
    return { success: false };
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-extrabold bg-gradient-to-r from-orange to-strawberry bg-clip-text text-transparent sm:text-4xl">
            Fresh Fruit Juices
          </h1>
          <p className="text-gray-600">
            Hand-crafted with 100% natural ingredients. Choose your size and
            enjoy!
          </p>
        </section>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-xl text-gray-500">Loading fresh juices... 🍓</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products available right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveItem}
          onClear={handleClear}
          onSubmitOrder={handleSubmitOrder}
        />
      )}
    </>
  );
}
