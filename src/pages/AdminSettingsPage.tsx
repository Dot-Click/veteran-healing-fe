import AdminLayout from "../components/layout/AdminLayout";

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Payment Processor", note: "PENDING: Client confirmation needed — Stripe, PayPal, or alternative" },
          { title: "Email Service", note: "PENDING: Brevo or SendGrid — configure in Phase 2" },
          { title: "Shipping Rules", note: "PENDING: Client confirmation needed — free shipping threshold" },
          { title: "Admin Roles", note: "PENDING: Role-based access control — configure in Phase 3" },
        ].map((section) => (
          <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-brand-dark mb-2">{section.title}</h3>
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
              {section.note}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
