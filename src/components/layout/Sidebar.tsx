"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Store, HandCoins, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor", label: "Vendor", icon: Store },
  { href: "/investor", label: "Investor", icon: HandCoins },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="w-64 h-screen border-r border-white/10 bg-[#0B1020] p-4 flex flex-col">
      <div className="mb-6">
        <p className="text-xs text-white/60">Admin Panel</p>
        <h2 className="text-lg font-semibold">Tredsure</h2>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-[#27AE60] text-black font-medium"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}