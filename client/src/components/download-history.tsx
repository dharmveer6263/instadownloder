import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Calendar, AlertCircle, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import Advertisement from "./advertisement";
import type { Download as DownloadType } from "@shared/schema";

export default function DownloadHistory() {
  const queryClient = useQueryClient();
  
  const { data: downloads, isLoading } = useQuery({
    queryKey: ['/api/downloads/history'],
    refetchInterval: 2000,
    staleTime: 0,
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/downloads/clear");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/downloads/history'] });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'failed':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'processing':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'processing':
        return 'Processing';
      default:
        return 'Pending';
    }
  };

  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!downloads || downloads.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
        <p className="text-gray-500">Your download history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Download History</h2>
        {downloads && downloads.length > 0 && (
          <Button
            onClick={() => clearHistoryMutation.mutate()}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            disabled={clearHistoryMutation.isPending}
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </Button>
        )}
      </div>
      
      {downloads?.map((download, index) => (
        <div key={download.id}>
          <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon(download.status)}
                <span className="text-sm font-medium text-gray-600">
                  {getStatusText(download.status)}
                </span>
                <span className="text-xs text-gray-400">
                  {download.type === 'story' ? 'Story' : 'Reel'}
                </span>
              </div>
              
              <div className="text-sm text-gray-900 mb-1">
                {download.type === 'story' && download.username && (
                  <span>@{download.username}</span>
                )}
                {download.type === 'reel' && download.url && (
                  <span className="break-all">{download.url}</span>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {new Date(download.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            
            {download.status === 'completed' && download.downloadUrl && (
              <Button
                onClick={() => handleDownload(download.downloadUrl!)}
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Download size={14} className="mr-1" />
                Download
              </Button>
            )}
            
            {download.status === 'failed' && download.error && (
              <div className="text-xs text-red-600 max-w-32">
                {download.error}
              </div>
            )}
          </div>
          </div>
          
          {/* Insert banner ad every 3 download items */}
          {(index + 1) % 3 === 0 && (
            <Advertisement type="banner" className="mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}