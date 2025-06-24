interface ProgressIndicatorProps {
  isVisible: boolean;
  progress: number;
  message?: string;
}

export default function ProgressIndicator({ isVisible, progress, message = "Processing..." }: ProgressIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>{message}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
