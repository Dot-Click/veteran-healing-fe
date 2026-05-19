// PENDING: Client confirmation needed - real customer reviews
import type { ProductReview } from "../types/product.types";
import { ASSETS } from "../lib/assetPaths";

export const MOCK_REVIEWS: ProductReview[] = [
  {
    id: "r1",
    author: "Austin B.",
    rating: 5,
    body: "I absolutely love the Organic Mushroom Fruit! It's a convenient and delicious way to incorporate mushrooms into my daily routine. Highly recommend!",
    productName: "Organic Mushroom Fruit",
    date: "2024-09-12",
    avatar: ASSETS.REVIEWER_1,
  },
  {
    id: "r2",
    author: "Kevin M.",
    rating: 5,
    body: "I'm so impressed with the Two Week Trust Pack! It's such a great value for the variety of products included. Will be recommending it to friends.",
    productName: "Two Week Trust Pack",
    date: "2024-10-03",
    avatar: ASSETS.REVIEWER_2,
  },
  {
    id: "r3",
    author: "Ethan B.",
    rating: 5,
    body: "I can't believe the difference the Micro Dose Bottle has made in my mood and overall well-being. It's become an essential part of my daily routine.",
    productName: "Microdose Capsules",
    date: "2024-10-18",
    avatar: ASSETS.REVIEWER_3,
  },
  {
    id: "r4",
    author: "Sarah M.",
    rating: 5,
    body: "These capsules have been a lifesaver for my anxiety. The fact that 100% of profits go toward helping veterans is incredible. It's a product I feel proud to recommend to friends.",
    productName: "Organic Mushroom Fruit",
    date: "2024-11-02",
    avatar: ASSETS.REVIEWER_4,
  },
  {
    id: "r5",
    author: "James T.",
    rating: 5,
    body: "I've tried a lot of supplements over the years, but nothing compares to this bundle. My energy levels are up, my mood has improved, and I love that every purchase helps a veteran in need.",
    productName: "Two Week Trust Pack",
    date: "2024-11-15",
    avatar: ASSETS.REVIEWER_5,
  },
  {
    id: "r6",
    author: "Rebecca L.",
    rating: 5,
    body: "This tea has become part of my nightly ritual. It helps me unwind after stressful days, and I sleep more peacefully. Supporting veterans while improving my own health feels amazing.",
    productName: "Micro Dose Bottle",
    date: "2024-12-01",
    avatar: ASSETS.REVIEWER_6,
  },
];

export const MOCK_VETERAN_STORIES = [
  {
    id: "s1",
    name: "Jack",
    branch: "U.S. Airforce Veteran",
    story:
      "Jack is a United States Air Force veteran who served in the missile munitions career field, supporting mission critical weapons systems. He also took part in Operation Faithful Patrol, contributing to large-scale national security and humanitarian support efforts. After completing his enlistment, Jack dedicated himself to veteran mental health and holistic healing. He founded Veteran Healing, a nonprofit and online community focused on supporting veterans through community, purpose, and alternative healing practices.",
    image: ASSETS.STORY_JACK,
  },
  {
    id: "s2",
    name: "Keanu",
    branch: "U.S. Army Veteran",
    story:
      "Keanu enlisted in the U.S. Army as a 19K M1 Armor Crewman, beginning his career in mechanized warfare before expanding into advanced technical arenas. He trained on FireTec systems, multiple PackBot platforms, and completed the Army's Combat Lifesaver (CLS) program. Ahead of the Surge in Afghanistan, Keanu was selected for the Army's first Pashto language training program, preparing him for deployment to the Afghanistan River Valley. During his deployment, he served primarily as a minesweeper, clearing routes and protecting his unit while also conducting ongoing counterinsurgency operations throughout the area.",
    image: ASSETS.STORY_KEANU,
  },
  {
    id: "s3",
    name: "Elijah",
    branch: "U.S. Marine Veteran",
    story:
      "Elijah served four years in the United States Marine Corps as an Airborne Mortarman, a role that placed him at the center of fast-moving infantry operations. His deployments across the Middle East exposed him to the realities of combat, the weight of responsibility, and the tight bonds formed between Marines operating in high-stress environments. Throughout his service, Elijah witnessed the profound toll that PTSD and long-term operational stress took on his fellow Marines — both during deployment and after returning home. Seeing friends struggle in silence lit a fire in him to be part of the solution. After leaving the military, Elijah dedicated himself to supporting veteran wellness.",
    image: ASSETS.STORY_ELIJAH,
  },
];
