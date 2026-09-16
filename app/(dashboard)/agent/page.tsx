"use client";

import { useState, useEffect } from "react";
import {
  Bot,
  MessageSquare,
  CheckCircle2,
  Clock,
  Zap,
  Search,
  RefreshCw,
  Phone,
  Camera,
  Globe,
} from "lucide-react";

interface AgentLogEntry {
  id: string;
  timestamp: string;
  channel: "WhatsApp" | "Instagram" | "Web Form";
  leadName: string;
  triggerEvent: string;
  aiResponse: string;
  intent: "Course Inquiry" | "Fee Structure" | "Admission Status" | "General";
  confidence: number;
  status: "Success" | "Handed to Human" | "Pending";
}

const INITIAL_LOGS: AgentLogEntry[] = [
  {
    id: "LOG-9021",
    timestamp: "2026-09-15 12:18 PM",
    channel: "WhatsApp",
    leadName: "Zaka",
    triggerEvent: "Inquired about Social Media Management batch start dates.",
    aiResponse:
      "Hi Zaka! The next Social Media Management batch starts on 2026-09-01. Seats are filling fast! Would you like me to submit your initial inquiry?",
    intent: "Course Inquiry",
    confidence: 98,
    status: "Success",
  },
  {
    id: "LOG-9020",
    timestamp: "2026-09-15 11:45 AM",
    channel: "Instagram",
    leadName: "xyz",
    triggerEvent: "DM: What is the fee for BS Business Administration?",
    aiResponse:
      "Hello! BS Business Administration covers comprehensive core management modules. An admissions advisor can call you with full details—what is your best phone number?",
    intent: "Fee Structure",
    confidence: 94,
    status: "Success",
  },
  {
    id: "LOG-9019",
    timestamp: "2026-09-14 04:30 PM",
    channel: "Web Form",
    leadName: "Hassaan Inam",
    triggerEvent: "Submitted application for Computer Science.",
    aiResponse:
      "Thank you Hassaan! Your application for Computer Science (CS-2026-B1) has been received. Our team will review your credentials shortly.",
    intent: "Admission Status",
    confidence: 99,
    status: "Success",
  },
  {
    id: "LOG-9018",
    timestamp: "2026-09-14 02:15 PM",
    channel: "WhatsApp",
    leadName: "Sara Khan",
    triggerEvent: "Asked for custom scholarship discount.",
    aiResponse:
      "I've flagged your request for custom fee structure evaluation. An admissions officer will contact you shortly.",
    intent: "General",
    confidence: 78,
    status: "Handed to Human",
  },
];

export default function AgentLogPage() {
  const [logs, setLogs] = useState<AgentLogEntry[]>(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.triggerEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.aiResponse.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel =
      selectedChannel === "All" || log.channel === selectedChannel;

    return matchesSearch && matchesChannel;
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "WhatsApp":
        return <Phone className="w-3.5 h-3.5 text-emerald-600" />;
      case "Instagram":
        return <Camera className="w-3.5 h-3.5 text-pink-600" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-full mx-auto min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              AI Agent Execution Log
            </h1>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Bot Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time history of automated responses, trigger webhooks, and channel interactions.
          </p>
        </div>

        <button
          onClick={() => setLogs([...INITIAL_LOGS])}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Refresh Feed
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Interactions
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {logs.length}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Auto-Resolved Rate
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">75.0%</h3>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Avg AI Confidence
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">92.2%</h3>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Filters & Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {["All", "WhatsApp", "Instagram", "Web Form"].map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedChannel === ch
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search triggers or responses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Log Entries List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-black border border-slate-200">
                    {log.id}
                  </span>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 text-xs font-bold text-slate-800">
                    {getChannelIcon(log.channel)}
                    <span>{log.channel}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {log.leadName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {log.timestamp}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      log.status === "Success"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>

              {/* Event & Auto-Response Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Incoming Trigger / Prompt
                  </span>
                  <p className="text-slate-800 font-medium">{log.triggerEvent}</p>
                </div>

                <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                      <Bot className="w-3 h-3" /> Automated Response
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">
                      Confidence: {log.confidence}%
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium">{log.aiResponse}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
              No log records match your query or channel filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}