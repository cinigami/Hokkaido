import React from 'react';
import { Navigation } from 'lucide-react';

const MapsButton = ({ location, size = "sm" }) => {
  if (!location) return null;

  const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={`Open ${location.name || 'location'} in Google Maps`}
      className={`inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors ${
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
      }`}
    >
      <Navigation className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className="font-medium">Maps</span>
    </a>
  );
};

export default MapsButton;
