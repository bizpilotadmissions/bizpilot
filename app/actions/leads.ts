"use server";

import { prisma } from "@/lib/prisma";
import { PipelineStage, LeadSource } from "@prisma/client";

export async function getLeads() {
  return await prisma.lead.findMany({
    include: { notes: true },
    orderBy: { createdAt: "desc" },
  });
}

// Maps incoming UI column titles to your actual Prisma PipelineStage enum
const mapStageToPrismaEnum = (stage: string): PipelineStage => {
  const clean = stage.replace(/\s+/g, "").toLowerCase();

  switch (clean) {
    case "engaged":
    case "contacted":
    case "documentreview":
      return PipelineStage.Engaged;

    case "application":
    case "applicationsubmitted":
    case "interviewscheduled":
      return PipelineStage.Application;

    case "enrolled":
      return PipelineStage.Enrolled;

    case "unresponsive":
    case "rejected":
    case "lost":
      return PipelineStage.Unresponsive;

    case "inquiry":
    default:
      return PipelineStage.Inquiry;
  }
};

export async function updateLeadStageAction(id: string, stage: string) {
  const prismaStage = mapStageToPrismaEnum(stage);

  return await prisma.lead.update({
    where: { id },
    data: { stage: prismaStage },
  });
}

export async function createLeadAction(data: {
  name: string;
  email: string;
  phone?: string | null;
  program?: string | null;
  source?: string;
  stage?: string;
}) {
  const prismaStage = data.stage
    ? mapStageToPrismaEnum(data.stage)
    : PipelineStage.Inquiry;

  return await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      program: data.program || "",
      source: (data.source as LeadSource) || LeadSource.Email,
      stage: prismaStage,
    },
  });
}
export async function createNoteAction(leadId: string, text: string) {
  if (!text.trim()) return null;

  return await prisma.note.create({
    data: {
      text,
      leadId,
    },
  });
}