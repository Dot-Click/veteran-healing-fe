import { useState, useRef } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct } from "../hooks/useProducts";
import { uploadService } from "../services/uploadService";
import { formatPriceDollars } from "../lib/utils";
import { Plus, Pencil, Trash2, Upload, X, Check, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "../types/product.types";

const CATEGORIES = [
  { label: "Capsules", value: "capsules" },
  { label: "Edibles", value: "edibles" },
  { label: "Beverages", value: "beverages" },
  { label: "Bundles", value: "bundles" },
  { label: "Fresh / Dried", value: "fresh-dried" },
  { label: "Apparel", value: "apparel" },
];

type FormData = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  category: string;
  badges: string;
  inStock: boolean;
  featured: boolean;
  imageUrl: string;
};

const emptyForm: FormData = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  price: "",
  category: "capsules",
  badges: "",
  inStock: true,
  featured: false,
  imageUrl: "",
};

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const [mode, setMode] = useState<"idle" | "create" | "edit">("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setMode("create");
  }

  function openEdit(product: Product) {
    setForm({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      price: String(product.price),
      category: product.category,
      badges: product.badges.join(", "),
      inStock: product.inStock,
      featured: product.featured,
      imageUrl: product.images[0] ?? "",
    });
    setEditingId(product.id);
    setMode("edit");
  }

  function closeForm() {
    setMode("idle");
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleNameChange(name: string) {
    setForm((f) => ({
      ...f,
      name,
      slug: mode === "create" ? slugify(name) : f.slug,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadService.uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: result.url }));
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Enter a valid price");
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      shortDescription: form.shortDescription,
      description: form.description || form.shortDescription,
      price,
      category: form.category,
      badges: form.badges.split(",").map((b) => b.trim()).filter(Boolean),
      inStock: form.inStock,
      featured: form.featured,
      images: form.imageUrl ? [form.imageUrl] : [],
    };

    try {
      if (mode === "create") {
        await createProduct.mutateAsync(payload);
        toast.success("Product created");
      } else if (mode === "edit" && editingId) {
        await updateProduct.mutateAsync({ id: editingId, data: payload });
        toast.success("Product updated");
      }
      closeForm();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to save product");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  }

  return (
    <AdminLayout title="Products">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">{products.length} products</p>
        <button onClick={openCreate} className="btn-primary text-sm py-2 px-4">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Create / Edit Form */}
      {mode !== "idle" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-brand-dark">
              {mode === "create" ? "New Product" : "Edit Product"}
            </h3>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name + Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                  Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Microdose Capsules"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                  Slug *
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="microdose-capsules"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none font-mono"
                />
              </div>
            </div>

            {/* Row 2: Price + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                  Price (USD) *
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="29.99"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                Short Description
              </label>
              <input
                value={form.shortDescription}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                placeholder="Brief product summary shown on cards"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                Full Description *
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Full product description (min 10 characters)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none resize-none"
              />
            </div>

            {/* Badges */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                Badges (comma separated)
              </label>
              <input
                value={form.badges}
                onChange={(e) => setForm((f) => ({ ...f, badges: e.target.value }))}
                placeholder="Organic, Lab Tested, Made in USA"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-primary outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                Product Image
              </label>
              <div className="flex items-start gap-4">
                {form.imageUrl ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                      className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-300">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-image-upload"
                  />
                  <label
                    htmlFor="product-image-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border cursor-pointer transition-all ${
                      uploading
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-brand-dark border-gray-200 hover:border-brand-primary hover:text-brand-primary"
                    }`}
                  >
                    <Upload size={14} />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </label>
                  <p className="text-xs text-gray-400 mt-1.5">
                    JPG, PNG, WebP or SVG · Max 10 MB · Uploaded to Cloudinary
                  </p>
                  {form.imageUrl && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Check size={12} /> Image ready
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
                  className="w-4 h-4 accent-brand-primary"
                />
                <span className="text-sm font-medium text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-brand-primary"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending || uploading}
                className="btn-primary text-sm py-2 px-6 disabled:opacity-60"
              >
                {createProduct.isPending || updateProduct.isPending
                  ? "Saving..."
                  : mode === "create"
                  ? "Create Product"
                  : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
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
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-5 py-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                  No products yet. Add your first product above.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <span className="font-medium text-brand-dark">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{p.category}</td>
                  <td className="px-5 py-3">{formatPriceDollars(p.price)} $</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-brand-cta hover:text-brand-primary"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleteProduct.isPending}
                        className="text-red-400 hover:text-red-600 disabled:opacity-40"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
