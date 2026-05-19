import { type ReactNode } from "react";
import AdminNav from "../admin/AdminNav";
import TopBar from "./TopBar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <AdminNav />
        <main className="flex-1 bg-gray-50 p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-brand-dark mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
