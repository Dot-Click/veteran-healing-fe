export type AppUserRole =
  | "admin"
  | "manager"
  | "support"
  | "content_editor"
  | "finance"
  | "customer"
  | "affiliate";

const ADMIN_ROLES: AppUserRole[] = ["admin", "manager", "support", "content_editor", "finance"];

export function isAdminRole(role?: string | null) {
  return ADMIN_ROLES.includes(role as AppUserRole);
}

export function getDashboardPath(role?: string | null) {
  return isAdminRole(role) ? "/admin" : "/dashboard";
}
