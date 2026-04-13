import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programme = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programme' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['nl', 'fr']),
    day: z.enum(['friday', 'saturday', 'sunday']),
    startTime: z.string(),
    endTime: z.string().optional(),
    stage: z.string(),
    type: z.enum(['concert', 'film', 'workshop', 'kids', 'dans', 'off-stage']),
    genre: z.string().optional(),
    artist: z.string().optional(),
    description: z.string().optional(),
    embedUrl: z.string().url().optional(),
  }),
});

export const collections = { programme };
