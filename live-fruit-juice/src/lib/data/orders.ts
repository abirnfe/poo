import { kv } from "@/lib/kv";
import { Order, OrderStatus } from "@/lib/types";
import { randomUUID } from "crypto";

const ORDERS_KEY = "orders:all";

const memoryOrders: Order[] = [];

export async function getAllOrders(): Promise<Order[]> {
  try {
    const stored = await kv.get<string>(ORDERS_KEY);
    if (stored) {
      const orders = JSON.parse(stored) as Order[];
      memoryOrders.length = 0;
      memoryOrders.push(...orders);
      return orders;
    }
    return [...memoryOrders];
  } catch {
    console.error("KV not configured, using in-memory orders");
    return [...memoryOrders];
  }
}

export async function createOrder(order: {
  items: unknown[];
  note?: string | null;
  customer_name?: string | null;
}): Promise<Order> {
  const now = new Date().toISOString();
  const newOrder: Order = {
    id: randomUUID(),
    items: order.items as Order["items"],
    note: order.note || null,
    customer_name: order.customer_name || null,
    status: "pending",
    created_at: now,
    updated_at: now,
  };

  try {
    const orders = await getAllOrders();
    orders.unshift(newOrder);
    await kv.set(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    memoryOrders.unshift(newOrder);
  }

  return newOrder;
}

export async function updateOrder(
  id: string,
  updates: { status?: OrderStatus; note?: string | null; customer_name?: string | null }
): Promise<Order | null> {
  const orders = await getAllOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  try {
    await kv.set(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    const memIndex = memoryOrders.findIndex((o) => o.id === id);
    if (memIndex >= 0) {
      memoryOrders[memIndex] = { ...orders[index] };
    } else {
      memoryOrders.unshift({ ...orders[index] });
    }
  }

  return orders[index];
}

export async function getOrder(id: string): Promise<Order | null> {
  const orders = await getAllOrders();
  return orders.find((o) => o.id === id) ?? null;
}
