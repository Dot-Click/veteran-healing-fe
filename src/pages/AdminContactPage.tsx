import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import toast from "react-hot-toast";
import api from "../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "reviewed" | "resolved";
  createdAt: string;
  reviewedBy?: string;
  reviewer?: { id: string; email: string; name: string };
}

export default function AdminContactPage() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "reviewed" | "resolved">("all");

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const res = await api.get("/contact");
      return res.data as ContactSubmission[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "new" | "reviewed" | "resolved" }) => {
      await api.patch(`/contact/${id}/status`, { status });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const filtered = submissions.filter((s) => filterStatus === "all" || s.status === filterStatus);
  const selected = submissions.find((s) => s.id === selectedId);

  const statusColors: Record<string, string> = {
    new: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
  };

  return (
    <AdminLayout title="Contact Form Submissions">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-4">
            {(["all", "new", "reviewed", "resolved"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({filtered.length})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No submissions found</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filtered.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => setSelectedId(submission.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                      selectedId === submission.id
                        ? "border-l-brand-primary bg-gray-50"
                        : "border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{submission.name}</h4>
                        <p className="text-sm text-gray-500">{submission.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[submission.status]
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">{submission.subject}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{selected.subject}</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">From</p>
                  <p className="text-sm text-gray-900">{selected.name}</p>
                  <p className="text-sm text-gray-600">{selected.email}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Date</p>
                  <p className="text-sm text-gray-900">
                    {new Date(selected.createdAt).toLocaleDateString()} at{" "}
                    {new Date(selected.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {selected.reviewer && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Reviewed By</p>
                    <p className="text-sm text-gray-900">{selected.reviewer.name}</p>
                  </div>
                )}
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Message</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="space-y-2">
                {(["new", "reviewed", "resolved"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      updateStatusMutation.mutate({ id: selected.id, status })
                    }
                    disabled={selected.status === status || updateStatusMutation.isPending}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selected.status === status
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Mark as {status}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
