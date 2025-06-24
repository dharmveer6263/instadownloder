import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlay, Download, User, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { storyDownloadSchema, type StoryDownload } from "@shared/schema";
import ProgressIndicator from "./progress-indicator";
import { SuccessMessage, ErrorMessage } from "./message-alerts";
import Advertisement from "./advertisement";

export default function StoriesDownloader() {
  const [downloadId, setDownloadId] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<StoryDownload>({
    resolver: zodResolver(storyDownloadSchema),
    defaultValues: {
      username: "",
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (data: StoryDownload) => {
      const response = await apiRequest("POST", "/api/download/stories", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.downloadId) {
        setDownloadId(data.downloadId);
        form.reset();
        toast({
          title: "Download Started",
          description: "Your stories download is being processed.",
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

  const onSubmit = (data: StoryDownload) => {
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
          <div className="w-12 h-12 bg-gradient-purple-pink rounded-full flex items-center justify-center mr-4">
            <CirclePlay className="text-white text-lg" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Download Stories</h2>
            <p className="text-sm text-gray-500">Enter Instagram username</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Instagram username"
                        {...field}
                        className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 pr-12"
                      />
                      <div className="absolute right-4 top-4 text-gray-400">
                        <User size={16} />
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
              className="w-full bg-gradient-primary text-white py-4 rounded-xl font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
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
                  Download Stories
                </>
              )}
            </Button>
          </form>
        </Form>

        {downloadStatus?.status === 'processing' && (
          <ProgressIndicator 
            isVisible={true}
            progress={progress}
            message="Fetching stories..."
          />
        )}
      </div>

      {downloadStatus?.status === 'completed' && downloadStatus.downloadUrl && (
        <SuccessMessage 
          isVisible={true}
          message="Your stories have been processed successfully!"
          downloadUrl={downloadStatus.downloadUrl}
          onDownload={handleDownload}
        />
      )}

      {downloadStatus?.status === 'failed' && (
        <ErrorMessage 
          isVisible={true}
          message={downloadStatus.error || "Failed to download stories. Please try again."}
        />
      )}
    </div>
  );
}
