# Live Fruit Juice

A full-stack juice shop web app built with Next.js 16 (App Router), Tailwind CSS, and Supabase. Deploy to Vercel in seconds.

## Features

- **Customer-facing storefront** — browse juice products, select sizes (S/M/L), add to cart, and place orders
- **Admin panel** — password-protected dashboard to manage products and view/manage orders
- **Real-time updates** — products and orders sync instantly between admin and customer via Supabase Realtime
- **Fully responsive** — works on mobile and desktop
- **Vibrant fruit-themed UI** — orange, mango yellow, strawberry red, and mint green

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime (WebSocket) |
| Auth | Cookie-based password gate |
| Deployment | Vercel |

## Quick Start

### 1. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from **Project Settings > API**
3. In the SQL Editor, run the migration from `supabase/migrations/20240101000000_init.sql`

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
ADMIN_PASSWORD=your-admin-password  # default: Abir1050@@
```

### 3. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the storefront, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

### 4. Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. In **Project Settings > Environment Variables**, add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `ADMIN_PASSWORD` | Your chosen admin password |

4. Click **Deploy** — Vercel will auto-detect Next.js and deploy

## Project Structure

```
live-fruit-juice/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (HTML, body, global styles)
│   │   ├── globals.css         # Tailwind + fruit-themed CSS variables
│   │   ├── page.tsx            # Customer home page (product grid + cart)
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Admin layout (header + content wrapper)
│   │   │   ├── login/page.tsx  # Admin login page
│   │   │   ├── page.tsx        # Redirects to /admin/orders
│   │   │   ├── products/page.tsx  # Product CRUD management
│   │   │   └── orders/page.tsx    # Order management dashboard
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   │   └── [id]/route.ts  # PUT (update), DELETE
│   │   │   ├── orders/
│   │   │   │   ├── route.ts        # GET (list), POST (create)
│   │   │   │   └── [id]/route.ts   # PATCH (update status)
│   │   │   └── admin/login/route.ts  # POST (verify password, set cookie)
│   ├── components/
│   │   ├── Header.tsx          # Site header with cart button
│   │   ├── ProductCard.tsx     # Product card with size selection
│   │   ├── Cart.tsx            # Cart sidebar with checkout
│   │   ├── AdminProductForm.tsx  # Product add/edit form
│   │   ├── OrderList.tsx       # Order list for admin
│   │   ├── AdminHeader.tsx     # Admin navigation header
│   │   └── ui/
│   │       ├── Button.tsx      # Reusable button with variants
│   │       ├── Badge.tsx       # Status badge component
│   │       └── Modal.tsx       # Reusable modal dialog
│   ├── hooks/
│   │   ├── useProducts.ts      # Products with realtime subscription
│   │   ├── useOrders.ts        # Orders with realtime subscription
│   │   └── useToast.ts         # Toast notification hook
│   ├── lib/
│   │   ├── types.ts            # TypeScript type definitions
│   │   ├── auth.ts             # Admin auth helpers
│   │   └── supabase/
│   │       ├── server.ts       # Server-side Supabase client
│   │       └── client.ts       # Browser-side Supabase client
│   └── middleware.ts           # Auth middleware for /admin routes
├── supabase/
│   └── migrations/
│       └── 20240101000000_init.sql  # Database schema
├── supabase/types/
│   └── database.ts            # Generated TypeScript types (optional)
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.js
└── vercel.json
```

## Usage

### Customer Flow

1. Browse the product grid on the home page
2. Click a size (S/M/L) on any product to update the displayed price
3. Adjust quantity and click **Add to Cart**
4. Click the cart icon (🛒) in the header to open the cart
5. Add an optional note (e.g., "less sugar", "no ice")
6. Click **Place Order** to submit
7. View the order confirmation with your order ID

### Admin Flow

1. Navigate to `/admin/login`
2. Enter the admin password
3. **Orders tab** — view live incoming orders, mark as complete
4. **Products tab** — add, edit, or delete juice products

## Real-time Data Flow

| Action | Trigger | Update |
|--------|---------|--------|
| Admin adds/edits/deletes product | Supabase Realtime | Customer home page updates instantly |
| Customer places order | Supabase Realtime | Admin orders page updates instantly |
| Admin marks order complete | Supabase Realtime | Order status updates instantly on all views |

## License

MIT
