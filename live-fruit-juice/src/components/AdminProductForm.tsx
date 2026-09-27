"use client";

import { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface AdminProductFormProps {
  product?: Product | null;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AdminProductForm({
  product,
  onSubmit,
  onCancel,
  isSubmitting,
}: AdminProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [icon, setIcon] = useState(product?.icon || "");
  const [description, setDescription] = useState(product?.description || "");
  const [priceS, setPriceS] = useState(product?.price_s?.toString() || "");
  const [priceM, setPriceM] = useState(product?.price_m?.toString() || "");
  const [priceL, setPriceL] = useState(product?.price_l?.toString() || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      icon,
      description,
      price_s: parseFloat(priceS),
      price_m: parseFloat(priceM),
      price_l: parseFloat(priceL),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Strawberry Blast"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon / Emoji
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="🍓"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-2xl text-center focus:border-mint focus:outline-none"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your juice..."
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Small (S) Price
          </label>
          <input
            type="number"
            step="0.01"
            value={priceS}
            onChange={(e) => setPriceS(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium (M) Price
          </label>
          <input
            type="number"
            step="0.01"
            value={priceM}
            onChange={(e) => setPriceM(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Large (L) Price
          </label>
          <input
            type="number"
            step="0.01"
            value={priceL}
            onChange={(e) => setPriceL(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="md"
          type="button"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : product
            ? "Update Product"
            : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
