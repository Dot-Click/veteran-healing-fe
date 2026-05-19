// PENDING: Client confirmation needed - all product details, images, prices, variants
import type { Product } from "../types/product.types";
import { ASSETS } from "../lib/assetPaths";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "microdose-capsules",
    name: "Microdose Capsules",
    price: 29.99,
    category: "capsules",
    shortDescription: "250mg psilocybin per capsule, 30 count — for daily wellness support.",
    description:
      "Our handcrafted Microdose Capsules contain 250mg of organic psilocybin per capsule. Grown in-house, never outsourced. Designed for veterans seeking natural support for mood, focus, and calm. 30 capsules per bottle (7.5g total). For research, ceremonial, and spiritual purposes only.",
    images: [ASSETS.PRODUCTS.CAPSULES],
    variants: [
      { id: "v1", label: "10 Capsules", value: "10-pack", inStock: true },
      { id: "v2", label: "30 Capsules", value: "30-pack", inStock: true },
    ],
    inStock: true,
    featured: true,
    tags: ["microdose", "capsules", "wellness", "veteran"],
    badges: ["Peace of Mind", "Vegan", "Gluten-Free", "100% Organic"],
    reviews: [],
  },
  {
    id: "2",
    slug: "mushroom-chocolate",
    name: "Premium Mushroom Chocolate",
    price: 19.99,
    category: "edibles",
    shortDescription: "4g organic psilocybin in rich milk chocolate. Veteran-grown, mission-driven.",
    description:
      "Premium Mushroom Chocolate bars with 4g of organic psilocybin per bar. Grown in-house using sustainable practices. Available in milk chocolate. For research, ceremonial, and spiritual purposes only.",
    images: [ASSETS.PRODUCTS.CHOCOLATE],
    variants: [
      { id: "v3", label: "Milk Chocolate", value: "milk-choc", inStock: true },
      { id: "v4", label: "Dark Chocolate", value: "dark-choc", inStock: false },
    ],
    inStock: true,
    featured: true,
    tags: ["chocolate", "edibles", "organic", "veteran"],
    badges: ["Organic", "Handmade", "Made in USA"],
    reviews: [],
  },
  {
    id: "3",
    slug: "organic-mushroom-fruit",
    name: "Organic Mushroom Fruit",
    price: 24.99,
    category: "fresh-dried",
    shortDescription: "Fresh-picked organic mushroom fruit bodies — grown in-house.",
    description:
      "Organically cultivated mushroom fruit bodies grown in our veteran-operated facility. No third parties, no shortcuts. Seasonal availability. For research, educational, and ceremonial use only.",
    images: [ASSETS.PRODUCTS.MUSHROOM_FRUIT],
    variants: [],
    inStock: true,
    featured: false,
    tags: ["organic", "fresh", "mushroom"],
    badges: ["Organic", "Made in USA"],
    reviews: [],
  },
  {
    id: "4",
    slug: "two-week-trust-pack",
    name: "Two Week Trust Pack",
    price: 99.99,
    category: "bundles",
    shortDescription: "Our best-value bundle — everything you need for two weeks of holistic support.",
    description:
      "The Two Week Trust Pack includes a curated selection of our most popular sacraments. Designed to give you a comprehensive, supported experience with veteran guidance. Includes capsules, chocolate, and tea. For research, ceremonial, and spiritual purposes only.",
    images: [ASSETS.PRODUCTS.TRUST_PACK],
    variants: [],
    inStock: true,
    featured: true,
    tags: ["bundle", "value", "veteran", "starter"],
    badges: ["Best Value", "Veteran Favorite"],
    reviews: [],
  },
  {
    id: "5",
    slug: "mushroom-tea",
    name: "Mushroom Tea",
    price: 14.99,
    category: "beverages",
    shortDescription: "Calming, ceremonial mushroom tea blend — loose leaf or tea bags.",
    description:
      "Our ceremonial mushroom tea blend supports relaxation and mindful moments. Grown in-house, handled with care. Available in loose leaf and tea bag format. For research and ceremonial purposes only.",
    images: [ASSETS.PRODUCTS.TEA],
    variants: [
      { id: "v5", label: "Loose Leaf", value: "loose-leaf", inStock: true },
      { id: "v6", label: "Tea Bags", value: "tea-bags", inStock: true },
    ],
    inStock: true,
    featured: false,
    tags: ["tea", "beverage", "relaxation"],
    badges: ["Organic", "Handmade"],
    reviews: [],
  },
  {
    id: "6",
    slug: "veteran-healing-sweatshirt",
    name: "Veteran Healing Sweatshirt",
    price: 60.00,
    category: "apparel",
    shortDescription: "Wear the mission. Forest green or cream — embroidered Veteran Healing logo.",
    description:
      "Show your support for the mission with our premium Veteran Healing sweatshirt. Heavy-weight, embroidered logo on the back. Available in forest green and cream. Includes 3 Veteran Healing sticker coins.",
    images: [ASSETS.PRODUCTS.SWEATSHIRT],
    variants: [
      { id: "v7", label: "Small", value: "S", inStock: true },
      { id: "v8", label: "Medium", value: "M", inStock: true },
      { id: "v9", label: "Large", value: "L", inStock: true },
      { id: "v10", label: "X-Large", value: "XL", inStock: true },
      { id: "v11", label: "2X-Large", value: "2XL", inStock: true },
    ],
    inStock: true,
    featured: true,
    tags: ["apparel", "sweatshirt", "veteran", "mission"],
    badges: ["Made in USA"],
    reviews: [],
  },
  {
    id: "7",
    slug: "mission-hoodie",
    name: "Mission Hoodie",
    price: 54.99,
    category: "apparel",
    shortDescription: "Premium hoodie with veteran testimonial print — all sizes available.",
    description:
      "The Mission Hoodie features our iconic Veteran Healing crest with the 'By Vets-For Vets' motto. Heavyweight fleece, unisex sizing. Every purchase supports veteran wellness programs.",
    images: [ASSETS.PRODUCTS.HOODIE],
    variants: [
      { id: "v12", label: "Small", value: "S", inStock: true },
      { id: "v13", label: "Medium", value: "M", inStock: true },
      { id: "v14", label: "Large", value: "L", inStock: true },
      { id: "v15", label: "X-Large", value: "XL", inStock: true },
    ],
    inStock: true,
    featured: false,
    tags: ["apparel", "hoodie", "veteran", "mission"],
    badges: ["Made in USA"],
    reviews: [],
  },
];

export const FEATURED_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}
