# Live Fruit Juice

A full-stack juice shop web app built with Next.js 16 (App Router), Tailwind CSS 4, and Vercel KV (Redis). Deploy to Vercel with zero external database setup.

## Features

- **Customer-facing storefront** — browse juice products, select sizes (S/M/L), add to cart, and place orders
- **Admin panel** — password-protected dashboard to manage products and view/manage orders
- **Live data sync** — products and orders sync via 3-second polling
- **Fully responsive** — works on mobile and desktop
- **Vibrant fruit-themed UI** — orange, mango yellow, strawberry red, and mint green
- **Vercel-native** — uses Vercel KV for storage (no external database account needed)
- **Runs with zero config** — seed data loads automatically even without KV

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 4 |
| Storage | Vercel KV (Redis) — falls back to seed data + in-memory |
| Auth | Cookie-based password gate |
| Realtime | Polling (3-second interval) |
| Deployment | Vercel (auto-detected, no config needed) |

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the storefront.

The app works out of the box with seed data — no external database required. For persistent storage, create a Vercel KV database (see below).

### Production Deployment (Vercel)

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel auto-detects Next.js — no `vercel.json` needed
4. In **Project Settings > Environment Variables**, set:

| Name | Required | Value |
|------|----------|-------|
| `ADMIN_PASSWORD` | Yes | Your chosen admin password (default: `Abir1050@@`) |
| `KV_REST_API_URL` | No* | Auto-set when you create a KV database |
| `KV_REST_API_TOKEN` | No* | Auto-set when you create a KV database |

\* Without KV, the app uses seed data + in-memory storage (resets on function restart). For persistent orders, create a KV database:

1. In Vercel dashboard → **Storage** → **Create Database** → **KV**
2. Link the KV database to your project
3. Vercel automatically injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`

## Project Structure

```
live-fruit-juice/
├── .env.example              # Environment variables
├── AGENTS.md                 # Agent commands
├── README.md                 # This file
├── next.config.ts            # Next.js config
├── package.json              # Dependencies + scripts
├── postcss.config.mjs        # PostCSS config
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (HTML, body, global styles)
│   │   ├── globals.css          # Tailwind + fruit-themed CSS variables
│   │   ├── page.tsx            # Customer home page (product grid + cart)
│   │   ├── login/page.tsx       # Admin login page
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Protected layout (auth check + AdminHeader)
│   │   │   ├── page.tsx        # Redirects to /admin/orders
│   │   │   ├── products/page.tsx  # Product CRUD management
│   │   │   └── orders/page.tsx   # Order management dashboard
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   │   └── [id]/route.ts  # PUT (update), DELETE
│   │   │   ├── orders/
│   │   │   │   ├── route.ts        # GET (list), POST (create)
│   │   │   │   └── [id]/route.ts   # PATCH (update status)
│   │   │   └── admin/login/route.ts  # POST (verify password, set cookie)
│   ├── components/
│   │   ├── Header.tsx           # Site header with cart button
│   │   ├── ProductCard.tsx      # Product card with size selection
│   │   ├── Cart.tsx             # Cart sidebar with checkout
│   │   ├── AdminProductForm.tsx # Product add/edit form
│   │   ├── OrderList.tsx        # Order list for admin
│   │   ├── AdminHeader.tsx      # Admin navigation header
│   │   └── ui/
│   │       ├── Button.tsx       # Reusable button with variants
│   │       ├── Badge.tsx        # Status badge component
│   │       └── Modal.tsx        # Reusable modal dialog
│   ├── hooks/
│   │   ├── useProducts.ts       # Products with 3s polling
│   │   ├── useOrders.ts         # Orders with 3s polling
│   │   └── useToast.tsx         # Toast notification hook
│   ├── lib/
│   │   ├── types.ts             # TypeScript type definitions
│   │   ├── auth.ts              # Admin auth helpers (cookie-based)
│   │   ├── kv.ts                # Vercel KV client
│   │   ├── seed.ts              # Initial product seed data
│   │   └── data/
│   │       ├── products.ts      # Product CRUD (KV + in-memory fallback)
│   │       └── orders.ts        # Order CRUD (KV + in-memory fallback)
│   └── middleware.ts           # N/A (removed - using server-side layout auth)
├── public/                     # Static assets
└── supabase/                   # (removed - using Vercel KV)
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

1. Navigate to `/login`
2. Enter the admin password (`Abir1050@@` by default)
3. **Orders tab** — view live orders (auto-refreshes every 3s), mark as complete
4. **Products tab** — add, edit, or delete juice products

## Data Flow

| Action | Mechanism | Update Latency |
|--------|-----------|----------------|
| Admin adds/edits/deletes product | 3s polling | ≤3 seconds |
| Customer places order | 3s polling | ≤3 seconds |
| Admin marks order complete | 3s polling | ≤3 seconds |
| Order status | Stored in `orders:all` key | Persistent |

## License

MIT
