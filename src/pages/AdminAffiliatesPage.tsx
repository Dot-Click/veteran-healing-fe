import AdminLayout from "../components/layout/AdminLayout";
import { useAffiliates, useUpdateAffiliateStatus, useDeleteAffiliate } from "../hooks/useAffiliates";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function AdminAffiliatesPage() {
  const { data: affiliates = [], isLoading } = useAffiliates();
  const updateStatus = useUpdateAffiliateStatus();
  const deleteAffiliate = useDeleteAffiliate();

  async function handleStatus(id: string, status: "approved" | "rejected" | "suspended") {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Affiliate ${status}`);
    } catch {
      toast.error("Failed to update affiliate");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Are you sure you want to delete ${name}'s affiliate application?`)) {
      return;
    }
    try {
      await deleteAffiliate.mutateAsync(id);
      toast.success("Affiliate deleted");
    } catch {
      toast.error("Failed to delete affiliate");
    }
  }

  const pendingCount = affiliates.filter((a) => a.status === "pending").length;

  return (
    <AdminLayout title="Affiliates">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">
          {affiliates.length} affiliates
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
              {pendingCount} pending review
            </span>
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Affiliate</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Referral Code</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Commission</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Earned</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Joined</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-5 py-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : affiliates.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400">
                  No affiliates yet.
                </td>
              </tr>
            ) : (
              affiliates.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-brand-dark">{a.user?.name ?? "—"}</div>
                    <div className="text-xs text-gray-400">{a.user?.email ?? "—"}</div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs font-bold text-brand-primary">
                    {a.referralCode}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {(parseFloat(a.commissionRate) * 100).toFixed(0)}%
                  </td>
                  <td className="px-5 py-3 font-semibold">
                    ${(a.totalEarned / 100).toFixed(2)}
                    {a.totalPaid > 0 && (
                      <div className="text-xs text-gray-400">${(a.totalPaid / 100).toFixed(2)} paid</div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      a.status === "approved" ? "bg-green-100 text-green-700" :
                      a.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      a.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5 justify-end flex-wrap items-center">
                      {a.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(a.id, "approved")}
                            disabled={updateStatus.isPending}
                            className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatus(a.id, "rejected")}
                            disabled={updateStatus.isPending}
                            className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {a.status === "approved" && (
                        <button
                          onClick={() => handleStatus(a.id, "suspended")}
                          disabled={updateStatus.isPending}
                          className="px-3 py-1 text-xs font-semibold bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                        >
                          Suspend
                        </button>
                      )}
                      {(a.status === "rejected" || a.status === "suspended") && (
                        <button
                          onClick={() => handleStatus(a.id, "approved")}
                          disabled={updateStatus.isPending}
                          className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          Re-approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(a.id, a.user?.name ?? "Unknown")}
                        disabled={deleteAffiliate.isPending}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete affiliate"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
