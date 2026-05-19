// ─── Hero ──────────────────────────────────────────────────────────────────
import hero from "../assets/hero.png";

// ─── Veteran Images ────────────────────────────────────────────────────────
import v01 from "../assets/images/veteran01.webp";
import v02 from "../assets/images/veteran02.webp";
import v03 from "../assets/images/veteran03.webp";
import v04 from "../assets/images/veteran04.jpg";
import v05 from "../assets/images/veteran05.jpg";
import v06 from "../assets/images/veteran06.png";
import v07 from "../assets/images/veteran07.webp";
import v08 from "../assets/images/veteran08.webp";
import v09 from "../assets/images/veteran09.webp";
import v10 from "../assets/images/veteran10.webp";
import v11 from "../assets/images/veteran11.png";
import v17 from "../assets/images/veteran17.png";
import v18 from "../assets/images/veteran18.png";
import v19 from "../assets/images/veteran19.png";
import v20 from "../assets/images/veteran20.jpg";
import v21 from "../assets/images/veteran21.jpg";
import v22 from "../assets/images/veteran22.jpg";
import v23 from "../assets/images/veteran23.jpg";
import v24 from "../assets/images/veteran24.jpg";
import v25 from "../assets/images/veteran25.jpg";
import v26 from "../assets/images/veteran26.jpg";
import v27 from "../assets/images/veteran27.jpg";
import v28 from "../assets/images/veteran28.jpg";
import v29 from "../assets/images/veteran29.jpg";
import v30 from "../assets/images/veteran30.jpg";
import v31 from "../assets/images/veteran31.jpg";
import v32 from "../assets/images/veteran32.jpg";
import v33 from "../assets/images/veteran33.jpg";
import v34 from "../assets/images/veteran34.jpg";
import v35 from "../assets/images/veteran35.png";
import v36 from "../assets/images/veteran36.webp";
import v37 from "../assets/images/veteran37.webp";
import v38 from "../assets/images/veteran38.webp";
import v39 from "../assets/images/veteran39.svg";
import v40 from "../assets/images/veteran40.svg";

// ─── Icons ─────────────────────────────────────────────────────────────────
import iconVeteranAssets from "../assets/icons/veteran assets.svg";
import iconVeteran12 from "../assets/icons/veteran12.svg";
import iconVeteran13 from "../assets/icons/veteran13.svg";

export const ASSETS = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  HERO: hero,

  // ── Section Backgrounds ───────────────────────────────────────────────────
  HERO_BG: v01,         // dark moody veteran photo for hero overlay
  SLIDER_1: v07,    // affiliate hero
  SLIDER_2: v08,         // shop page hero
  SLIDER_3: v09,      // reviews hero
  ABOUT_BG: v02,        // about page hero background mapping
  AFFILIATE_BG: v07,    // affiliate page hero background mapping
  SHOP_BG: v08,         // shop/cart page hero background mapping
  REVIEWS_BG: v09,      // reviews page hero background mapping
  CONTACT_BG: v10,      // contact hero
  HEADER_BG: v02,        // about page hero
  FAITH_BG: v03,        // statement of faith hero
  GUIDE_BG: v11,        // free guide hero

  // ── Content Images ────────────────────────────────────────────────────────
  MISSION_IMAGE: v17,         // mission section in about
  FREE_GUIDE_COVER: hero,     // guide cover (use hero.png — mushroom branding)
  TEAM_1: v20,                // team/story photo 1
  MUSHROOM_PRODUCT: v21,      // product placeholder photo

  // ── Veteran Stories ───────────────────────────────────────────────────────
  STORY_JACK: v23,
  STORY_KEANU: v24,
  STORY_ELIJAH: v25,

  // ── Reviewer Avatars ──────────────────────────────────────────────────────
  REVIEWER_1: v29,  // Austin B.
  REVIEWER_2: v30,  // Kevin M.
  REVIEWER_3: v31,  // Ethan B.
  REVIEWER_4: v32,  // Sarah M.
  REVIEWER_5: v33,  // James T.
  REVIEWER_6: v34,  // Rebecca L.

  // ── Gallery Strip ─────────────────────────────────────────────────────────
  GALLERY: [v04, v26, v27, v28, v29, v30] as string[],

  // ── Product Images (placeholder until client provides real ones) ──────────
  PRODUCTS: {
    CAPSULES: v28,
    CHOCOLATE: v29,
    MUSHROOM_FRUIT: v30,
    TRUST_PACK: v31,
    TEA: v32,
    SWEATSHIRT: v33,
    HOODIE: v34,
  },

  // ── Additional images ─────────────────────────────────────────────────────
  VETERAN_IMAGES: [v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, v28, v29, v30, v31, v32, v33, v34, v35, v36, v37, v38, v39, v40] as string[],

  // ── Icons ─────────────────────────────────────────────────────────────────
  ICONS: {
    VETERAN_ASSETS: iconVeteranAssets,
    BADGE_CHECK: iconVeteran12,
    SHIELD: iconVeteran13,
  },
} as const;
