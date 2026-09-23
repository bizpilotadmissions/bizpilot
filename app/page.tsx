"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Zap,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  BarChart3,
  Layers,
  ChevronRight,
  Camera as Instagram,
  Mail,
  Send,
  Users,
  Sparkles,
  HelpCircle,
  X,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"instagram" | "whatsapp" | "email">("instagram");
  const [calcLeads, setCalcLeads] = useState<number>(250);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect directly to leads on submission
    window.location.href = "/leads";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans scroll-smooth">
      {/* 1. TOP FLOATING NAVBAR */}
      <div className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <header className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-6 py-3 flex items-center justify-between shadow-xs">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              BIZ<span className="text-emerald-600">PILOT</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#omnichannel" className="hover:text-emerald-600 transition-colors">
              Omnichannel
            </a>
            <a href="#workflows" className="hover:text-emerald-600 transition-colors">
              AI Workflows
            </a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Login
            </button>
            <Link
              href="/leads"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-xs"
            >
              Dashboard <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>
      </div>

      {/* 2. HERO SECTION */}
      <section className="pt-20 pb-16 px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Next-Gen AI Admission &amp; Lead Automation</span>
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
            className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl transition-colors shadow-xs"
          >
            Explore Features
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 pt-4 font-medium">
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

      {/* 3. INTERACTIVE OMNICHANNEL DEMO */}
      <section id="omnichannel" className="py-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
              Omnichannel Ingestion
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              See How BizPilot Handles Incoming Messages
            </h2>
          </div>

          <div className="flex justify-center gap-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab("instagram")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "instagram"
                  ? "bg-pink-50 text-pink-700 border border-pink-200"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Instagram className="w-4 h-4 text-pink-600" /> Instagram DM
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "whatsapp"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Send className="w-4 h-4 text-emerald-600" /> WhatsApp Direct
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "email"
                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Mail className="w-4 h-4 text-purple-600" /> Email Inquiry
            </button>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4 font-mono text-xs">
            {activeTab === "instagram" && (
              <>
                <div className="text-pink-400 font-bold">[INCOMING INSTAGRAM DM] @student_a: &quot;Hi! Can I get course details for Data Science?&quot;</div>
                <div className="text-slate-400">⚡ BizPilot Trigger: n8n Webhook Ingestion...</div>
                <div className="text-emerald-400">✓ Parsed Lead: &quot;student_a&quot; | Program: &quot;Data Science&quot; | Stage: &quot;Inquiry&quot;</div>
                <div className="text-slate-300">🤖 AI Auto-Reply Sent: &quot;Hello! Here is the curriculum overview link: bizpilot.app/ds-brochure&quot;</div>
              </>
            )}
            {activeTab === "whatsapp" && (
              <>
                <div className="text-emerald-400 font-bold">[INCOMING WHATSAPP] +92 321 5551234: &quot;What is the tuition fee structure for BS Business Admin?&quot;</div>
                <div className="text-slate-400">⚡ BizPilot Trigger: Meta Cloud API Webhook...</div>
                <div className="text-emerald-400">✓ Lead Updated: Stage -&gt; &quot;Document Review&quot;</div>
                <div className="text-slate-300">🤖 Automated Response: &quot;Hi Usman! Fee structure details have been sent to your WhatsApp PDF attachment.&quot;</div>
              </>
            )}
            {activeTab === "email" && (
              <>
                <div className="text-purple-400 font-bold">[INCOMING EMAIL] sara.khan@gmail.com: &quot;Application inquiry regarding spring intake.&quot;</div>
                <div className="text-slate-400">⚡ BizPilot Trigger: IMAP Lead Parser...</div>
                <div className="text-emerald-400">✓ Lead Created: &quot;Sara Khan&quot; | Program: &quot;Business Admin&quot;</div>
                <div className="text-slate-300">🤖 Auto-Confirmation Email Dispatched with Portal Access Link.</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-4 border-t border-slate-200/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
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

      {/* 5. AI WORKFLOWS */}
      <section id="workflows" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Self-Hosted AI Automation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Powered by n8n, Cloudflare Tunnels &amp; Custom AI Nodes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              BizPilot is not just a UI—it is backed by self-hosted automation workflows. Ingestion triggers extract lead names, contact details, and program interest instantly without manual data entry.
            </p>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant lead parsing from raw message text
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated pipeline stage updating
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cloudflare Tunnel security with zero open ports
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl text-slate-300 space-y-4 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-emerald-400 font-bold">n8n Execution Workflow</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="space-y-2">
              <p>1. Webhook Received [POST /api/webhooks/lead]</p>
              <p className="text-slate-500">└─ Payload: name, phone, program, channel</p>
              <p>2. Postgres Database Upsert [Lead Context]</p>
              <p className="text-slate-500">└─ ID assigned: lead_1710000000</p>
              <p>3. Broadcast Notification Dispatched</p>
              <p className="text-emerald-400">✓ Status: 200 OK (0.42s latency)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALCULATOR & PRICING */}
      <section id="pricing" className="py-16 max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
          <p className="text-xs text-slate-500 font-medium">Scale your institutional admissions without limits.</p>
        </div>

        {/* ROI Calculator */}
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Conversion Estimator</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Monthly Inbound Leads:</span>
              <span className="text-emerald-300 text-sm">{calcLeads} Leads</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={calcLeads}
              onChange={(e) => setCalcLeads(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-800/80 text-center">
            <div>
              <p className="text-[10px] text-emerald-300 font-semibold uppercase">Estimated Enrollments</p>
              <p className="text-2xl font-bold text-white">{Math.round(calcLeads * 0.4)} Students</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-300 font-semibold uppercase">Hours Saved / Month</p>
              <p className="text-2xl font-bold text-emerald-300">{Math.round(calcLeads * 0.25)} Hrs</p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter</span>
              <h3 className="text-3xl font-extrabold text-slate-900">$49 <span className="text-xs text-slate-500 font-normal">/ month</span></h3>
              <p className="text-xs text-slate-600">Ideal for small academies and single-department intake.</p>
              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Up to 500 Active Leads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instagram &amp; Email Channels</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Manual &amp; CSV Lead Ingestion</li>
              </ul>
            </div>
            <Link href="/leads" className="w-full py-3 text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors">
              Get Started
            </Link>
          </div>

          <div className="p-8 bg-white rounded-3xl border-2 border-emerald-500 shadow-xl space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Most Popular
            </span>
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pro Institution</span>
              <h3 className="text-3xl font-extrabold text-slate-900">$129 <span className="text-xs text-slate-500 font-normal">/ month</span></h3>
              <p className="text-xs text-slate-600">Full omnichannel automation with WhatsApp API &amp; AI agents.</p>
              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Inbound Leads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instagram, WhatsApp, FB &amp; Email</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> One-Click Multi-Channel Broadcast</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Self-Hosted n8n &amp; AI Integration</li>
              </ul>
            </div>
            <Link href="/leads" className="w-full py-3 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-8 h-8 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does BizPilot capture leads automatically?",
              a: "BizPilot connects via webhooks to Instagram DMs, WhatsApp Business Cloud API, and Email IMAP. Every incoming inquiry automatically parses candidate details directly into your dashboard.",
            },
            {
              q: "Can I delete or manage leads manually?",
              a: "Yes! The dashboard includes a manual lead editor, CSV import/export, and single-click lead deletion.",
            },
            {
              q: "Is BizPilot deployed on Netlify?",
              a: "Yes, BizPilot is deployed natively on Netlify with serverless Next.js API routes handling real-time broadcasts.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer shadow-xs"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex justify-between items-center font-bold text-sm text-slate-900">
                <span>{item.q}</span>
                <span className="text-emerald-600 text-lg">{openFaq === idx ? "−" : "+"}</span>
              </div>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-8 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
        <p>© {new Date().getFullYear()} BizPilot Admissions. All rights reserved.</p>
      </footer>

      {/* 9. LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 relative">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Welcome Back to BizPilot</h3>
              <p className="text-xs text-slate-500">Sign in to access your admission pipeline</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@bizpilot.app"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-xs"
              >
                Sign In &amp; Open Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}