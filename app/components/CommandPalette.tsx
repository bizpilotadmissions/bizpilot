"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLeads } from "@/app/context/LeadContext";
import { Search, User, BookOpen, Layers, X, ArrowRight } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { leads } = useLeads();
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLeads = query.trim()
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.phone.includes(query) ||
          l.program.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectLead = (id: string) => {
    onClose();
    router.push(`/leads?id=${id}`);
  };

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="relative border-b border-slate-100 flex items-center px-4">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search leads, phone numbers, programs, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 text-xs space-y-1">
          {/* Quick Nav Options when query is empty */}
          {!query.trim() && (
            <div className="space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Quick Navigation
              </p>
              <button
                onClick={() => handleNavigate("/leads")}
                className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <User className="w-4 h-4 text-emerald-600" /> Enquiries & Leads
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavigate("/pipeline")}
                className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Layers className="w-4 h-4 text-indigo-600" /> Pipeline Kanban
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavigate("/courses")}
                className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Courses & Active Batches
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          )}

          {/* Lead Search Matches */}
          {query.trim() !== "" && filteredLeads.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Matching Leads ({filteredLeads.length})
              </p>
              {filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => handleSelectLead(lead.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-emerald-50/60 rounded-xl transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-700">
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {lead.phone} • {lead.program}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                    {lead.stage}
                  </span>
                </button>
              ))}
            </div>
          )}

          {query.trim() !== "" && filteredLeads.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching leads found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">ESC</kbd> to exit
          </span>
          <span>BizPilot Command Search</span>
        </div>
      </div>
    </div>
  );
}