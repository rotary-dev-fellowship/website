// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { getCountryCodes } from '@/utils/countries';

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  contents: z.array(z.string()),
  author: z.string(),
  role: z.string().optional(),
  authorImage: image(),
  authorImageAlt: z.string(),
  pubDate: z.date(),
  cardImage: image(),
  cardImageAlt: z.string(),
  readTime: z.number(),
  tags: z.array(z.string()).optional(),
  }),
});

// RotaryDEV Fellowship Members
const membersCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object ({
    // Personal Info
    name: z.string(),
    image: image(),
    languages: z.array(z.string()).optional(),

    // Professional Info
    jobTitle: z.string(),
    bio: z.string(),
    technologies: z.array(z.string()).optional(),
    openForWork: z.boolean().default(false),
    openForMentorship: z.boolean().default(false),

    // Contact Info
    social: z.object({
      github: z.string().optional(),
      linkedIn: z.string().optional(),
      twitter: z.string().optional(),
      website: z.string().optional(),
    }).optional(),

    // Rotary Info
    rotaryClub: z.object({
      name: z.string(),
      type: z.enum(['Rotaract', 'Rotary']),
      city: z.string(),
      country: z.enum(['', ...getCountryCodes()]),
      districtNumber: z.number(),
    }),

    // Membership Info
    dateJoined: z.date().default(new Date()),
    role: z.enum(['member', 'admin']).default('member'),
    active: z.boolean().default(true),
  }),
});

export const collections = {
  members: membersCollection,
  docs: defineCollection({ schema: docsSchema() }),
  'blog': blogCollection,
};