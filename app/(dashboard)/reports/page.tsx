"use client";

import { useState, useEffect } from "react";
import { useLeads, LeadSource, PipelineStage } from "@/app/context/LeadContext";
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Filter,
} from "lucide-react";

// Brand SVG Icons
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function ReportsPage() {
  const { leads } = useLeads();
  const [isMounted, setIsMounted] = useState(false);
  const [timeframe, setTimeframe] = useState("30d");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 1. Overall Metrics
  const totalLeads = leads.length;
  const totalEnrolled = leads.filter((l) => l.stage === "Enrolled").length;
  const overallConversionRate =
    totalLeads > 0 ? ((totalEnrolled / totalLeads) * 100).toFixed(1) : "0.0";

  // Estimated revenue based on average course value (e.g., $350)
  const averageValue = 350;
  const projectedRevenue = totalEnrolled * averageValue;

  // 2. Channel Performance Calculation
  const SOURCES: LeadSource[] = ["Instagram", "WhatsApp", "Facebook", "Email"];

  const channelStats = SOURCES.map((src) => {
    const channelLeads = leads.filter((l) => l.source === src);
    const count = channelLeads.length;
    const enrolled = channelLeads.filter((l) => l.stage === "Enrolled").length;
    const conversion = count > 0 ? ((enrolled / count) * 100).toFixed(1) : "0.0";
    const share = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;

    return {
      source: src,
      count,
      enrolled,
      conversion,
      share,
    };
  });

  // 3. Stage Breakdown
  const STAGES: PipelineStage[] = [
    "Inquiry",
    "Application Submitted",
    "Document Review",
    "Interview Scheduled",
    "Enrolled",
    "Rejected",
  ];

  const stageStats = STAGES.map((stg) => {
    const count = leads.filter((l) => l.stage === stg).length;
    const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
    return { stage: stg, count, percentage };
  });

  return (
    <div className="p-8 space-y-8 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Analytics & Conversion Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Omnichannel performance, channel attribution, and pipeline velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span>Range:</span>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-transparent focus:outline-none text-indigo-600 font-bold"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Quarter to Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Ingested
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">{totalLeads}</h3>
            <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs last period
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Converted Enrolled
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">{totalEnrolled}</h3>
            <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.5% win rate
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Conversion Rate
            </span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">{overallConversionRate}%</h3>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">
              Target benchmark: 15.0%
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Est. Converted Revenue
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">
              ${projectedRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">
              Avg value: ${averageValue}/lead
            </p>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Performance (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Channel Performance & Attribution
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Lead distribution and conversion efficiency per source.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {channelStats.map((item) => (
              <div key={item.source} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-gray-800">
                    {item.source === "Instagram" && <InstagramIcon className="text-pink-600" />}
                    {item.source === "WhatsApp" && <span className="text-emerald-600 font-bold">💬</span>}
                    {item.source === "Facebook" && <FacebookIcon className="text-blue-600" />}
                    {item.source === "Email" && <span className="text-purple-600 font-bold">✉️</span>}
                    {item.source}
                  </span>
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>{item.count} Leads ({item.share}%)</span>
                    <span className="font-bold text-gray-900">{item.conversion}% Conv. Rate</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.source === "Instagram"
                        ? "bg-pink-500"
                        : item.source === "WhatsApp"
                        ? "bg-emerald-500"
                        : item.source === "Facebook"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Funnel Breakdown (1 Column) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Pipeline Stage Breakdown
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Active volume per pipeline stage.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stageStats.map((item) => (
              <div key={item.stage} className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">{item.stage}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{item.percentage}% of total pipeline</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-white border border-gray-200 text-gray-900 shadow-2xs">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}