"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/types";
import { AdminProductForm } from "@/components/AdminProductForm";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";

export default function AdminProductsPage() {
  const { products, loading } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { ToastContainer, showToast } = useToast();

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
    setSubmitError("");
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
    setSubmitError("");
  };

  const handleDelete = async (product: Product) => {
    if (
      !confirm(
        `Are you sure you want to delete "${product.name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    const response = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      showToast("Product deleted successfully");
    } else {
      showToast("Failed to delete product");
    }
  };

  const handleSubmit = async (data: Partial<Product>) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      let response: Response;

      if (editingProduct) {
        response = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Something went wrong");
      }

      showToast(
        editingProduct
          ? "Product updated successfully"
          : "Product added successfully"
      );
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setSubmitError("");
  };

  return (
    <div>
      {ToastContainer}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Button variant="primary" size="md" onClick={handleAddNew}>
          + Add Product
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8 rounded-2xl bg-gray-50 p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-orange">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <AdminProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
          {submitError && (
            <p className="mt-2 text-sm text-red-500">{submitError}</p>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <span className="text-4xl mb-2 block">🍓</span>
          <p>No products yet. Add your first juice product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                {product.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  S ${product.price_s} · M ${product.price_m} · L ${product.price_l}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
