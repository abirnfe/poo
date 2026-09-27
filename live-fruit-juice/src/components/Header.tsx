"use client";

import Link from "next/link";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl">🍹</span>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange to-strawberry bg-clip-text text-transparent">
            Live Fruit Juice
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative rounded-full bg-mint p-2 text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
          >
            <span className="text-xl">🛒</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-strawberry text-xs font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
          <Link
            href="/admin/login"
            className="hidden text-sm font-medium text-gray-600 hover:text-orange md:block"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
