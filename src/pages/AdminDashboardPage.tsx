import AdminLayout from "../components/layout/AdminLayout";
import { ShoppingBag, DollarSign, Users, Heart } from "lucide-react";

// PENDING: Replace all stats with real API data in Phase 2
const STATS = [
  { icon: ShoppingBag, label: "Total Orders", value: "—", color: "bg-blue-500" },
  { icon: DollarSign, label: "Revenue", value: "—", color: "bg-green-500" },
  { icon: Heart, label: "Donations", value: "—", color: "bg-brand-gold" },
  { icon: Users, label: "Affiliates", value: "—", color: "bg-purple-500" },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center flex-shrink-0`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <p className="text-gray-500 text-sm">
          Admin dashboard — connect to backend API in Phase 2 to populate with real data.
        </p>
      </div>
    </AdminLayout>
  );
}
