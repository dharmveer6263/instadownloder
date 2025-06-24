import { HelpCircle } from "lucide-react";

export default function HelpSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <HelpCircle className="text-blue-500 mr-2" size={20} />
        How to Use
      </h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-sm font-medium">1</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">For Stories:</p>
            <p className="text-sm text-gray-600">Enter the Instagram username (without @) and tap download.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-pink-600 text-sm font-medium">2</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">For Reels:</p>
            <p className="text-sm text-gray-600">Copy the Reel link from Instagram and paste it here.</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-blue-800 text-xs">
            <strong>Demo Mode:</strong> Currently generates sample files to demonstrate the complete workflow.
            Real Instagram content would require official API integration.
          </p>
        </div>
      </div>
    </div>
  );
}
