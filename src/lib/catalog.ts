import cheesecakeImg from "@/assets/cheesecake-hero.png.asset.json";
import blueberryImg from "@/assets/blueberry-hero.png.asset.json";
import bubblegumImg from "@/assets/bubblegum.png.asset.json";
import productsHero from "@/assets/products-hero.png.asset.json";

export interface CatalogProduct {
  /** stable slug used as the profile key + cart key */
  id: string;
  title: string;
  /** member contribution in ZAR */
  price: number;
  images: string[];
  blurb: string;
}

/**
 * Static allocation catalogue — no storefront API, images ship with the site.
 */
export const CATALOG: CatalogProduct[] = [
  {
    id: "cheesecake",
    title: "Cheesecake",
    price: 350,
    images: [cheesecakeImg.url, productsHero.url],
    blurb: "Sweet cream, warm vanilla and a citrus lift. The daytime allocation.",
  },
  {
    id: "blueberry",
    title: "Blueberry",
    price: 350,
    images: [blueberryImg.url, productsHero.url],
    blurb: "Ripe berry compote with a soft floral finish. Built for the wind-down.",
  },
  {
    id: "bubblegum",
    title: "Bubblegum",
    price: 350,
    images: [bubblegumImg.url, productsHero.url],
    blurb: "Nostalgic pink bubblegum and candied berry. Balanced, playful, loud.",
  },
];

export const COURIER_FEE = 99;
export const WHATSAPP_NUMBER = "27680200749";

export const MEMBERSHIP_TIERS = [
  {
    id: "standard",
    name: "Standard Member",
    price: 99,
    perks: [
      "Access to monthly yield allocations",
      "Member pricing on every share",
      "Community drops & event invites",
    ],
  },
  {
    id: "premium",
    name: "Premium Member",
    price: 149,
    perks: [
      "Everything in Standard",
      "Priority allocation on capped drops",
      "Premium member card + launch guest pass",
      "Dedicated WhatsApp concierge",
    ],
  },
] as const;

export type TierId = (typeof MEMBERSHIP_TIERS)[number]["id"];
