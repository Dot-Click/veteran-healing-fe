export const BRAND_COLORS = {
  primary: "#113B2C",
  cta: "#0F402F",
  secondary: "#24533E",
  accent: "#3B6E56",
  cream: "#F5F5DC",
  creamLight: "#FCFCF1",
  white: "#FFFFFF",
  border: "#769183",
  dark: "#112516",
  gold: "#F5A623",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Sacraments", href: "/shop" },
  { label: "Donation", href: "/donation" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Statement of Faith", href: "/statement-of-faith" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const TOP_BAR_ITEMS = [
  "Free Shipping On All Orders",
  "Veteran-Founded",
  "Grown In-House",
  "No Third Parties",
  "Call us at (774) 505-0789",
  "Est. 2021",
] as const;

// PENDING: Client confirmation needed - free shipping threshold
export const FREE_SHIPPING_THRESHOLD = 50;

// PENDING: Client confirmation needed - affiliate commission rate
export const DEFAULT_AFFILIATE_COMMISSION = 0.10;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/VeteranHealing",
  instagram: "https://www.instagram.com/veteranhealing_",
} as const;

export const COMMUNITY_LINKS = {
  facebookGroup: import.meta.env.VITE_FACEBOOK_GROUP_URL || "https://www.facebook.com/groups/3074328406129022/",
} as const;

export const CONTACT_INFO = {
  phone: "(774) 505-0789",
  email: "support@veteranhealing.org",
} as const;

export const SITE_NAME = "Veteran Healing";
export const SITE_TAGLINE = "By Vets - For Vets";
