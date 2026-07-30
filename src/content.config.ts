import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Uncomment and customize the collections this project uses.
// Each collection needs a matching JSON file in src/data/.

// const reviews = defineCollection({
//   loader: file("src/data/reviews.json"),
//   schema: z.object({
//     name: z.string(),
//     stars: z.number(),
//     description: z.string(),
//     isFeatured: z.boolean(),
//   }),
// });

// const faq = defineCollection({
//   loader: file("src/data/faq.json"),
//   schema: z.object({
//     question: z.string(),
//     answer: z.string(),
//     tag: z.string(),
//   }),
// });

export const collections = {
  // reviews,
  // faq,
};
