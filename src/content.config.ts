import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const works = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    order: z.number(),
  }),
});

export const collections = { works };
