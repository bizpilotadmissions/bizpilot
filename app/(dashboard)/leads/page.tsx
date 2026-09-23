"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useLeads, PipelineStage, LeadSource } from "@/app/context/LeadContext";
import LeadDetailDrawer from "@/app/components/LeadDetailDrawer";
import TabNav from "@/app/components/TabNav";
import {
  Search,
  Download,
  Plus,
  MoreVertical,
  Users,
  Clock,
  CheckCircle2,
  Archive,
  X,
  Send,
  MessageCircle,
  Mail,
  Bot,
  Upload,
  Loader2,
  TrendingUp,
  Target,
  Zap,
  Trash2,
} from "lucide-react";

const InstagramIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface NewLeadState {
  name: string;
  email: string;
  phone: string;
  program: string;
  source: LeadSource;
  notes: string;
}

const INITIAL_LEAD_STATE: NewLeadState = {
  name: "",
  email: "",
  phone: "",
  program: "Social Media Management",
  source: "Instagram",
  notes: "",
};

const STAGES: PipelineStage[] = [
  "Inquiry",
  "Application Submitted",
  "Document Review",
  "Interview Scheduled",
  "Enrolled",
  "Rejected",
];

const SOURCES: LeadSource[] = ["Instagram", "WhatsApp", "Facebook", "Email"];

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(cur.trim().replace(/^"|"$/g, ""));
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim().replace(/^"|"$/g, ""));
  return result;
}

