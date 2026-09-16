"use client";

import GlobalSearch from "./GlobalSearch";
import { Bell, ShieldCheck } from "lucide-react";

export default function UserHeader() {
  return (
    <header className="h-16 bg-[#0B132B] border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <GlobalSearch />

      {/* User Controls & Notifications */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-colors relative cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0B132B]" />
        </button>

        <div className="h-6 w-px bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/80 text-white font-extrabold flex items-center justify-center text-xs shadow-2xs">
            HI
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-200 leading-none">
              Hassaan Inam
            </p>
            <p className="text-[10px] font-semibold text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Admin Role
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}