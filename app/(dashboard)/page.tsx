"use client";

import { useState, useEffect } from "react";
import { useLeads } from "@/app/context/LeadContext";
import {
  Users,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
} from "lucide-react";

// Brand Icon Helpers
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function OverviewPage() {
  const context = useLeads();
  const leads = context?.leads ?? [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Key Metrics
  const totalLeads = leads.length;
  const enrolledLeads = leads.filter((l) => l.stage === "Enrolled").length;
  const activeInquiries = leads.filter((l) => l.stage === "Inquiry").length;
  const conversionRate = totalLeads > 0 ? ((enrolledLeads / totalLeads) * 100).toFixed(1) : "0";

  // Channel Distribution Breakdown
  const channelStats = {
    Instagram: leads.filter((l) => l.source === "Instagram").length,
    WhatsApp: leads.filter((l) => l.source === "WhatsApp").length,
    Facebook: leads.filter((l) => l.source === "Facebook").length,
    Email: leads.filter((l) => l.source === "Email").length,
  };

  // Program Breakdown
  const programs = Array.from(new Set(leads.map((l) => l.program)));
  const programStats = programs.map((prog) => ({
    name: prog,
    count: leads.filter((l) => l.program === prog).length,
    percentage: totalLeads > 0 
      ? Math.round((leads.filter((l) => l.program === prog).length / totalLeads) * 100) 
      : 0,
  }));

  // Pipeline Bottleneck Breakdown
  const STAGES = [
    "Inquiry",
    "Application Submitted",
    "Document Review",
    "Interview Scheduled",
    "Enrolled",
    "Rejected",
  ];

  const stageCounts = STAGES.map((stage) => ({
    stage,
    count: leads.filter((l) => l.stage === stage).length,
  }));

  return (
    <div className="p-8 space-y-8 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Performance Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time telemetry across lead ingestion, channel conversions, and pipeline flow.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Automation Active</span>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Inbound Leads
            </span>
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{totalLeads}</h2>
            <span className="flex items-center text-[11px] font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% this week
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Conversion Rate
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{conversionRate}%</h2>
            <span className="flex items-center text-[11px] font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.4% avg
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active Inquiries
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{activeInquiries}</h2>
            <span className="text-[11px] font-medium text-gray-400">Needs Response</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Enrolled
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{enrolledLeads}</h2>
            <span className="text-[11px] font-medium text-blue-600 font-semibold">
              Converted
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Channel Breakdown & Program Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Volume Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5 lg:col-span-1">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Acquisition Channels
          </h3>

          <div className="space-y-4 text-xs">
            {/* Instagram */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <InstagramIcon className="text-pink-600" /> Instagram
                </span>
                <span>{channelStats.Instagram} leads</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 rounded-full"
                  style={{
                    width: `${totalLeads > 0 ? (channelStats.Instagram / totalLeads) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
                </span>
                <span>{channelStats.WhatsApp} leads</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${totalLeads > 0 ? (channelStats.WhatsApp / totalLeads) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" /> Email
                </span>
                <span>{channelStats.Email} leads</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{
                    width: `${totalLeads > 0 ? (channelStats.Email / totalLeads) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Program Popularity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Program Demand Breakdown
          </h3>

          <div className="space-y-4">
            {programStats.map((prog) => (
              <div key={prog.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-800">
                  <span>{prog.name}</span>
                  <span className="text-gray-500">
                    {prog.count} leads ({prog.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Pipeline Health */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Funnel Stage Velocity
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {stageCounts.map((s) => (
            <div
              key={s.stage}
              className="bg-gray-50 border border-gray-200/60 p-4 rounded-xl text-center space-y-1"
            >
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block truncate">
                {s.stage}
              </span>
              <p className="text-xl font-bold text-gray-900">{s.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}