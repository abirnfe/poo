import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: AdminNavItem[] = [
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Products", href: "/admin/products", icon: "🍓" },
];

export function AdminHeader() {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-orange to-strawberry text-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍹</span>
          <h1 className="text-xl font-extrabold">Live Fruit Juice — Admin</h1>
        </div>

        <nav className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                ${
                  pathname === item.href
                    ? "bg-white text-orange"
                    : "hover:bg-white/20"
                }
              `}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
