import { CheckCircle, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  isVisible: boolean;
  message: string;
  downloadUrl?: string;
  onDownload?: (url: string) => void;
}

export function SuccessMessage({ isVisible, message, downloadUrl, onDownload }: SuccessMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <CheckCircle className="text-white text-sm" size={16} />
          </div>
          <div>
            <p className="font-medium text-green-700">Download Complete!</p>
            <p className="text-sm text-green-600">{message}</p>
          </div>
        </div>
        {downloadUrl && onDownload && (
          <Button 
            onClick={() => onDownload(downloadUrl)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <Download className="mr-1" size={14} />
            Download
          </Button>
        )}
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  isVisible: boolean;
  message: string;
}

export function ErrorMessage({ isVisible, message }: ErrorMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
          <AlertTriangle className="text-white text-sm" size={16} />
        </div>
        <div>
          <p className="font-medium text-red-700">Download Failed</p>
          <p className="text-sm text-red-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
