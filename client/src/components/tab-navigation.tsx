import { CirclePlay, Video } from "lucide-react";

interface TabNavigationProps {
  activeTab: 'stories' | 'reels';
  onTabChange: (tab: 'stories' | 'reels') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm mb-6 p-1">
      <div className="flex">
        <button 
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center ${
            activeTab === 'stories' 
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onTabChange('stories')}
        >
          <CirclePlay className="mr-2" size={16} />
          Stories
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center ${
            activeTab === 'reels' 
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onTabChange('reels')}
        >
          <Video className="mr-2" size={16} />
          Reels
        </button>
      </div>
    </div>
  );
}
