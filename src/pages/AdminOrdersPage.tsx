import AdminLayout from "../components/layout/AdminLayout";
import { useOrders, useUpdateOrderStatus } from "../hooks/useOrders";
import type { BackendOrder } from "../services/orderService";
import toast from "react-hot-toast";

const STATUS_OPTIONS: BackendOrder["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];


export default function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  async function handleStatusChange(id: string, status: BackendOrder["status"]) {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  }
 
  return (
    <AdminLayout title="Orders">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">{orders.length} orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Order #</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Customer</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Total</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Payment</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
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
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-brand-dark font-semibold">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{order.guestEmail ?? "—"}</td>
                  <td className="px-5 py-3 font-semibold text-brand-dark">
                    ${(order.total / 100).toFixed(2)}
                    {order.donationAmount > 0 && (
                      <span className="text-xs text-brand-gold ml-1">(+${(order.donationAmount / 100).toFixed(2)} donation)</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{order.paymentMethod ?? "—"}</td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as BackendOrder["status"])
                      }
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:border-brand-primary outline-none"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
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
