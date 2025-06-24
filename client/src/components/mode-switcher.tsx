import { useState } from "react";
import { Moon, Menu, Palette, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModeSwitcherProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

export default function ModeSwitcher({ currentMode, onModeChange }: ModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'light', label: 'Default', icon: Menu, color: 'text-gray-600' },
    { id: 'dark', label: 'Dark Mode', icon: Moon, color: 'text-blue-600' },
    { id: 'colorful', label: 'Colorful', icon: Palette, color: 'text-pink-500' },
    { id: 'minimal', label: 'Minimal', icon: Layout, color: 'text-gray-600' },
  ];

  const currentModeData = modes.find(mode => mode.id === currentMode) || modes[0];
  const IconComponent = currentModeData.icon;

  const handleModeSelect = (modeId: string) => {
    onModeChange(modeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 bg-white shadow-sm rounded-full px-3 py-2 hover:shadow-md transition-shadow"
      >
        <IconComponent className={currentModeData.color} size={16} />
        <span className="text-sm font-medium text-gray-700 capitalize">{currentMode}</span>
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 mb-1">
                Interface Mode
              </div>
              {modes.map((mode) => {
                const ModeIcon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeSelect(mode.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentMode === mode.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ModeIcon className={mode.color} size={16} />
                    <span className="text-sm font-medium">{mode.label}</span>
                    {currentMode === mode.id && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}