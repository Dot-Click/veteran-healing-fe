import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

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
const AdminDonationsPage = lazy(() => import("../pages/AdminDonationsPage"));
const AdminAffiliatesPage = lazy(() => import("../pages/AdminAffiliatesPage"));
const AdminContactPage = lazy(() => import("../pages/AdminContactPage"));
const AdminSettingsPage = lazy(() => import("../pages/AdminSettingsPage"));
const AdminGuidePage = lazy(() => import("../pages/AdminGuidePage"));
const AdminNotificationsPage = lazy(() => import("../pages/AdminNotificationsPage"));
const NotificationPage = lazy(() => import("../pages/NotificationPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const UserDashboardPage = lazy(() => import("../pages/UserDashboardPage"));

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

        {/* Dashboard pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        {/* Admin pages */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requireAdmin>
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDonationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/affiliates"
          element={
            <ProtectedRoute requireAdmin>
              <AdminAffiliatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute requireAdmin>
              <AdminContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requireAdmin>
              <AdminSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/guides"
          element={
            <ProtectedRoute requireAdmin>
              <AdminGuidePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute requireAdmin>
              <AdminNotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
