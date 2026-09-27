"use client";

import { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClear: () => void;
  onSubmitOrder: (note: string, customerName: string) => Promise<{ success: boolean; orderId?: string }>;
}

export function Cart({ items, onClose, onRemoveItem, onClear, onSubmitOrder }: CartProps) {
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const result = await onSubmitOrder(note, customerName);
    setIsSubmitting(false);
    if (result.success) {
      setConfirmedOrderId(result.orderId || null);
      setShowConfirmation(true);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    onClear();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          className="relative mx-4 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-orange mb-4">Your Juice Cart</h2>

          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty 🍎</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${index}`}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                  >
                    <span className="text-2xl">{item.productIcon}</span>
                    <div className="flex-1">
                      <span className="font-bold">{item.productName}</span>
                      <div className="text-sm text-gray-600">
                        Size: <span className="font-semibold">{item.size}</span> × {item.quantity}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-orange">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions / Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. less sugar, no ice..."
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-mint focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onClear}
            >
              Clear Cart
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSubmitOrder}
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? "Placing..." : "Place Order 🧃"}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        title="Order Confirmed!"
        size="sm"
      >
        <div className="text-center">
          <div className="mb-4 text-6xl">✅</div>
          <p className="mb-2 text-lg">Thank you for your order!</p>
          {confirmedOrderId && (
            <p className="text-sm text-gray-600">
              Order ID: <span className="font-bold">{confirmedOrderId}</span>
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500">
            Your fresh juice is being prepared right now!
          </p>
          <Button
            variant="primary"
            size="md"
            className="mt-4 w-full"
            onClick={handleCloseConfirmation}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}
