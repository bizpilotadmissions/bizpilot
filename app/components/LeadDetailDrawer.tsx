"use client";

import { useState } from "react";
import { useLeads, Lead, Note } from "@/app/context/LeadContext";
import { 
  X, Mail, Phone, BookOpen, Tag, Calendar, 
  MessageSquare, Clock, Plus, Send 
} from "lucide-react";

interface LeadDetailDrawerProps {
  leadId: string | null;
  onClose: () => void;
}

export default function LeadDetailDrawer({ leadId, onClose }: LeadDetailDrawerProps) {
  const { leads, addNote } = useLeads();
  const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");
  const [noteText, setNoteText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const lead = leads.find((l: Lead) => l.id === leadId);

  if (!leadId || !lead) return null;

  const formatDate = (dateVal?: string | Date | null) => {
    if (!dateVal) return "N/A";
    const dateObj = new Date(dateVal);
    return isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    if (addNote) {
      await addNote(lead.id, noteText);
    }
    setNoteText("");
    setIsSubmitting(false);
  };

  const initials = lead.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-100 transition-all duration-300 animate-in slide-in-from-right"
      >
        {/* Header Profile Banner */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl shadow-inner">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {lead.stage}
                </span>
                {lead.source && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {lead.source}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-800">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Send Email
              </a>
            )}
            {lead.phone && (
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "overview"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
<span className="font-medium text-slate-800">{lead.email || "N/A"}</span>          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "notes"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Activity & Notes
            {lead.notes && lead.notes.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                {lead.notes.length}
              </span>
            )}
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "overview" ? (
            <>
              {/* Contact Information Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Contact Details
                </h3>
                
                <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> Email
                  </span>
                  <span className="font-medium text-slate-800">{lead.email}</span>
                </div>

                <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> Phone
                  </span>
                  <span className="font-medium text-slate-800">{lead.phone || "N/A"}</span>
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" /> Program
                  </span>
                  <span className="font-medium text-slate-800">{lead.program || "Unassigned"}</span>
                </div>
              </div>

              {/* Lead Metadata Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  System Attributes
                </h3>

                <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Source Channel
                  </span>
                  <span className="font-medium text-slate-800">
                    {lead.source || "Direct / Manual"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Ingestion Date
                  </span>
                  <span className="font-medium text-slate-800">{formatDate(lead.createdAt)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {/* Note Submission Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type a note or record interaction details..."
                  className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none text-slate-800 placeholder-slate-400"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !noteText.trim()}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3 pt-2">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((note: Note) => (
                    <div key={note.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Note
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {note.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-medium">No activity notes recorded yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">ID: {lead.id.slice(0, 12)}...</span>
          <button
            onClick={onClose}
            className="py-2 px-5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}