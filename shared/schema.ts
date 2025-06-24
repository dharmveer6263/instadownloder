import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'story' or 'reel'
  username: text("username"),
  url: text("url"),
  status: text("status").notNull().default('pending'), // 'pending', 'processing', 'completed', 'failed'
  downloadUrl: text("download_url"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDownloadSchema = createInsertSchema(downloads).pick({
  type: true,
  username: true,
  url: true,
});

export const storyDownloadSchema = z.object({
  username: z.string().min(1, "Username is required").regex(/^[a-zA-Z0-9._]+$/, "Invalid username format"),
});

export const reelDownloadSchema = z.object({
  url: z.string().url("Invalid URL").regex(/instagram\.com\/reel\//, "Must be an Instagram reel URL"),
});

export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;
export type StoryDownload = z.infer<typeof storyDownloadSchema>;
export type ReelDownload = z.infer<typeof reelDownloadSchema>;
