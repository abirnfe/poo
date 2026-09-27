import { kv } from "@/lib/kv";
import { seedProducts } from "@/lib/seed";
import { Product } from "@/lib/types";
import { randomUUID } from "crypto";

const PRODUCTS_KEY = "products:all";

const memoryProducts: Product[] = [];

function initSeed(): Product[] {
  const now = new Date().toISOString();
  return seedProducts.map((p) => ({
    ...p,
    id: randomUUID(),
    created_at: now,
    updated_at: now,
  }));
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const stored = await kv.get<string>(PRODUCTS_KEY);
    if (stored) {
      const products = JSON.parse(stored) as Product[];
      memoryProducts.length = 0;
      memoryProducts.push(...products);
      return products;
    }

    const products = initSeed();
    await kv.set(PRODUCTS_KEY, JSON.stringify(products));
    memoryProducts.length = 0;
    memoryProducts.push(...products);
    return products;
  } catch {
    if (memoryProducts.length === 0) {
      memoryProducts.push(...initSeed());
    }
    return [...memoryProducts];
  }
}

export async function createProduct(
  product: Omit<Product, "id" | "created_at" | "updated_at">
): Promise<Product> {
  const products = await getAllProducts();
  const now = new Date().toISOString();
  const newProduct: Product = {
    ...product,
    id: randomUUID(),
    created_at: now,
    updated_at: now,
  };

  products.unshift(newProduct);

  try {
    await kv.set(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    memoryProducts.length = 0;
    memoryProducts.push(...products);
  }

  return newProduct;
}

export async function updateProduct(
  id: string,
  product: Partial<Omit<Product, "id" | "created_at" | "updated_at">>
): Promise<Product | null> {
  const products = await getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...product,
    updated_at: new Date().toISOString(),
  };

  try {
    await kv.set(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    memoryProducts.length = 0;
    memoryProducts.push(...products);
  }

  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;

  try {
    await kv.set(PRODUCTS_KEY, JSON.stringify(filtered));
  } catch {
    memoryProducts.length = 0;
    memoryProducts.push(...filtered);
  }

  return true;
}
