"use client";

import { Bell, Megaphone, UserCircle2 } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

export default function Topbar() {
  return (
    <header className="h-14 border-b border-white/10 bg-[#0B1020] px-4 flex items-center justify-between">
      <div>
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
          aria-label="Broadcast"
          title="Broadcast"
        >
          <Megaphone size={18} />
        </button>

        <button
          className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          className="h-9 px-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2"
          aria-label="Profile"
          title="Profile"
        >
          <UserCircle2 size={18} />
          <span className="text-sm">Profile</span>
        </button>
      </div>
    </header>
  );
}