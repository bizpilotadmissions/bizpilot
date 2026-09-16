"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PipelineStage =
  | "Inquiry"
  | "Application Submitted"
  | "Document Review"
  | "Interview Scheduled"
  | "Enrolled"
  | "Rejected";

export type LeadSource = "Instagram" | "WhatsApp" | "Facebook" | "Email";

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  program?: string;
  source?: LeadSource | string;
  stage: PipelineStage | string;
  date?: string;
  createdAt?: string;
  notes?: Note[];
}

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id">) => void;
  updateLead: (id: string, updatedFields: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addNote: (leadId: string, noteText: string) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bizpilot_leads");
    if (saved) {
      try {
        setLeads(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved leads", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bizpilot_leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData: Omit<Lead, "id">) => {
    const now = new Date().toISOString().split("T")[0];
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: leadData.date || now,
      createdAt: leadData.createdAt || now,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (id: string, updatedFields: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const addNote = (leadId: string, noteText: string) => {
    if (!noteText.trim()) return;
    const newNote: Note = {
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: noteText.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            notes: [...(lead.notes || []), newNote],
          };
        }
        return lead;
      })
    );
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, addNote }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
}