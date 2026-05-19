import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <section className="min-h-[60vh] flex items-center justify-center bg-brand-cream-light px-4">
        <div className="text-center max-w-md">
          <h1 className="text-7xl font-bold text-brand-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-brand-dark mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
