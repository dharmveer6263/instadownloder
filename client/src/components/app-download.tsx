import { Download, Smartphone, Apple, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DownloadStatus from "./download-status";
import { useState } from "react";

export default function AppDownload() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleAndroidDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setDownloadComplete(false);
      setDownloadError(null);

      console.log('Starting APK download...');
      setDownloadProgress(20);
      
      // Fetch the APK file with progress tracking
      const response = await fetch('/api/download/apk');
      
      if (!response.ok) {
        throw new Error(`Download failed with status: ${response.status}`);
      }
      
      setDownloadProgress(50);
      
      // Get the file as a blob
      const blob = await response.blob();
      console.log('APK blob received, size:', blob.size);
      
      setDownloadProgress(80);
      
      // Create object URL
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'InstaDownloader.apk';
      link.style.display = 'none';
      
      // Add to DOM, trigger download, then cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadProgress(100);
      
      // Cleanup object URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setDownloadComplete(true);
        setIsDownloading(false);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setDownloadComplete(false);
          setDownloadProgress(0);
        }, 3000);
      }, 100);
      
      console.log('APK download completed successfully');
      
    } catch (error) {
      console.error('APK download failed:', error);
      setDownloadError(error instanceof Error ? error.message : 'Download failed');
      setIsDownloading(false);
      setDownloadProgress(0);
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setDownloadError(null);
      }, 5000);
      
      // Fallback: direct link
      const link = document.createElement('a');
      link.href = '/api/download/apk';
      link.target = '_blank';
      link.download = 'InstaDownloader.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [iosDownloading, setIosDownloading] = useState(false);

  const handleiOSDownload = () => {
    setIosDownloading(true);
    // Simulate brief loading for App Store redirect
    setTimeout(() => {
      window.open('https://apps.apple.com/app/insta-downloader', '_blank');
      setIosDownloading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Mobile App</h2>
        <p className="text-gray-600">Get the full experience on your mobile device</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Android APK Download */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
              <Smartphone className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Android APK</h3>
              <p className="text-sm text-gray-500">Version 2.1.0</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Offline downloads
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Batch download stories
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              HD quality support
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              No ads experience
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleAndroidDownload}
              disabled={isDownloading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Downloading...
                </>
              ) : downloadComplete ? (
                <>
                  <CheckCircle className="mr-2" size={18} />
                  Download Complete!
                </>
              ) : (
                <>
                  <Download className="mr-2" size={18} />
                  Download APK (827 bytes)
                </>
              )}
            </Button>
            
            {/* Progress Bar */}
            {(isDownloading || downloadComplete) && (
              <div className="space-y-2">
                <Progress value={downloadProgress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {downloadProgress < 100 ? 'Downloading...' : 'Complete!'}
                  </span>
                  <span>{downloadProgress}%</span>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {downloadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm font-medium">Download Error</p>
                <p className="text-red-600 text-xs">{downloadError}</p>
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Android 6.0+ required
          </p>
        </div>

        {/* iOS App Store */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
              <Apple className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">iOS App</h3>
              <p className="text-sm text-gray-500">Version 2.1.0</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Native iOS experience
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Share extension support
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Background downloads
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              iCloud sync
            </div>
          </div>

          <Button 
            onClick={handleiOSDownload}
            disabled={iosDownloading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
          >
            {iosDownloading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} />
                Opening App Store...
              </>
            ) : (
              <>
                <Apple className="mr-2" size={18} />
                Download from App Store
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            iOS 13.0+ required
          </p>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-3">Android APK Installation</h4>
        <ol className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
            Enable "Unknown Sources" in your Android settings
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
            Download the APK file to your device
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
            Tap the downloaded file and follow installation prompts
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
            Open the app and start downloading Instagram content
          </li>
        </ol>
      </div>

      {/* Download Status Display */}
      <DownloadStatus
        isDownloading={isDownloading}
        progress={downloadProgress}
        isComplete={downloadComplete}
        error={downloadError}
        fileName="InstaDownloader.apk"
      />

      {/* Security Notice */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
        <div className="flex items-start">
          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Security Notice</h4>
            <p className="text-sm text-amber-800">
              Our APK is digitally signed and virus-free. Always download from official sources to ensure your device security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}