export const ADMIN_NAV_NOTIFICATION_TYPES: Record<string, string[]> = {
  "/admin/orders": ["order_placed"],
  "/admin/donations": ["donation_received"],
  "/admin/affiliates": ["affiliate_applied"],
  "/admin/reviews": ["review_submitted"],
  "/admin/contact": ["contact_submitted"],
};

export function getUnreadCountForAdminNav(
  notifications: Array<{ type: string; read: boolean }>,
  href: string
): number {
  const types = ADMIN_NAV_NOTIFICATION_TYPES[href];
  if (!types) return 0;
  return notifications.filter((n) => !n.read && types.includes(n.type)).length;
}

export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  affiliate_approved: "Affiliate Approved",
  affiliate_rejected: "Affiliate Rejected",
  affiliate_suspended: "Affiliate Suspended",
  affiliate_applied: "New Affiliate Application",
  contact_reviewed: "Contact Update",
  contact_submitted: "New Contact Message",
  order_status_update: "Order Update",
  order_placed: "New Order",
  review_approved: "Review Approved",
  review_submitted: "New Review",
  donation_received: "New Donation",
  donation_status_update: "Donation Update",
};

export function getNotificationTypeLabel(type: string): string {
  return NOTIFICATION_TYPE_LABELS[type] ?? type.replace(/_/g, " ");
}

export function getNotificationColorClass(type: string): string {
  switch (type) {
    case "affiliate_approved":
    case "review_approved":
      return "bg-green-50 border-green-200";
    case "affiliate_rejected":
    case "affiliate_suspended":
      return "bg-red-50 border-red-200";
    case "contact_reviewed":
    case "contact_submitted":
      return "bg-blue-50 border-blue-200";
    case "order_status_update":
    case "order_placed":
      return "bg-purple-50 border-purple-200";
    case "review_submitted":
      return "bg-yellow-50 border-yellow-200";
    case "donation_received":
    case "donation_status_update":
      return "bg-amber-50 border-amber-200";
    case "affiliate_applied":
      return "bg-teal-50 border-teal-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}
