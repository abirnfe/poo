"use client";

import { useOrders } from "@/hooks/useOrders";
import { OrderList } from "@/components/OrderList";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function AdminOrdersPage() {
  const { orders, loading, setOrders } = useOrders();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const { ToastContainer, showToast } = useToast();

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const completedOrders = orders.filter((o) => o.status === "completed");

  const handleMarkComplete = async (orderId: string) => {
    setUpdatingOrderId(orderId);

    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...data } : o))
      );
      showToast("Order marked as complete");
    } else {
      showToast("Failed to update order");
    }
    setUpdatingOrderId(null);
  };

  return (
    <div>
      {ToastContainer}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <div className="flex gap-2">
          <span className="rounded-full bg-mango px-3 py-1 text-sm font-bold text-black">
            {pendingOrders.length} Pending
          </span>
          <span className="rounded-full bg-mint px-3 py-1 text-sm font-bold text-white">
            {completedOrders.length} Completed
          </span>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (
        <>
          {pendingOrders.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Pending Orders ({pendingOrders.length})
              </h2>
              <OrderList
                orders={pendingOrders}
                onMarkComplete={handleMarkComplete}
                isUpdating={updatingOrderId !== null}
              />
            </div>
          )}

          {completedOrders.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Completed Orders ({completedOrders.length})
              </h2>
              <OrderList
                orders={completedOrders}
                onMarkComplete={handleMarkComplete}
                isUpdating={updatingOrderId !== null}
              />
            </div>
          )}

          {pendingOrders.length === 0 && completedOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <span className="text-4xl mb-2 block">📦</span>
              <p>No orders yet. Orders will appear here in real-time!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
