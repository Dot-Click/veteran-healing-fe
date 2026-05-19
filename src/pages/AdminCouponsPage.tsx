import AdminLayout from "../components/layout/AdminLayout";
import { Plus } from "lucide-react";

export default function AdminCouponsPage() {
  return (
    <AdminLayout title="Coupons">
      <div className="flex justify-end mb-6">
        <button className="btn-primary text-sm py-2 px-4">
          <Plus size={14} /> Create Coupon
        </button>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        {/* PENDING: Client confirmation needed - coupon rules, discount percentages, usage limits */}
        <p className="text-gray-500 text-sm">
          Coupon management will be available once backend API is connected (Phase 2).
        </p>
      </div>
    </AdminLayout>
  );
}
