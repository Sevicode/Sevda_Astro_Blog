import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Your Name"),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    canonical: z.string().url().optional(), // Changed from canonicalURL
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    pubDate: z.date(),
    tech: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
