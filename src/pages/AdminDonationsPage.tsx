import AdminLayout from "../components/layout/AdminLayout";
import { useDonations, useDonationStats } from "../hooks/useDonations";
import { Heart, DollarSign, CheckCircle } from "lucide-react";

export default function AdminDonationsPage() {
  const { data: donations = [], isLoading } = useDonations();
  const { data: stats, isLoading: statsLoading } = useDonationStats();

  const totalAll = donations.reduce((sum, d) => sum + d.amount, 0) / 100;

  return (
    <AdminLayout title="Donations">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
            <DollarSign size={18} className="text-white" />
          </div>
          <div>
            {statsLoading ? (
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-xl font-bold text-brand-dark">
                ${((stats?.totalCents ?? 0) / 100).toFixed(2)}
              </p>
            )}
            <p className="text-xs text-gray-500">Completed Donations</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} className="text-white" />
          </div>
          <div>
            {statsLoading ? (
              <div className="h-6 w-10 bg-gray-200 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-xl font-bold text-brand-dark">{stats?.count ?? 0}</p>
            )}
            <p className="text-xs text-gray-500">Completed Count</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Heart size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-brand-dark">${totalAll.toFixed(2)}</p>
            <p className="text-xs text-gray-500">All Time (all statuses)</p>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Amount</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Donor</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Message</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Match</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-5 py-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  No donations yet.
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-bold text-brand-dark">
                    ${(d.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    <div>{d.donorName ?? "Anonymous"}</div>
                    {d.donorEmail && (
                      <div className="text-xs text-gray-400">{d.donorEmail}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs truncate">
                    {d.message ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      d.status === "completed" ? "bg-green-100 text-green-700" :
                      d.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      d.status === "failed" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium ${d.matchFulfilled ? "text-green-600" : "text-gray-400"}`}>
                      {d.matchFulfilled ? "✓ Fulfilled" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(d.createdAt).toLocaleDateString()}
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
