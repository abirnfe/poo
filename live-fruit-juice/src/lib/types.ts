export type JuiceSize = "S" | "M" | "L";

export interface Product {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  price_s: number;
  price_m: number;
  price_l: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productIcon: string;
  size: JuiceSize;
  price: number;
  quantity: number;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  product_icon: string;
  size: JuiceSize;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "completed";

export interface Order {
  id: string;
  items: OrderItem[];
  note: string | null;
  customer_name: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}
