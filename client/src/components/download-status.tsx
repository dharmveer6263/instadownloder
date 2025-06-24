import { CheckCircle, AlertCircle, Loader2, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DownloadStatusProps {
  isDownloading: boolean;
  progress: number;
  isComplete: boolean;
  error?: string | null;
  fileName?: string;
}

export default function DownloadStatus({ 
  isDownloading, 
  progress, 
  isComplete, 
  error, 
  fileName = "file" 
}: DownloadStatusProps) {
  if (!isDownloading && !isComplete && !error) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-center space-x-3">
        {isDownloading && (
          <>
            <Loader2 className="animate-spin text-blue-500" size={20} />
            <span className="font-medium text-gray-900">Downloading {fileName}...</span>
          </>
        )}
        
        {isComplete && (
          <>
            <CheckCircle className="text-green-500" size={20} />
            <span className="font-medium text-green-900">Download Complete!</span>
          </>
        )}
        
        {error && (
          <>
            <AlertCircle className="text-red-500" size={20} />
            <span className="font-medium text-red-900">Download Failed</span>
          </>
        )}
      </div>

      {isDownloading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Downloading...</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {isComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800 text-sm">
            {fileName} has been downloaded successfully to your device.
          </p>
        </div>
      )}
    </div>
  );
}