export default function LeadsPage() {
  const context = useLeads();
  const leads = context?.leads ?? [];
  const addLead = context?.addLead;
  const deleteLead = context?.deleteLead;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>("All Stages");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>("All Channels");
  const [activeTab, setActiveTab] = useState("all");
  const [isMounted, setIsMounted] = useState(false);

  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLead, setNewLead] = useState<NewLeadState>(INITIAL_LEAD_STATE);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsBroadcastOpen(false);
      setIsAddModalOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const totalLeadsCount = leads.length;
  const enrolledCount = useMemo(() => leads.filter((l) => l.stage === "Enrolled").length, [leads]);
  const activeInquiriesCount = useMemo(() => leads.filter((l) => l.stage === "Inquiry").length, [leads]);

  const conversionRate = totalLeadsCount > 0 
    ? ((enrolledCount / totalLeadsCount) * 100).toFixed(1) 
    : "0.0";

  const topChannel = useMemo(() => {
    if (leads.length === 0) return "N/A";
    const channelCounts: Record<string, number> = {};
    leads.forEach((l) => {
      const src = l.source || "Unknown";
      channelCounts[src] = (channelCounts[src] || 0) + 1;
    });
    return Object.keys(channelCounts).reduce((a, b) => 
      channelCounts[a] > channelCounts[b] ? a : b
    );
  }, [leads]);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email || !newLead.phone) return;

    if (addLead) {
      addLead({
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        program: newLead.program,
        source: newLead.source,
        stage: "Inquiry",
        notes: newLead.notes
          ? [
              {
                id: `note-${Date.now()}`,
                text: newLead.notes,
                createdAt: new Date().toISOString().split("T")[0],
              },
            ]
          : [],
      });
    }

    setNewLead(INITIAL_LEAD_STATE);
    setIsAddModalOpen(false);
  };

  const handleDeleteLead = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete lead "${name}"?`)) {
      if (deleteLead) {
        deleteLead(id);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !addLead) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content.split(/\r?\n/);
      if (lines.length < 2) return;

      const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase());
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = parseCSVLine(lines[i]);

        const leadObj: Record<string, string> = {};
        headers.forEach((header, index) => {
          leadObj[header] = currentline[index] || "";
        });

        if (leadObj.name || leadObj.email || leadObj.phone) {
          const rawSource = leadObj.source || "Email";
          const matchedSource = (SOURCES.find(
            (s) => s.toLowerCase() === rawSource.toLowerCase()
          ) || "Email") as LeadSource;

          addLead({
            name: leadObj.name || "Imported Lead",
            email: leadObj.email || "no-email@imported.com",
            phone: leadObj.phone || "+92 000 0000000",
            program: leadObj.program || "General Enquiry",
            source: matchedSource,
            stage: "Inquiry",
            notes: [],
          });
          importedCount++;
        }
      }

      alert(`Successfully imported ${importedCount} leads!`);
    };

    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredLeads = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return leads.filter((lead) => {
      const phoneStr = lead.phone || "";
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        (lead.program?.toLowerCase() || "").includes(query) ||
        phoneStr.includes(query);

      const matchesStage =
        selectedStageFilter === "All Stages" || lead.stage === selectedStageFilter;

      const matchesSource =
        selectedSourceFilter === "All Channels" || lead.source === selectedSourceFilter;

      const matchesTab =
        activeTab === "all" ? true :
        activeTab === "inquiries" ? lead.stage === "Inquiry" :
        activeTab === "enrolled" ? lead.stage === "Enrolled" :
        activeTab === "rejected" ? lead.stage === "Rejected" : true;

      return matchesSearch && matchesStage && matchesSource && matchesTab;
    });
  }, [leads, searchQuery, selectedStageFilter, selectedSourceFilter, activeTab]);

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage || filteredLeads.length === 0) return;

    setIsSendingBroadcast(true);

    try {
      const recipients = filteredLeads.map((lead) => ({
        phone: lead.phone || "",
        email: lead.email || "",
        channel: lead.source,
      }));

      const res = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients,
          message: broadcastMessage,
        }),
      });

      if (res.ok) {
        setBroadcastSent(true);
        setTimeout(() => {
          setBroadcastSent(false);
          setIsBroadcastOpen(false);
          setBroadcastMessage("");
        }, 1800);
      } else {
        alert("Failed to send broadcast. Check server logs.");
      }
    } catch (error) {
      console.error("[Broadcast Request Error]", error);
      alert("Error dispatching broadcast.");
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID,Name,Email,Phone,Program,Source,Stage,Date\n"];
    const rows = filteredLeads.map(
      (l) => `${l.id},"${l.name}",${l.email || ""},${l.phone || ""},"${l.program || ""}",${l.source},${l.stage},${l.date || ""}`
    );
    const blob = new Blob([headers.concat(rows.join("\n")).join("")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `apex_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: "all", label: "All Leads", count: leads.length, icon: Users },
    { id: "inquiries", label: "Inquiries", count: activeInquiriesCount, icon: Clock },
    { id: "enrolled", label: "Converted", count: enrolledCount, icon: CheckCircle2 },
    { id: "rejected", label: "Lost", count: leads.filter((l) => l.stage === "Rejected").length, icon: Archive },
  ];

  const SourceBadge = ({ source }: { source: LeadSource }) => {
    switch (source) {
      case "Instagram":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-pink-50 text-pink-700 border border-pink-200">
            <InstagramIcon className="w-3 h-3 text-pink-600" /> Instagram
          </span>
        );
      case "WhatsApp":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <MessageCircle className="w-3 h-3 text-emerald-600" /> WhatsApp
          </span>
        );
      case "Facebook":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <FacebookIcon className="w-3 h-3 text-blue-600" /> Facebook
          </span>
        );
      case "Email":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Mail className="w-3 h-3 text-purple-600" /> Email
          </span>
        );
      default:
        return null;
    }
  };

  if (!isMounted) return null;

  const instaCount = filteredLeads.filter((l) => l.source === "Instagram").length;
  const waCount = filteredLeads.filter((l) => l.source === "WhatsApp").length;
  const fbCount = filteredLeads.filter((l) => l.source === "Facebook").length;
  const emailCount = filteredLeads.filter((l) => l.source === "Email").length;

  return (
    <div className="p-8 space-y-6 max-w-full mx-auto text-slate-800">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv,.txt"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Omnichannel Lead Inbox
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated lead ingestion and multi-channel messaging engine.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBroadcastOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-emerald-700" />
            Broadcast ({filteredLeads.length})
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-white" />
            Import CSV
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            Add Manual Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Total Leads</p>
            <p className="text-2xl font-bold text-slate-900">{totalLeadsCount}</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Active pipeline
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Users className="w-5 h-5 text-slate-700" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Conversion Rate</p>
            <p className="text-2xl font-bold text-slate-900">{conversionRate}%</p>
            <p className="text-[11px] text-slate-500 font-medium">
              {enrolledCount} converted
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Top Channel</p>
            <p className="text-xl font-bold text-slate-900">{topChannel}</p>
            <p className="text-[11px] text-slate-500 font-medium">
              Highest acquisition
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Pending Inquiries</p>
            <p className="text-2xl font-bold text-slate-900">{activeInquiriesCount}</p>
            <p className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> Needs follow-up
            </p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredLeads.length}</span> leads
          </p>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, course, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full sm:w-64"
              />
            </div>

            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
            >
              <option value="All Channels">All Channels</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedStageFilter}
              onChange={(e) => setSelectedStageFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
            >
              <option value="All Stages">All Stages</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
              title="Export CSV"
              aria-label="Export CSV"
            >
              <Download className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-2">Lead Name</th>
                <th className="pb-3 px-2">Channel</th>
                <th className="pb-3 px-2">Program</th>
                <th className="pb-3 px-2">Contact Details</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-2 font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {lead.name}
                  </td>
                  <td className="py-4 px-2">
                    <SourceBadge source={(lead.source || "Email") as LeadSource} />
                  </td>
                  <td className="py-4 px-2 text-slate-700 font-medium">
                    {lead.program ? String(lead.program) : "Unassigned"}
                  </td>
                  <td className="py-4 px-2">
                    <p className="text-slate-900 font-semibold">{lead.phone || "—"}</p>
                    <p className="text-[10px] text-slate-500">{lead.email || "—"}</p>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-slate-600 font-medium">{lead.date}</td>
                  <td className="py-4 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => handleDeleteLead(e, lead.id, lead.name)}
                        aria-label={`Delete ${lead.name}`}
                        className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeadId(lead.id);
                        }}
                        aria-label={`Open details for ${lead.name}`}
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                    No leads match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isBroadcastOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">
                  BizPilot Multi-Channel Broadcast
                </h2>
              </div>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                aria-label="Close modal"
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-2">
              <p className="font-semibold text-emerald-950">
                Targeting {filteredLeads.length} selected leads across native APIs:
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-emerald-900">
                <span>📷 {instaCount} Instagram DMs</span>
                <span>💬 {waCount} WhatsApps</span>
                <span>🌐 {fbCount} Facebook DMs</span>
                <span>✉️ {emailCount} Emails</span>
              </div>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Broadcast Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Hello! Admissions for BS Business Administration are closing soon..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {broadcastSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold text-center">
                  ✓ Broadcast dispatched successfully across all {filteredLeads.length} channels!
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBroadcastOpen(false)}
                    className="px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingBroadcast}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isSendingBroadcast ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> Dispatching...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" /> Dispatch Messages
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Add New Lead</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close modal"
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+92 300 1234567"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Program</label>
                  <select
                    value={newLead.program}
                    onChange={(e) => setNewLead({ ...newLead, program: e.target.value })}
                    className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="BS Business Administration">BS Business Administration</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Accounting & Finance">Accounting & Finance</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Source Channel</label>
                  <select
                    value={newLead.source}
                    onChange={(e) =>
                      setNewLead({ ...newLead, source: e.target.value as LeadSource })
                    }
                    className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Initial Notes</label>
                <textarea
                  rows={3}
                  placeholder="Optional details..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <LeadDetailDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
      />
    </div>
  );
}