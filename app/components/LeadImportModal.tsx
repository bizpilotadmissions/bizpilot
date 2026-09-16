"use client";

import React, { useState } from "react";
import { useLeads, PipelineStage, LeadSource } from "@/app/context/LeadContext";
import { X, Upload, FileText } from "lucide-react";

interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadImportModal({ isOpen, onClose }: LeadImportModalProps) {
  const context = useLeads();
  const addLead = context?.addLead;

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const VALID_STAGES: PipelineStage[] = [
    "Inquiry",
    "Application Submitted",
    "Document Review",
    "Interview Scheduled",
    "Enrolled",
    "Rejected",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file || !addLead) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) return;

      const lines = content.split("\n");
      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));

      let count = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = lines[i]
          .split(",")
          .map((cell) => cell.trim().replace(/['"]/g, ""));

        const leadObj: Record<string, string> = {};
        headers.forEach((header, index) => {
          leadObj[header] = currentline[index] || "";
        });

        if (leadObj.name || leadObj.email || leadObj.phone) {
          // Resolve stage string to valid PipelineStage type
          const rawStage = leadObj.stage || "";
          const stageValue: PipelineStage = VALID_STAGES.includes(rawStage as PipelineStage)
            ? (rawStage as PipelineStage)
            : "Inquiry";

          // Resolve source string to valid LeadSource type
          const rawSource = leadObj.source || "";
          const validSources: LeadSource[] = ["Instagram", "WhatsApp", "Facebook", "Email"];
          const sourceValue: LeadSource = validSources.includes(rawSource as LeadSource)
            ? (rawSource as LeadSource)
            : "Email";

          addLead({
            name: leadObj.name || "Imported Lead",
            email: leadObj.email || "",
            phone: leadObj.phone || "",
            program: leadObj.program || "General Enquiry",
            source: sourceValue,
            stage: stageValue,
            notes: [],
          });

          count++;
        }
      }

      setIsProcessing(false);
      alert(`Successfully imported ${count} leads!`);
      onClose();
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">Import Leads from CSV</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-file-input"
            />
            <label htmlFor="csv-file-input" className="cursor-pointer space-y-2 block">
              <FileText className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="font-semibold text-gray-700">
                {file ? file.name : "Click to select a .csv file"}
              </p>
              <p className="text-[10px] text-gray-400">
                CSV headers should include: name, email, phone, program, source, stage
              </p>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!file || isProcessing}
              onClick={handleImport}
              className="px-4 py-2 font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-xs"
            >
              {isProcessing ? "Importing..." : "Upload & Parse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}