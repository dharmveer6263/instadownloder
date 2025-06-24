import { Settings, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function AppSettings() {
  const { toast } = useToast();

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/downloads/clear', {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to clear history');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "History Cleared",
        description: "All download history has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear download history.",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
      
      {/* App Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Info className="text-blue-500 mr-3" size={20} />
          <h3 className="text-lg font-medium text-gray-900">About</h3>
        </div>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            <strong>InstaDownloader</strong> currently creates demonstration files to showcase
            the download functionality and user interface.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 font-medium mb-2">⚠️ Important Note:</p>
            <p className="text-yellow-700 text-xs">
              To download actual Instagram content, this would require:
              <br />• Instagram's official API access
              <br />• Proper authentication and permissions
              <br />• Compliance with Instagram's terms of service
            </p>
          </div>
          <p className="text-xs text-gray-500">
            This demo shows the complete user interface and file handling workflow
            that would work with real Instagram content when properly integrated.
          </p>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Settings className="text-gray-500 mr-3" size={20} />
          <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Clear Download History</p>
              <p className="text-sm text-gray-500">Remove all download records from the database</p>
            </div>
            <Button
              onClick={() => clearHistoryMutation.mutate()}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-2"
              disabled={clearHistoryMutation.isPending}
            >
              <Trash2 size={14} />
              <span>{clearHistoryMutation.isPending ? "Clearing..." : "Clear"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-3">Usage Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• For Stories: Enter the Instagram username without the @ symbol</li>
          <li>• For Reels: Copy and paste the complete Instagram Reel URL</li>
          <li>• Downloads are processed in the background and may take a few seconds</li>
          <li>• Your download history is saved for easy access to previous downloads</li>
        </ul>
      </div>
    </div>
  );
}