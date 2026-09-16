"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getLeads, updateLeadStageAction, createLeadAction } from "@/app/actions/leads";
import { PipelineStage } from "@prisma/client";

export type { PipelineStage };

export type LeadSource = "Instagram" | "WhatsApp" | "Email" | "Other" | string;

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  program?: string | null;
  source: LeadSource;
  stage: PipelineStage;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  notes?: any[];
}

interface LeadContextType {
  leads: Lead[];
  addLead: (leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateLeadStage: (id: string, newStage: PipelineStage) => Promise<void>;
  refreshLeads: () => Promise<void>;
}

export const LeadContext = createContext<LeadContextType | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data as unknown as Lead[]);
    } catch (error) {
      console.error("Failed to fetch leads from database:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (leadData: any) => {
    try {
      await createLeadAction(leadData);
      await fetchLeads();
    } catch (error) {
      console.error("Failed to add lead to database:", error);
    }
  };

  const updateLeadStage = async (id: string, newStage: PipelineStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l))
    );
    try {
      await updateLeadStageAction(id, newStage);
    } catch (error) {
      console.error("Failed to update stage in database:", error);
      await fetchLeads();
    }
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLeadStage, refreshLeads: fetchLeads }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
};