import { useState } from "react";
import { Heart } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import MainMenu from "@/components/main-menu";
import ModeSwitcher from "@/components/mode-switcher";
import TabNavigation from "@/components/tab-navigation";
import StoriesDownloader from "@/components/stories-downloader";
import ReelsDownloader from "@/components/reels-downloader";
import DownloadHistory from "@/components/download-history";
import AppSettings from "@/components/app-settings";
import HelpSection from "@/components/help-section";
import Advertisement from "@/components/advertisement";
import AppDownload from "@/components/app-download";

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState<'stories' | 'reels'>('stories');
  const [currentMode, setCurrentMode] = useState('light');

  const getThemeClasses = () => {
    switch (currentMode) {
      case 'dark':
        return 'min-h-screen bg-gradient-to-br from-gray-900 to-black text-white';
      case 'colorful':
        return 'min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100';
      case 'minimal':
        return 'min-h-screen bg-gray-50';
      default:
        return 'min-h-screen bg-gradient-to-br from-blue-50 to-pink-50';
    }
  };

  const getHeaderClasses = () => {
    switch (currentMode) {
      case 'dark':
        return 'bg-gray-800 shadow-sm border-b border-gray-700';
      case 'colorful':
        return 'bg-white shadow-lg border-b border-purple-200';
      case 'minimal':
        return 'bg-white border-b border-gray-100';
      default:
        return 'bg-white shadow-sm border-b border-gray-200';
    }
  };

  const getTextClasses = () => {
    switch (currentMode) {
      case 'dark':
        return 'text-white';
      case 'colorful':
        return 'text-purple-900';
      case 'minimal':
        return 'text-gray-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={getThemeClasses()}>
      {/* Header */}
      <header className={getHeaderClasses()}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
                <SiInstagram className="text-white text-lg" size={20} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${getTextClasses()}`}>InstaDownloads</h1>
                <p className={`text-xs ${currentMode === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Stories & Reels</p>
              </div>
            </div>
            <ModeSwitcher currentMode={currentMode} onModeChange={setCurrentMode} />
          </div>
        </div>
      </header>
      <MainMenu activeSection={activeSection} onSectionChange={setActiveSection} currentMode={currentMode} />
      <main className="max-w-4xl mx-auto px-6 py-6">
        {activeSection === 'home' && (
          <div className="max-w-md mx-auto space-y-4">
            {/* Top Banner Ad */}
            <Advertisement type="banner" />
            
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'stories' ? (
              <StoriesDownloader />
            ) : (
              <ReelsDownloader />
            )}

            {/* Square Ad after downloader */}
            <Advertisement type="square" />

            <HelpSection />

            {/* Footer Ad */}
            <Advertisement type="footer" />
          </div>
        )}

        {activeSection === 'history' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Banner Ad at top of history */}
            <Advertisement type="banner" />
            <DownloadHistory />
            {/* Sidebar Ad at bottom of history */}
            <Advertisement type="sidebar" />
          </div>
        )}

        {activeSection === 'apps' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Banner Ad at top of apps */}
            <Advertisement type="banner" />
            <AppDownload />
            {/* Square Ad at bottom of apps */}
            <Advertisement type="square" />
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Banner Ad at top of settings */}
            <Advertisement type="banner" />
            <AppSettings />
            {/* Square Ad at bottom of settings */}
            <Advertisement type="square" />
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="max-w-md mx-auto px-6 py-8 text-center space-y-4">
        {/* Footer Advertisement */}
        <Advertisement type="footer" />
        
        <p className="text-sm text-gray-500 flex items-center justify-center">
          Made with <Heart className="text-red-500 mx-1" size={16} /> for Instagram lovers
        </p>
        <p className="text-xs text-gray-400 mt-2">
          This app respects Instagram's terms of service
        </p>
      </footer>
    </div>
  );
}
