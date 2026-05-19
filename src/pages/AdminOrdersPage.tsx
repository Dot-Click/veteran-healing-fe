import AdminLayout from "../components/layout/AdminLayout";

export default function AdminOrdersPage() {
  return (
    <AdminLayout title="Orders">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Orders will appear here once connected to the backend API (Phase 2).
        </p>
      </div>
    </AdminLayout>
  );
}
