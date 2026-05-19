import AdminLayout from "../components/layout/AdminLayout";

export default function AdminDonationsPage() {
  return (
    <AdminLayout title="Donations">
      {/* PENDING: Client confirmation needed - 1-to-1 donation model, tracking requirements */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Donation tracking will appear here once connected to backend API (Phase 2).
          <br />
          Note: "1-to-1 donation" model details pending client confirmation.
        </p>
      </div>
    </AdminLayout>
  );
}
