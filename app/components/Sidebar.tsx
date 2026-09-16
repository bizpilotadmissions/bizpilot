"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitPullRequest,
  BookOpen,
  Bot,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Enquiries & Leads",
    href: "/leads",
    icon: Users,
  },
  {
    name: "Pipeline",
    href: "/pipeline",
    icon: GitPullRequest,
  },
  {
    name: "Courses & Batches",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Agent Log",
    href: "/agent",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B132B] text-slate-300 min-h-screen flex flex-col justify-between p-4 border-r border-slate-800">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">
              Apex Academy
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              BizPilot Admissions
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Badge */}
      <div className="pt-4 border-t border-slate-800/80 px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-extrabold text-emerald-400">
            N
          </div>
          <div className="text-[11px]">
            <p className="font-bold text-slate-200">BizPilot System</p>
            <p className="text-slate-500">v1.0.0 Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}