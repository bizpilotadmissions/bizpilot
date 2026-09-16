"use client";

import { useState, useMemo } from "react";
import { useLeads, Lead } from "@/app/context/LeadContext";
import { 
  MessageCircle, GripVertical, Sparkles, 
  PhoneCall, Mail, HelpCircle, Share2, Globe, Filter, Plus, Inbox
} from "lucide-react";
import LeadDetailDrawer from "@/app/components/LeadDetailDrawer";
import LeadImportModal from "@/app/components/LeadImportModal";

const STAGES: string[] = [
  "Inquiry",
  "Engaged",
  "Application",
  "Enrolled",
  "Unresponsive",
];

const SOURCES = ["All", "Instagram", "WhatsApp", "Facebook", "Email"];

const getSourceBadge = (source: string) => {
  const cleanSource = source?.toLowerCase() || "";

  if (cleanSource.includes("instagram")) {
    return {
      icon: <Share2 className="w-3 h-3 text-pink-500" />,
      label: "Instagram",
      style: "bg-pink-50 text-pink-700 border-pink-200/80 hover:bg-pink-100",
    };
  }
  if (cleanSource.includes("whatsapp")) {
    return {
      icon: <PhoneCall className="w-3 h-3 text-emerald-500" />,
      label: "WhatsApp",
      style: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100",
    };
  }
  if (cleanSource.includes("facebook")) {
    return {
      icon: <Globe className="w-3 h-3 text-blue-600" />,
      label: "Facebook",
      style: "bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100",
    };
  }
  if (cleanSource.includes("email")) {
    return {
      icon: <Mail className="w-3 h-3 text-amber-500" />,
      label: "Email",
      style: "bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100",
    };
  }
  return {
    icon: <HelpCircle className="w-3 h-3 text-slate-400" />,
    label: source || "Other",
    style: "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200",
  };
};

export default function PipelinePage() {
  const { leads, updateLeadStage } = useLeads();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState("All");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      updateLeadStage(leadId, targetStage);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead: Lead) => {
      return (
        selectedSource === "All" || 
        lead.source?.toLowerCase().includes(selectedSource.toLowerCase())
      );
    });
  }, [leads, selectedSource]);

  return (
    <div className="p-8 max-w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Admissions Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage and track lead progression across stages in real-time
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{filteredLeads.length} Displayed / {leads.length} Total</span>
          </div>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Source Filter Toolbar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <span className="text-xs font-semibold text-slate-600">Filter Source:</span>
        </div>
        
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {SOURCES.map((src) => {
            const isActive = selectedSource === src;
            return (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {src}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 items-start w-full">
        {STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((l: Lead) => l.stage === stage);

          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="flex-1 min-w-0 bg-slate-50/70 rounded-2xl p-3 border border-slate-200/70 flex flex-col min-h-[640px] transition-colors"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between px-2 py-2 mb-3 border-b border-slate-200/60">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {stage}
                </span>
                <span className="w-5 h-5 flex items-center justify-center text-[11px] font-bold bg-white text-slate-700 rounded-full border border-slate-200 shadow-2xs">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Drop Area */}
              <div className="space-y-3 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="h-40 border-2 border-dashed border-slate-200/80 rounded-xl flex flex-col items-center justify-center p-4 text-center group hover:border-slate-300 transition-colors">
                    <Inbox className="w-5 h-5 text-slate-300 mb-1.5 group-hover:text-slate-400 transition-colors" />
                    <p className="text-[11px] text-slate-400 font-medium">
                      No leads in this stage
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5">
                      Drop cards here to update stage
                    </p>
                  </div>
                ) : (
                  stageLeads.map((lead: Lead) => {
                    const sourceConfig = getSourceBadge(lead.source);

                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="p-4 bg-white rounded-xl shadow-2xs border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 cursor-pointer group relative"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-xs text-slate-800 group-hover:text-emerald-600 transition-colors leading-snug">
                            {lead.name}
                          </span>
                          <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 shrink-0" />
                        </div>

                        {lead.program && (
                          <p className="text-[11px] text-slate-500 mb-3 line-clamp-1">
                            {lead.program}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors ${sourceConfig.style}`}
                          >
                            {sourceConfig.icon}
                            <span>{sourceConfig.label}</span>
                          </div>

                          {lead.notes && lead.notes.length > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                              <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                              {lead.notes.length}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Drawer */}
      <LeadDetailDrawer
        leadId={selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
      />

      {/* Import / Add Lead Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}