import AdminLayout from "../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { ShoppingBag, DollarSign, Users, Heart, AlertCircle, Mail } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import { useDonationStats } from "../hooks/useDonations";
import { useAffiliates } from "../hooks/useAffiliates";
import { useContacts } from "../hooks/useContacts";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  loading?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        {loading ? (
          <div className="h-7 w-20 bg-gray-200 rounded animate-pulse mb-1" />
        ) : (
          <p className="text-2xl font-bold text-brand-dark">{value}</p>
        )}
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  const { data: donationStats, isLoading: statsLoading } = useDonationStats();
  const { data: affiliates = [], isLoading: affiliatesLoading } = useAffiliates();
  const { data: contacts = [] } = useContacts();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) / 100;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const pendingAffiliates = affiliates.filter((a) => a.status === "pending").length;
  const newContacts = contacts.filter((c) => c.status === "new").length;

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={ShoppingBag}
          label={`Total Orders (${pendingOrders} pending)`}
          value={String(orders.length)}
          color="bg-blue-500"
          loading={ordersLoading}
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          color="bg-green-500"
          loading={ordersLoading}
        />
        <StatCard
          icon={Heart}
          label={`Donations (${donationStats?.count ?? 0} completed)`}
          value={donationStats ? `$${(donationStats.totalCents / 100).toFixed(2)}` : "$0.00"}
          color="bg-brand-gold"
          loading={statsLoading}
        />
        <StatCard
          icon={Users}
          label="Affiliates"
          value={String(affiliates.length)}
          color="bg-purple-500"
          loading={affiliatesLoading}
        />
      </div>

      {/* Notifications */}
      {(pendingAffiliates > 0 || newContacts > 0) && (
        <div className="mb-8 space-y-3">
          {pendingAffiliates > 0 && (
            <Link to="/admin/affiliates">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 hover:bg-blue-100 transition-colors">
                <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">
                    {pendingAffiliates} pending affiliate {pendingAffiliates === 1 ? "application" : "applications"}
                  </p>
                  <p className="text-sm text-blue-700">Review and approve new affiliate requests</p>
                </div>
              </div>
            </Link>
          )}
          {newContacts > 0 && (
            <Link to="/admin/contact">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 hover:bg-amber-100 transition-colors">
                <Mail size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-amber-900">
                    {newContacts} new contact {newContacts === 1 ? "submission" : "submissions"}
                  </p>
                  <p className="text-sm text-amber-700">Review messages from your contact form</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-dark">Recent Orders</h2>
        </div>
        {ordersLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Order #</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Customer</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Total</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-brand-dark">{order.orderNumber}</td>
                  <td className="px-5 py-3 text-gray-600">{order.guestEmail ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold">${(order.total / 100).toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      order.status === "delivered" ? "bg-green-100 text-green-700" :
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                      order.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
