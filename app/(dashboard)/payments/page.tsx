"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

interface PaymentRecord {
  id: string;
  studentName: string;
  rollNo: string;
  program: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
  paymentMethod: string;
}

const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "INV-2026-001",
    studentName: "Hassaan Inam",
    rollNo: "CS-2026-01",
    program: "Computer Science",
    amount: 150000,
    date: "2026-09-10",
    status: "Paid",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV-2026-002",
    studentName: "Sara Khan",
    rollNo: "BA-2026-04",
    program: "Business Admin",
    amount: 120000,
    date: "2026-09-12",
    status: "Pending",
    paymentMethod: "Online Card",
  },
  {
    id: "INV-2026-003",
    studentName: "Usman Ahmed",
    rollNo: "DS-2026-09",
    program: "Data Science",
    amount: 135000,
    date: "2026-09-01",
    status: "Overdue",
    paymentMethod: "Direct Deposit",
  },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPayments = INITIAL_PAYMENTS.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.rollNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || payment.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalCollected = INITIAL_PAYMENTS.filter((p) => p.status === "Paid").reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalPending = INITIAL_PAYMENTS.filter((p) => p.status === "Pending").reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalOverdue = INITIAL_PAYMENTS.filter((p) => p.status === "Overdue").reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="p-8 space-y-8 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Payments & Fee Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track student fee collections, pending dues, and payment histories.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Record Fee Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Total Collected
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Rs. {totalCollected.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-500">Collected in current term</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Pending Payments
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Rs. {totalPending.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-500">Awaiting clearance</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Overdue Amount
            </span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Rs. {totalOverdue.toLocaleString()}
          </h2>
          <p className="text-xs text-rose-600 font-medium">Requires follow-up</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900">Payment Transactions</h3>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search invoice or student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full sm:w-60"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-gray-500" />
                <span>{selectedStatus === "All" ? "Filter Status" : selectedStatus}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                  {["All", "Paid", "Pending", "Overdue"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                        selectedStatus === status
                          ? "bg-emerald-50 text-emerald-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition-colors" title="Export CSV">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3 px-2">Invoice ID</th>
                <th className="pb-3 px-2">Student</th>
                <th className="pb-3 px-2">Program</th>
                <th className="pb-3 px-2">Amount</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-2 font-mono font-semibold text-gray-800">
                    {p.id}
                  </td>
                  <td className="py-4 px-2">
                    <p className="font-bold text-gray-900">{p.studentName}</p>
                    <p className="text-[10px] text-gray-400">{p.rollNo}</p>
                  </td>
                  <td className="py-4 px-2 text-gray-600">{p.program}</td>
                  <td className="py-4 px-2 font-semibold text-gray-900">
                    Rs. {p.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-gray-500">{p.date}</td>
                  <td className="py-4 px-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        p.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : p.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}