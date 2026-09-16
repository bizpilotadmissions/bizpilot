"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLeads, Lead } from "@/app/context/LeadContext";
import { Search, User, BookOpen, Layers, X, ArrowRight } from "lucide-react";

export default function GlobalSearch() {
  const router = useRouter();
  const context = useLeads();
  const leads = useMemo(() => context?.leads ?? [], [context?.leads]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filteredLeads: Lead[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return leads.filter((l: Lead) => {
      const matchesName = l.name?.toLowerCase().includes(q) ?? false;
      const matchesPhone = l.phone ? l.phone.includes(q) : false;
      const matchesProgram = l.program?.toLowerCase().includes(q) ?? false;
      const matchesEmail = l.email?.toLowerCase().includes(q) ?? false;

      return matchesName || matchesPhone || matchesProgram || matchesEmail;
    });
  }, [leads, query]);

  const handleSelectLead = (id: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/leads?id=${id}`);
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center justify-between w-64 md:w-80 px-3.5 py-2 text-xs bg-slate-900/60 hover:bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer shadow-2xs"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search leads, phone numbers...</span>
        </span>
        <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-mono shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4"
        >
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in fade-in zoom-in-95 duration-150">
            <div className="relative border-b border-slate-100 flex items-center px-4">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search leads, phone numbers, courses, or navigate..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3.5 text-xs font-medium text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 text-xs space-y-1">
              {!query.trim() && (
                <div className="space-y-1">
                  <p className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Quick Navigation
                  </p>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/leads")}
                    className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <User className="w-4 h-4 text-emerald-600" /> Enquiries & Leads
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate("/pipeline")}
                    className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <Layers className="w-4 h-4 text-indigo-600" /> Pipeline Kanban
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigate("/courses")}
                    className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <BookOpen className="w-4 h-4 text-blue-600" /> Courses & Active Batches
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              )}

              {query.trim() !== "" && filteredLeads.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Matching Leads ({filteredLeads.length})
                  </p>
                  {filteredLeads.map((lead: Lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => handleSelectLead(lead.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-emerald-50/60 rounded-xl transition-colors text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                          {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-700">
                            {lead.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {lead.phone || "No phone"} • {lead.program || "Unassigned"}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-600 border border-slate-200">
                        {lead.stage}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {query.trim() !== "" && filteredLeads.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No leads found matching "{query}".
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">ESC</kbd> to exit
              </span>
              <span className="font-semibold text-slate-500">BizPilot Command Search</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}