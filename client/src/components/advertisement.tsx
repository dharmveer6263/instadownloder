import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvertisementProps {
  type: 'banner' | 'square' | 'sidebar' | 'footer';
  className?: string;
}

export default function Advertisement({ type, className = '' }: AdvertisementProps) {
  const ads = {
    banner: {
      title: "Premium Instagram Tools",
      description: "Get unlimited downloads with Pro features",
      cta: "Upgrade Now",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    square: {
      title: "VPN Protection",
      description: "Stay anonymous while browsing",
      cta: "Try Free",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    sidebar: {
      title: "Photo Editor",
      description: "Edit your downloaded content",
      cta: "Download",
      color: "bg-gradient-to-b from-green-500 to-emerald-500"
    },
    footer: {
      title: "Cloud Storage",
      description: "Backup your downloads securely",
      cta: "Start Free",
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  };

  const ad = ads[type];

  if (type === 'banner') {
    return (
      <div className={`${ad.color} text-white p-4 rounded-lg shadow-md ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg">{ad.title}</h3>
            <p className="text-white/90 text-sm">{ad.description}</p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-white text-gray-900 hover:bg-gray-100 ml-4"
          >
            {ad.cta}
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  if (type === 'square') {
    return (
      <div className={`${ad.color} text-white p-6 rounded-lg shadow-md text-center ${className}`}>
        <div className="flex justify-center mb-2">
          <Star className="h-8 w-8" />
        </div>
        <h3 className="font-bold text-lg mb-2">{ad.title}</h3>
        <p className="text-white/90 text-sm mb-4">{ad.description}</p>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white text-gray-900 hover:bg-gray-100 w-full"
        >
          {ad.cta}
        </Button>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className={`${ad.color} text-white p-4 rounded-lg shadow-md ${className}`}>
        <h4 className="font-semibold text-base mb-1">{ad.title}</h4>
        <p className="text-white/90 text-xs mb-3">{ad.description}</p>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white text-gray-900 hover:bg-gray-100 w-full text-xs"
        >
          {ad.cta}
        </Button>
      </div>
    );
  }

  // Footer type
  return (
    <div className={`${ad.color} text-white p-3 rounded-md shadow-sm ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">{ad.title}</span>
          <span className="text-white/80 ml-2">{ad.description}</span>
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white text-gray-900 hover:bg-gray-100 text-xs px-3 py-1"
        >
          {ad.cta}
        </Button>
      </div>
    </div>
  );
}