import { downloads, type Download, type InsertDownload } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDownload(id: number): Promise<Download | undefined>;
  createDownload(download: InsertDownload): Promise<Download>;
  updateDownload(id: number, updates: Partial<Download>): Promise<Download | undefined>;
  getDownloadsByType(type: string): Promise<Download[]>;
  getAllDownloads(): Promise<Download[]>;
  clearAllDownloads(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getDownload(id: number): Promise<Download | undefined> {
    const [download] = await db.select().from(downloads).where(eq(downloads.id, id));
    return download || undefined;
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const [download] = await db
      .insert(downloads)
      .values(insertDownload)
      .returning();
    return download;
  }

  async updateDownload(id: number, updates: Partial<Download>): Promise<Download | undefined> {
    const [download] = await db
      .update(downloads)
      .set(updates)
      .where(eq(downloads.id, id))
      .returning();
    return download || undefined;
  }

  async getDownloadsByType(type: string): Promise<Download[]> {
    return await db.select().from(downloads).where(eq(downloads.type, type));
  }

  async getAllDownloads(): Promise<Download[]> {
    return await db.select().from(downloads);
  }

  async clearAllDownloads(): Promise<void> {
    await db.delete(downloads);
  }
}

export const storage = new DatabaseStorage();
