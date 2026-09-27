"use client";

import { Order } from "@/lib/types";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const markComplete = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      if (res.ok) {
        const { data } = await res.json();
        if (data) {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, ...data } : o))
          );
        }
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const { data } = await res.json();
        if (data) setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
      setLoading(false);
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);

    return () => clearInterval(interval);
  }, []);

  return { orders, loading, markComplete };
}
