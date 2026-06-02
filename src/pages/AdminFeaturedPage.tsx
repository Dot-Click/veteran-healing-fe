import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowDown,
  ArrowUp,
  Share2,
  LayoutGrid,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import AdminLayout from "../components/layout/AdminLayout";
import ContentAreaLoader from "../components/common/ContentAreaLoader";
import { useProducts } from "../hooks/useProducts";
import {
  useAdminFeaturedProducts,
  useCreateFeaturedProduct,
  useDeleteFeaturedProduct,
  useReorderFeaturedProducts,
  useUpdateFeaturedProduct,
} from "../hooks/useFeaturedProducts";
import type { FeaturedPlacement, FeaturedSection } from "../types/featuredProduct.types";
import { formatPriceDollars } from "../lib/utils";

const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/veteranhealing";

const SECTION_META: Record<
  FeaturedSection,
  { label: string; description: string; maxItems?: number }
> = {
  homepage: {
    label: "Homepage Featured Grid",
    description: "Products shown in the featured sacraments section on the homepage.",
  },
  social: {
    label: "Instagram / Social Feed",
    description: "Product images shown in the Follow Us on Instagram grid (up to 5 recommended).",
    maxItems: 5,
  },
};

function sortPlacements(items: FeaturedPlacement[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export default function AdminFeaturedPage() {
  const { data: placements = [], isLoading } = useAdminFeaturedProducts();
  const { data: products = [] } = useProducts();
  const createFeatured = useCreateFeaturedProduct();
  const updateFeatured = useUpdateFeaturedProduct();
  const deleteFeatured = useDeleteFeaturedProduct();
  const reorderFeatured = useReorderFeaturedProducts();

  const [activeSection, setActiveSection] = useState<FeaturedSection>("homepage");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [linkUrl, setLinkUrl] = useState(DEFAULT_INSTAGRAM_URL);

  const sectionPlacements = useMemo(
    () => sortPlacements(placements.filter((p) => p.section === activeSection)),
    [placements, activeSection],
  );

  const availableProducts = useMemo(() => {
    const usedIds = new Set(sectionPlacements.map((p) => p.productId));
    return products.filter((p) => !usedIds.has(p.id));
  }, [products, sectionPlacements]);

  const handleAdd = async () => {
    if (!selectedProductId) {
      toast.error("Select a product to feature.");
      return;
    }

    const meta = SECTION_META[activeSection];
    if (meta.maxItems && sectionPlacements.length >= meta.maxItems) {
      toast.error(`Maximum ${meta.maxItems} items allowed for this section.`);
      return;
    }

    try {
      await createFeatured.mutateAsync({
        productId: selectedProductId,
        section: activeSection,
        sortOrder: sectionPlacements.length,
        linkUrl: activeSection === "social" ? linkUrl : undefined,
      });
      setSelectedProductId("");
      toast.success("Featured product added.");
    } catch {
      toast.error("Could not add featured product.");
    }
  };

  const handleMove = async (placement: FeaturedPlacement, direction: "up" | "down") => {
    if (placement.id.startsWith("legacy-")) {
      toast.error("Re-seed or re-add placements to enable reordering.");
      return;
    }

    const index = sectionPlacements.findIndex((p) => p.id === placement.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sectionPlacements.length) return;

    const reordered = [...sectionPlacements];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];

    try {
      await reorderFeatured.mutateAsync(
        reordered.map((item, sortOrder) => ({ id: item.id, sortOrder })),
      );
    } catch {
      toast.error("Could not reorder items.");
    }
  };

  const handleRemove = async (id: string) => {
    if (id.startsWith("legacy-")) {
      toast.error("Legacy items cannot be removed here. Run db:push and seed, or toggle featured on the product.");
      return;
    }
    if (!confirm("Remove this product from the featured section?")) return;
    try {
      await deleteFeatured.mutateAsync(id);
      toast.success("Removed from featured section.");
    } catch {
      toast.error("Could not remove featured product.");
    }
  };

  const handleLinkSave = async (placement: FeaturedPlacement, url: string) => {
    if (placement.id.startsWith("legacy-")) return;
    try {
      await updateFeatured.mutateAsync({
        id: placement.id,
        data: { linkUrl: url.trim() || null },
      });
      toast.success("Link updated.");
    } catch {
      toast.error("Could not update link.");
    }
  };

  return (
    <AdminLayout title="Featured Products">
      <div className="mb-6 rounded-xl border border-brand-primary/20 bg-brand-cream/40 p-5">
        <div className="flex items-start gap-3">
          <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cta" />
          <div>
            <h2 className="font-semibold text-brand-dark">Homepage merchandising</h2>
            <p className="mt-1 text-sm text-gray-600">
              Control which products appear in the homepage featured grid and the Instagram-style
              social feed. Changes are live immediately on the public site.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(SECTION_META) as FeaturedSection[]).map((section) => {
          const Icon = section === "homepage" ? LayoutGrid : Share2;
          const count = placements.filter((p) => p.section === section).length;
          return (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                activeSection === section
                  ? "bg-brand-primary text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              {SECTION_META[section].label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeSection === section ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-semibold text-brand-dark">
          Add to {SECTION_META[activeSection].label}
        </h3>
        <p className="mb-4 text-sm text-gray-500">{SECTION_META[activeSection].description}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Product
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none"
            >
              <option value="">Select a product…</option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {formatPriceDollars(p.price)}
                </option>
              ))}
            </select>
          </div>

          {activeSection === "social" && (
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Tile link (optional)
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder={DEFAULT_INSTAGRAM_URL}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={createFeatured.isPending || !selectedProductId}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary disabled:opacity-50"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="font-semibold text-brand-dark">
            Current {SECTION_META[activeSection].label}
          </h3>
        </div>

        {isLoading ? (
          <ContentAreaLoader variant="skeleton-rows" count={4} className="p-6" />
        ) : sectionPlacements.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">
            No products in this section yet. Add one above.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {sectionPlacements.map((placement, index) => (
              <li
                key={placement.id}
                className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center"
              >
                <img
                  src={placement.product.images[0]}
                  alt={placement.product.name}
                  className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-dark">{placement.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatPriceDollars(placement.product.price)} · Order {placement.sortOrder + 1}
                  </p>
                  {activeSection === "social" && !placement.id.startsWith("legacy-") && (
                    <input
                      type="url"
                      defaultValue={placement.linkUrl ?? DEFAULT_INSTAGRAM_URL}
                      onBlur={(e) => handleLinkSave(placement, e.target.value)}
                      className="mt-2 w-full max-w-md rounded border border-gray-200 px-2 py-1 text-xs focus:border-brand-primary focus:outline-none"
                      placeholder="Instagram or product link"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(placement, "up")}
                    disabled={index === 0 || reorderFeatured.isPending}
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    aria-label="Move up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(placement, "down")}
                    disabled={
                      index === sectionPlacements.length - 1 || reorderFeatured.isPending
                    }
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    aria-label="Move down"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(placement.id)}
                    disabled={deleteFeatured.isPending}
                    className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
