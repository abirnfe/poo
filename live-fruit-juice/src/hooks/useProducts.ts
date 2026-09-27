"use client";

import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const { data } = await res.json();
        if (data) setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchProducts();

    const interval = setInterval(fetchProducts, 3000);

    return () => clearInterval(interval);
  }, []);

  return { products, loading };
}
