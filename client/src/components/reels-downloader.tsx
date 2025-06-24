import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video, Download, Link, Loader2, PlayCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { reelDownloadSchema, type ReelDownload } from "@shared/schema";
import ProgressIndicator from "./progress-indicator";
import { SuccessMessage, ErrorMessage } from "./message-alerts";
import Advertisement from "./advertisement";

export default function ReelsDownloader() {
  const [downloadId, setDownloadId] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<ReelDownload>({
    resolver: zodResolver(reelDownloadSchema),
    defaultValues: {
      url: "",
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (data: ReelDownload) => {
      const response = await apiRequest("POST", "/api/download/reels", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.downloadId) {
        setDownloadId(data.downloadId);
        form.reset();
        toast({
          title: "Download Started",
          description: "Your reel download is being processed.",
        });
      } else {
        throw new Error("Failed to start download");
      }
    },
    onError: (error) => {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: downloadStatus } = useQuery({
    queryKey: ['/api/download', downloadId],
    enabled: !!downloadId,
    refetchInterval: downloadId ? 1000 : false,
  });

  const onSubmit = (data: ReelDownload) => {
    downloadMutation.mutate(data);
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const progress = downloadStatus?.status === 'processing' ? 75 : 
                  downloadStatus?.status === 'completed' ? 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-red-pink rounded-full flex items-center justify-center mr-4">
            <Video className="text-white text-lg" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Download Reels</h2>
            <p className="text-sm text-gray-500">Paste Instagram Reel link</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Reel URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="url"
                        placeholder="https://www.instagram.com/reel/..."
                        {...field}
                        className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 pr-12"
                      />
                      <div className="absolute right-4 top-4 text-gray-400">
                        <Link size={16} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sidebar ad between input and button */}
            <Advertisement type="sidebar" />

            <Button 
              type="submit" 
              className="w-full bg-gradient-secondary text-white py-4 rounded-xl font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={downloadMutation.isPending}
            >
              {downloadMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2" size={16} />
                  Download Reel
                </>
              )}
            </Button>
          </form>
        </Form>

        {downloadStatus?.status === 'processing' && (
          <ProgressIndicator 
            isVisible={true}
            progress={progress}
            message="Processing reel..."
          />
        )}
      </div>

      {downloadStatus?.status === 'completed' && downloadStatus.downloadUrl && (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="aspect-video bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
            <PlayCircle className="text-4xl text-gray-400" size={64} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Reel Downloaded</p>
              <p className="text-sm text-gray-500">Ready to download</p>
            </div>
            <Button 
              onClick={() => handleDownload(downloadStatus.downloadUrl!)}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              <Download className="mr-2" size={16} />
              Download
            </Button>
          </div>
        </div>
      )}

      {downloadStatus?.status === 'failed' && (
        <ErrorMessage 
          isVisible={true}
          message={downloadStatus.error || "Failed to download reel. Please check the URL and try again."}
        />
      )}
    </div>
  );
}
