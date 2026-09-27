"use client";

import { Order } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDistanceToNow } from "date-fns";

interface OrderListProps {
  orders: Order[];
  onMarkComplete: (orderId: string) => void;
  isUpdating?: boolean;
}

export function OrderList({ orders, onMarkComplete, isUpdating }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-2">📦</div>
        <p>No orders yet. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isCompleted = order.status === "completed";
        const orderDate = new Date(order.created_at);
        const timeAgo = formatDistanceToNow(orderDate, { addSuffix: true });

        return (
          <div
            key={order.id}
            className={`
              rounded-2xl border-2 p-4 shadow-md transition-all duration-200
              ${
                isCompleted
                  ? "border-gray-200 bg-gray-50 opacity-70"
                  : "border-mint/30 bg-white hover:shadow-lg"
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant={isCompleted ? "completed" : "pending"}>
                    {isCompleted ? "✓ Completed" : "⧖ Pending"}
                  </Badge>
                  <span className="text-sm text-gray-500">{timeAgo}</span>
                  {order.customer_name && (
                    <span className="text-sm font-medium text-gray-600">
                      👤 {order.customer_name}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.product_icon}</span>
                        <div>
                          <span className="font-medium">{item.product_name}</span>
                          <span className="mx-2 text-gray-400">·</span>
                          <span className="text-sm text-gray-600">
                            Size {item.size} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-orange">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {order.note && (
                  <div className="mb-3 rounded-xl bg-mint/5 p-3">
                    <span className="text-sm font-medium text-gray-600">Note:</span>{" "}
                    <span className="text-sm text-gray-700">{order.note}</span>
                  </div>
                )}
              </div>

              <div className="ml-4 flex flex-col gap-2">
                {!isCompleted && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onMarkComplete(order.id)}
                    disabled={isUpdating}
                    className="whitespace-nowrap"
                  >
                    Mark Complete ✓
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
