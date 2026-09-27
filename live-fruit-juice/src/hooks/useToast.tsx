"use client";

import { useState, useCallback } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const ToastContainer = (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            rounded-xl px-4 py-2 text-sm font-medium text-white shadow-lg
            animate-in slide-in-from-bottom-2
            ${
              toast.type === "success"
                ? "bg-mint"
                : toast.type === "error"
                ? "bg-strawberry"
                : "bg-orange"
            }
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );

  return { ToastContainer, showToast };
}
