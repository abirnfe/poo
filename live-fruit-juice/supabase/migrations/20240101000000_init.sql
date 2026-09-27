-- Enable pgcrypto extension for UUID generation
create extension if not exists "pgcrypto";

-- Products table: stores juice products with three size prices
create table public.products (
  id uuid primary key default uuid_generate_uuid(),
  name text not null,
  icon text not null,
  description text,
  price_s numeric not null default 0,
  price_m numeric not null default 0,
  price_l numeric not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Orders table: stores customer orders with items as JSONB
create table public.orders (
  id uuid primary key default uuid_generate_uuid(),
  items jsonb not null default '[]'::jsonb,
  note text,
  customer_name text,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index orders_created_at_idx on public.orders (created_at desc);
create index orders_status_idx on public.orders (status);
create index products_created_at_idx on public.products (created_at desc);

-- Enable Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Allow public read access to products (visible to all customers)
create policy "Public can read products"
  on public.products
  for select
  using (true);

-- Allow public insert to orders (customers can place orders)
create policy "Public can insert orders"
  on public.orders
  for insert
  with check (true);

-- Allow public update on orders for status changes (or restrict via auth)
create policy "Public can read orders"
  on public.orders
  for select
  using (true);

create policy "Public can update orders"
  on public.orders
  for update
  using (true);

-- Trigger to auto-update the updated_at column
create or replace function public.handle_updated_at()
returns trigger
language 'plpgsql'
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger handle_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

create trigger handle_orders_updated_at
  before update on public.orders
  for each row
  execute function public.handle_updated_at();

-- Seed some initial products
insert into public.products (name, icon, description, price_s, price_m, price_l) values
  ('Strawberry Blast', '🍓', 'Fresh strawberry juice with a hint of mint', 3.50, 4.50, 5.50),
  ('Mango Magic', '🥭', 'Tropical mango bliss, perfectly sweet', 4.00, 5.00, 6.00),
  ('Orange Sunrise', '🍊', 'Classic fresh-squeezed orange juice', 3.00, 4.00, 5.00),
  ('Mint Green Detox', '🥗', 'Cool mint cucumber juice for a healthy glow', 4.50, 5.50, 6.50),
  ('Pineapple Coconut', '🍍', 'Tropical blend of pineapple and coconut', 4.50, 5.50, 6.50),
  ('Watermelon Cooler', '🍉', 'Refreshing watermelon juice, perfect for summer', 3.50, 4.50, 5.50),
  ('Blueberry Burst', '🔵', 'Antioxidant-rich blueberry juice', 5.00, 6.00, 7.00),
  ('Lemon Mint Spark', '🍋', 'Zesty lemon with fresh mint leaves', 3.50, 4.50, 5.50);
