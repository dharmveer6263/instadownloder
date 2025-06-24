import { useState } from "react";
import { Home, History, Settings, Menu, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentMode?: string;
}

export default function MainMenu({ activeSection, onSectionChange, currentMode = 'light' }: MainMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Download', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'apps', label: 'Mobile Apps', icon: Smartphone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Menu Bar */}
      <div className={`hidden md:block border-b shadow-sm ${
        currentMode === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : currentMode === 'colorful'
          ? 'bg-white border-purple-200'
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex justify-center space-x-12">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeSection === item.id
                      ? 'border-blue-500 text-blue-600'
                      : currentMode === 'dark'
                      ? 'border-transparent text-gray-300 hover:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="sm"
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-md rounded-full p-2"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu}>
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white shadow-lg rounded-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Navigation</h2>
                <nav className="grid grid-cols-2 gap-3">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`flex flex-col items-center space-y-2 px-4 py-4 rounded-xl transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <IconComponent size={24} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}