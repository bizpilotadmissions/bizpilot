"use client";

import { useState, useEffect } from "react";
import { useLeads } from "@/app/context/LeadContext";
import { PipelineStage } from "@prisma/client";
import {
  BookOpen,
  Users,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  CheckCircle2,
} from "lucide-react";

interface CourseBatch {
  id: string;
  title: string;
  code: string;
  capacity: number;
  startDate: string;
  duration: string;
  instructor: string;
  status: "Active" | "Upcoming" | "Completed";
}

const INITIAL_COURSES: CourseBatch[] = [
  {
    id: "1",
    title: "BS Computer Science",
    code: "CS-2026-B1",
    capacity: 40,
    startDate: "2026-10-01",
    duration: "4 Years",
    instructor: "Dr. Arshad Mahmood",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "BS Business Administration",
    code: "BBA-2026-B2",
    capacity: 35,
    startDate: "2026-09-20",
    duration: "4 Years",
    instructor: "Prof. Tariq Jameel",
    status: "Active",
  },
  {
    id: "3",
    title: "Social Media Management",
    code: "SMM-2026-B4",
    capacity: 25,
    startDate: "2026-09-01",
    duration: "3 Months",
    instructor: "Ayesha Khan",
    status: "Active",
  },
  {
    id: "4",
    title: "Graphic Design Masterclass",
    code: "GDM-2026-B1",
    capacity: 20,
    startDate: "2026-10-15",
    duration: "2 Months",
    instructor: "Hassaan Inam",
    status: "Upcoming",
  },
];

export default function CoursesPage() {
  const { leads } = useLeads();
  const [courses, setCourses] = useState<CourseBatch[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bizpilot_courses");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse courses", e);
        }
      }
    }
    return INITIAL_COURSES;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseBatch | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    capacity: 30,
    startDate: "",
    duration: "3 Months",
    instructor: "",
    status: "Active" as "Active" | "Upcoming" | "Completed",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("bizpilot_courses", JSON.stringify(courses));
    }
  }, [courses, isMounted]);

  if (!isMounted) return null;

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      code: "",
      capacity: 30,
      startDate: new Date().toISOString().split("T")[0],
      duration: "3 Months",
      instructor: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: CourseBatch) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      code: course.code,
      capacity: course.capacity,
      startDate: course.startDate,
      duration: course.duration,
      instructor: course.instructor,
      status: course.status,
    });
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code) return;

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCourse: CourseBatch = {
        id: Date.now().toString(),
        ...formData,
      };
      setCourses((prev) => [newCourse, ...prev]);
    }

    setIsModalOpen(false);
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-full mx-auto min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Courses & Active Batches
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage seat capacities, enrollment allocations, and batch schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course or batch code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Batch
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          // Safe null/undefined check for program and strong enum string comparison
          const enrolledCount = leads.filter(
            (l) =>
              (l.program ?? "").toLowerCase() === course.title.toLowerCase() &&
              String(l.stage).toUpperCase() === "ENROLLED"
          ).length;

          const applicantCount = leads.filter(
            (l) =>
              (l.program ?? "").toLowerCase() === course.title.toLowerCase() &&
              String(l.stage).toUpperCase() !== "REJECTED"
          ).length;

          const occupancyRate = Math.min(
            100,
            Math.round((enrolledCount / course.capacity) * 100)
          );

          return (
            <div
              key={course.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 hover:border-slate-300 transition-all relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-600 uppercase border border-slate-200">
                      {course.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        course.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : course.status === "Upcoming"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Instructor: {course.instructor || "Unassigned"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(course)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Batch"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id, course.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Occupancy Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Confirmed Seats
                  </span>
                  <span className="text-slate-900 font-bold">
                    {enrolledCount} / {course.capacity} ({occupancyRate}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      occupancyRate >= 90 ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Applicants
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {applicantCount}
                  </p>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Duration
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {course.duration}
                  </p>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Start Date
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {course.startDate}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            No courses or active batches found. Click "Add Batch" to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {editingCourse ? "Edit Course Batch" : "Add New Course Batch"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BS Computer Science"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Batch Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-2026-B1"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Seat Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Years or 3 Months"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arshad"
                    value={formData.instructor}
                    onChange={(e) =>
                      setFormData({ ...formData, instructor: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Upcoming" | "Completed",
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  {editingCourse ? "Save Changes" : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}