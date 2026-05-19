import AdminLayout from "../components/layout/AdminLayout";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { formatPriceDollars } from "../lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Products">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">{MOCK_PRODUCTS.length} products</p>
        <button className="btn-primary text-sm py-2 px-4">
          <Plus size={14} /> Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Product</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Price</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-brand-dark">{p.name}</td>
                <td className="px-5 py-3 text-gray-500 capitalize">{p.category}</td>
                <td className="px-5 py-3">{formatPriceDollars(p.price)} $</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 justify-end">
                    <button className="text-brand-cta hover:text-brand-primary" aria-label="Edit"><Pencil size={14} /></button>
                    <button className="text-red-400 hover:text-red-600" aria-label="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
