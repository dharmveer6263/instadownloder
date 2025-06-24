import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { storyDownloadSchema, reelDownloadSchema } from "@shared/schema";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Download Instagram Stories
  app.post("/api/download/stories", async (req, res) => {
    try {
      const { username } = storyDownloadSchema.parse(req.body);
      
      const download = await storage.createDownload({
        type: 'story',
        username,
        url: null,
      });

      // Update status to processing
      await storage.updateDownload(download.id, { status: 'processing' });

      // Simulate processing delay
      setTimeout(async () => {
        try {
          // Create a demo video file for demonstration
          const fileName = `story_${username}_${Date.now()}.mp4`;
          const filePath = path.join(process.cwd(), 'downloads', fileName);
          
          // Ensure downloads directory exists
          const downloadsDir = path.join(process.cwd(), 'downloads');
          if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
          }
          
          // Create a simple demo file with metadata
          const demoContent = `Demo Instagram Story download for user: ${username}\nDownloaded at: ${new Date().toISOString()}\nThis is a demonstration file showing the download functionality.`;
          fs.writeFileSync(filePath, demoContent);
          
          const downloadUrl = `/api/download/${download.id}/file`;
          await storage.updateDownload(download.id, { 
            status: 'completed',
            downloadUrl 
          });
        } catch (error) {
          await storage.updateDownload(download.id, { 
            status: 'failed',
            error: 'Failed to download stories' 
          });
        }
      }, 3000);

      res.json({ success: true, downloadId: download.id });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid request' 
      });
    }
  });

  // Download Instagram Reel
  app.post("/api/download/reels", async (req, res) => {
    try {
      const { url } = reelDownloadSchema.parse(req.body);
      
      const download = await storage.createDownload({
        type: 'reel',
        username: null,
        url,
      });

      // Update status to processing
      await storage.updateDownload(download.id, { status: 'processing' });

      // Simulate processing delay
      setTimeout(async () => {
        try {
          // Create a demo video file for demonstration
          const fileName = `reel_${Date.now()}.mp4`;
          const filePath = path.join(process.cwd(), 'downloads', fileName);
          
          // Ensure downloads directory exists
          const downloadsDir = path.join(process.cwd(), 'downloads');
          if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
          }
          
          // Create a simple demo file with metadata
          const demoContent = `Demo Instagram Reel download\nOriginal URL: ${url}\nDownloaded at: ${new Date().toISOString()}\nThis is a demonstration file showing the download functionality.`;
          fs.writeFileSync(filePath, demoContent);
          
          const downloadUrl = `/api/download/${download.id}/file`;
          await storage.updateDownload(download.id, { 
            status: 'completed',
            downloadUrl 
          });
        } catch (error) {
          await storage.updateDownload(download.id, { 
            status: 'failed',
            error: 'Failed to download reel' 
          });
        }
      }, 3000);

      res.json({ success: true, downloadId: download.id });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid request' 
      });
    }
  });

  // APK download endpoint (specific route before generic patterns)
  app.get("/api/download/apk", (req, res) => {
    try {
      const apkPath = path.join(process.cwd(), 'downloads', 'insta-downloader.apk');
      console.log('APK download requested, path:', apkPath);
      
      if (fs.existsSync(apkPath)) {
        const stats = fs.statSync(apkPath);
        console.log('APK file found, size:', stats.size, 'bytes');
        
        // Set comprehensive headers for download
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', 'attachment; filename="InstaDownloader.apk"');
        res.setHeader('Content-Length', stats.size.toString());
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        // Create read stream and pipe to response
        const fileStream = fs.createReadStream(apkPath);
        fileStream.on('error', (err) => {
          console.error('File stream error:', err);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to read APK file' });
          }
        });
        
        fileStream.pipe(res);
        console.log('APK file stream started');
        
      } else {
        console.log('APK file not found at:', apkPath);
        res.status(404).json({ error: 'APK file not found' });
      }
    } catch (error) {
      console.error('Error in APK download endpoint:', error);
      res.status(500).json({ error: 'Failed to download APK' });
    }
  });

  // Get download status
  app.get("/api/download/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const download = await storage.getDownload(id);
      
      if (!download) {
        return res.status(404).json({ error: 'Download not found' });
      }

      res.json(download);
    } catch (error) {
      res.status(400).json({ error: 'Invalid download ID' });
    }
  });

  // Download file endpoint
  app.get("/api/download/:id/file", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const download = await storage.getDownload(id);
      
      if (!download) {
        return res.status(404).json({ error: 'Download not found' });
      }

      if (download.status !== 'completed') {
        return res.status(400).json({ error: 'Download not ready' });
      }

      // Find the file based on download record
      const downloadsDir = path.join(process.cwd(), 'downloads');
      const files = fs.readdirSync(downloadsDir);
      
      let fileName = '';
      if (download.type === 'story' && download.username) {
        fileName = files.find(f => f.includes(`story_${download.username}`)) || '';
      } else if (download.type === 'reel') {
        fileName = files.find(f => f.includes('reel_') && f.includes(download.id.toString())) || 
                  files.find(f => f.includes('reel_')) || '';
      }

      if (!fileName) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(downloadsDir, fileName);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }

      // Set appropriate headers for file download
      const fileExtension = path.extname(fileName);
      const contentType = fileExtension === '.mp4' ? 'video/mp4' : 'text/plain';
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
    } catch (error) {
      res.status(500).json({ error: 'Failed to download file' });
    }
  });

  // Get download history
  app.get("/api/downloads/history", async (req, res) => {
    try {
      const allDownloads = await storage.getAllDownloads();
      const sortedDownloads = allDownloads
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      res.json(sortedDownloads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch download history' });
    }
  });

  // Clear download history
  app.delete("/api/downloads/clear", async (req, res) => {
    try {
      await storage.clearAllDownloads();
      res.json({ success: true, message: 'History cleared' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to clear history' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
