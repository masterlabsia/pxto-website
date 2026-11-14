import { z } from "zod";

/**
 * Server environment, parsed once at module load (CLAUDE.md 14.2).
 *
 * Imported by the Server Action, which is part of the production build, so a
 * malformed value fails `next build` rather than a visitor's submission.
 *
 * The Upstash pair is optional too: without it the rate limit is skipped.
 *
 * Both Notion variables are optional on purpose: a build without them must
 * still succeed (previews, local dev), and `submitContact` reports "not
 * configured" instead of faking success when either is missing. Production is
 * checked by the deploy checklist, not by this schema.
 */
const ServerEnvSchema = z.object({
  NOTION_API_KEY: z.string().trim().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().trim().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1).optional(),
  NOTION_DATABASE_ID: z
    .string()
    .trim()
    .regex(/^[0-9a-f]{32}$|^[0-9a-f-]{36}$/i, "Expected a Notion database id")
    .optional(),
});

export const serverEnv = ServerEnvSchema.parse({
  NOTION_API_KEY: process.env.NOTION_API_KEY || undefined,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID || undefined,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || undefined,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || undefined,
});
