import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const DonationPage = lazy(() => import("../pages/DonationPage"));
const FreeGuidePage = lazy(() => import("../pages/FreeGuidePage"));
const ReviewsPage = lazy(() => import("../pages/ReviewsPage"));
const AffiliatePage = lazy(() => import("../pages/AffiliatePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const StatementOfFaithPage = lazy(() => import("../pages/StatementOfFaithPage"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const AdminProductsPage = lazy(() => import("../pages/AdminProductsPage"));
const AdminOrdersPage = lazy(() => import("../pages/AdminOrdersPage"));
const AdminCouponsPage = lazy(() => import("../pages/AdminCouponsPage"));
const AdminDonationsPage = lazy(() => import("../pages/AdminDonationsPage"));
const AdminAffiliatesPage = lazy(() => import("../pages/AdminAffiliatesPage"));
const AdminSettingsPage = lazy(() => import("../pages/AdminSettingsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brand-cta border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Customer pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/free-guide" element={<FreeGuidePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/statement-of-faith" element={<StatementOfFaithPage />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/coupons" element={<AdminCouponsPage />} />
        <Route path="/admin/donations" element={<AdminDonationsPage />} />
        <Route path="/admin/affiliates" element={<AdminAffiliatesPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
