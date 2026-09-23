"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans">
      {/* Top Floating Pill Header (Octal Style) */}
      <div className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <header className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-full px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              BIZ<span className="text-emerald-600">PILOT</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#omnichannel" className="hover:text-emerald-600 transition-colors">
              Omnichannel
            </a>
            <a href="#automation" className="hover:text-emerald-600 transition-colors">
              AI Workflows
            </a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/leads"
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shadow-xs"
            >
              Dashboard <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Next-Gen AI Admission & Lead Automation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Effortless Lead Acquisition <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
            For Growing Institutions
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Capture inquiries from Instagram, WhatsApp, Facebook, and Email into a single automated pipeline. Broadcast messages, track conversions, and close leads on autopilot.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/leads"
            className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Launch Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors"
          >
            Explore Features
          </a>
        </div>

        <div className="flex justify-center gap-6 text-xs text-slate-500 pt-4 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Channel Sync
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated AI Workflows
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Code Setup
          </span>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-4 border-t border-slate-100">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Everything you need to convert inquiries into enrollments
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            BizPilot brings together native channel integrations, smart broadcast tools, and actionable pipeline analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Unified Lead Inbox</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidate DMs and emails from Instagram, Meta, WhatsApp, and form submissions into one real-time dashboard.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Conversion Analytics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitor key metrics like total leads, top acquisition channel, conversion percentages, and pending inquiries instantly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Multi-Channel Broadcast</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dispatch bulk updates or follow-up campaigns directly across WhatsApp, Instagram, and Email with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} BizPilot. All rights reserved.</p>
      </footer>
    </div>
  );
}