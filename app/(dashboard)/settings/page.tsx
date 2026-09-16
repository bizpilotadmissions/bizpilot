"use client";

import { useState, useEffect } from "react";
import {
  Key,
  Webhook,
  Bot,
  Sliders,
  Check,
  Save,
  Globe,
  Copy,
  ShieldCheck,
  MessageSquare,
  Clock,
} from "lucide-react";

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings Form State
  const [settings, setSettings] = useState({
    // Integration Credentials
    metaAccessToken: "EAAG...bizpilot_token_prod",
    whatsappPhoneNumberId: "109823749201923",
    webhookUrl: "https://api.bizpilot.app/v1/webhooks/meta",
    webhookVerifyToken: "bizpilot_admissions_secure_token",

    // AI Agent Rules
    enableAutoReplies: true,
    confidenceThreshold: 85,
    fallbackHumanHandoff: true,
    defaultCourse: "BS Computer Science",

    // Organization Info
    institutionName: "Apex Academy",
    contactEmail: "admissions@apexacademy.edu.pk",
    contactPhone: "+92 300 1234567",
    operatingHours: "09:00 AM - 06:00 PM (PKT)",
  });

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("bizpilot_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  if (!isMounted) return null;

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(settings.webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("bizpilot_settings", JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            System Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure Meta/WhatsApp integrations, AI auto-responder rules, and institution details.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Settings
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* API Credentials & Webhooks Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Webhook className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Meta & WhatsApp Cloud API
              </h2>
              <p className="text-xs text-slate-500">
                Connect your official Meta developer app to receive WhatsApp & Instagram leads.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                WhatsApp Phone Number ID
              </label>
              <input
                type="text"
                value={settings.whatsappPhoneNumberId}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappPhoneNumberId: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Webhook Verify Token
              </label>
              <input
                type="text"
                value={settings.webhookVerifyToken}
                onChange={(e) =>
                  setSettings({ ...settings, webhookVerifyToken: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Meta Access Token (System User)
              </label>
              <input
                type="password"
                value={settings.metaAccessToken}
                onChange={(e) =>
                  setSettings({ ...settings, metaAccessToken: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block font-bold text-slate-700">
                Active Webhook Endpoint URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={settings.webhookUrl}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-600 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyWebhook}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-500" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Configuration Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                AI Admissions Agent Rules
              </h2>
              <p className="text-xs text-slate-500">
                Define how the automated bot processes incoming inquiries and hands off to humans.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <div>
                <p className="font-bold text-slate-900">Enable AI Auto-Responder</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Automatically reply to new WhatsApp & Instagram inquiries 24/7.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAutoReplies}
                onChange={(e) =>
                  setSettings({ ...settings, enableAutoReplies: e.target.checked })
                }
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Min. Confidence Threshold ({settings.confidenceThreshold}%)
                </label>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={settings.confidenceThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      confidenceThreshold: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Responses below this score will trigger human handoff automatically.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Default Fallback Program
                </label>
                <select
                  value={settings.defaultCourse}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultCourse: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Business Administration">
                    BS Business Administration
                  </option>
                  <option value="Social Media Management">
                    Social Media Management
                  </option>
                  <option value="Graphic Design Masterclass">
                    Graphic Design Masterclass
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Institution Profile & Hours
              </h2>
              <p className="text-xs text-slate-500">
                Information used in automated messages and email signatures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={settings.institutionName}
                onChange={(e) =>
                  setSettings({ ...settings, institutionName: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admissions Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admissions Helpline Phone
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings({ ...settings, contactPhone: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Office Hours
              </label>
              <input
                type="text"
                value={settings.operatingHours}
                onChange={(e) =>
                  setSettings({ ...settings, operatingHours: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}