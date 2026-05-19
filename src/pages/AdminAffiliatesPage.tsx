import AdminLayout from "../components/layout/AdminLayout";

export default function AdminAffiliatesPage() {
  return (
    <AdminLayout title="Affiliates">
      {/* PENDING: Client confirmation needed - commission rates, payout methods, approval criteria */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Affiliate management will be available once backend API is connected (Phase 2).
          <br />
          Commission rate and payout details pending client confirmation.
        </p>
      </div>
    </AdminLayout>
  );
}
