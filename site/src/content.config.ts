import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { ZodTypeAny } from 'astro/zod';

// The CMS (Sveltia) saves cleared optional fields as empty strings, which
// would fail .url() and enum validation. Treat '' as "not filled in".
const emptyAsUndefined = <T extends ZodTypeAny>(schema: T) =>
  z.preprocess(v => (v === '' ? undefined : v), schema.optional());

const programme = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programme' }),
  schema: z.object({
    title: z.string(),
    day: z.enum(['friday', 'saturday', 'sunday']),
    startTime: z.string(),
    endTime: emptyAsUndefined(z.string()),
    stage: emptyAsUndefined(z.enum(['dans', 'froefroe', 'tentoonstelling', 'workshop'])),
    type: z.enum(['concert', 'film', 'workshop', 'kids', 'dans', 'off-stage', 'expo', 'theater', 'kermis']),
    curator: emptyAsUndefined(z.string()),
    genre: emptyAsUndefined(z.string()),
    artist: emptyAsUndefined(z.string()),
    description: emptyAsUndefined(z.string()),
    embedUrl: emptyAsUndefined(z.string().url()),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { programme };
