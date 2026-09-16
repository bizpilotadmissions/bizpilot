"use client";

import React from "react";
import { useLeads, Lead } from "@/app/context/LeadContext";
import { BarChart3, TrendingUp, Users, CheckCircle, Clock } from "lucide-react";

export default function ReportsPage() {
  const { leads } = useLeads();

  const totalLeads = leads.length;
  const enrolledLeads = leads.filter((l: Lead) => String(l.stage) === "ENROLLED").length;
  const inProgressLeads = leads.filter(
    (l: Lead) => String(l.stage) !== "ENROLLED" && String(l.stage) !== "REJECTED"
  ).length;

  const conversionRate = totalLeads > 0 
    ? Math.round((enrolledLeads / totalLeads) * 100) 
    : 0;

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
        <p className="text-xs text-slate-500 mt-1">
          Performance metrics across lead pipelines and conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Leads</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalLeads}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Enrolled</span>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{enrolledLeads}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">In Pipeline</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{inProgressLeads}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{conversionRate}%</p>
        </div>
      </div>
    </div>
  );
}