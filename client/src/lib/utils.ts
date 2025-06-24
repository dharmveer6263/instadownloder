import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidInstagramUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'www.instagram.com' || parsedUrl.hostname === 'instagram.com';
  } catch {
    return false;
  }
}

export function extractUsernameFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    
    if (pathParts.length > 0 && pathParts[0] !== 'reel' && pathParts[0] !== 'p') {
      return pathParts[0];
    }
    
    return null;
  } catch {
    return null;
  }
}
