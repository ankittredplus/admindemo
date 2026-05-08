"use client";

import { Users, Store, HandCoins, ReceiptIndianRupee } from "lucide-react";

const cards = [
  { title: "Total Vendors", value: 616, icon: Store },
  { title: "Total Investors", value: 543, icon: Users },
  { title: "Pending Deals", value: 50, icon: HandCoins },
  { title: "Total Revenue", value: "₹15,00,000", icon: ReceiptIndianRupee },
];

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <section>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-white/60 text-sm">
          Overview of your admin metrics
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-xl border border-white/10 bg-[#0B1020] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/70">{card.title}</p>
                <Icon size={18} className="text-[#27AE60]" />
              </div>
              <p className="text-2xl font-semibold">{card.value}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0B1020] p-4">
        <h2 className="text-lg font-medium mb-2">Business Growth Overview</h2>
        <p className="text-white/60 text-sm">
          Chart section placeholder (you can add Recharts later)
        </p>
      </section>
    </main>
  );
}