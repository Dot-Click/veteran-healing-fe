export function getUserNotificationCardClass(type: string, isRead: boolean): string {
  const readStyles = isRead ? "opacity-90" : "ring-2 ring-brand-gold/30 shadow-md";

  switch (type) {
    case "affiliate_approved":
    case "review_approved":
      return `bg-gradient-to-r from-brand-cream to-white border border-brand-border/30 border-l-4 border-l-brand-cta ${readStyles}`;
    case "affiliate_rejected":
    case "affiliate_suspended":
      return `bg-gradient-to-r from-red-50 to-white border border-red-200/60 border-l-4 border-l-red-500 ${readStyles}`;
    case "contact_reviewed":
      return `bg-gradient-to-r from-brand-cream-light to-white border border-brand-border/25 border-l-4 border-l-brand-primary ${readStyles}`;
    case "order_status_update":
      return `bg-gradient-to-r from-brand-cream to-brand-cream-light border border-brand-accent/30 border-l-4 border-l-brand-accent ${readStyles}`;
    case "donation_status_update":
      return `bg-gradient-to-r from-amber-50/80 to-white border border-brand-gold/30 border-l-4 border-l-brand-gold ${readStyles}`;
    default:
      return `bg-white border border-brand-border/20 border-l-4 border-l-brand-secondary ${readStyles}`;
  }
}

export function getUserNotificationBadgeClass(type: string): string {
  switch (type) {
    case "affiliate_approved":
    case "review_approved":
      return "bg-brand-cta/10 text-brand-cta";
    case "affiliate_rejected":
    case "affiliate_suspended":
      return "bg-red-100 text-red-700";
    case "contact_reviewed":
      return "bg-brand-primary/10 text-brand-primary";
    case "order_status_update":
      return "bg-brand-accent/15 text-brand-secondary";
    case "donation_status_update":
      return "bg-brand-gold/15 text-amber-800";
    default:
      return "bg-brand-cream text-brand-dark";
  }
}
