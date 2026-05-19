export type UserRole =
  | "admin"
  | "manager"
  | "support"
  | "content_editor"
  | "finance"
  | "customer"
  | "affiliate";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export interface AffiliateUser extends User {
  role: "affiliate";
  affiliateCode: string;
  // PENDING: Client confirmation needed - commission rate
  commissionRate: number;
  totalEarnings: number;
  pendingPayout: number;
}
