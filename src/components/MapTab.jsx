import React, { useMemo } from 'react';
import { Map, Navigation, ExternalLink, MapPin } from 'lucide-react';

const MapTab = ({ itinerary }) => {
  const allLocations = useMemo(() =>
    itinerary.flatMap(day =>
      day.activities.filter(a => a.location).map(a => ({
        ...a.location,
        day: day.day,
        activity: a.activity,
      }))
    ),
    [itinerary]
  );

  const uniqueLocations = useMemo(() =>
    allLocations.reduce((acc, loc) => {
      if (!acc.find(l => l.name === loc.name)) acc.push(loc);
      return acc;
    }, []),
    [allLocations]
  );

  // Generate dynamic Google Maps route URL from itinerary
  const tripRouteUrl = useMemo(() => {
    const keyLocations = [];

    // Extract key locations from each day (first meaningful location)
    itinerary.forEach(day => {
      const locWithCoords = day.activities.find(a => a.location?.name);
      if (locWithCoords?.location?.name) {
        const name = locWithCoords.location.name;
        // Avoid duplicates
        if (!keyLocations.includes(name)) {
          keyLocations.push(name);
        }
      }
    });

    // Limit to reasonable number of waypoints for Google Maps
    const limitedLocations = keyLocations.slice(0, 10);
    const encodedLocations = limitedLocations.map(loc => encodeURIComponent(loc)).join('/');

    return `https://www.google.com/maps/dir/${encodedLocations}`;
  }, [itinerary]);

  const quickLinks = [
    { name: "Nijo Market", q: "Nijo+Market+Sapporo" },
    { name: "Triangle Market", q: "Triangle+Market+Otaru" },
    { name: "Tenguyama", q: "Tenguyama+Ropeway" },
    { name: "Lake Shikotsu", q: "Lake+Shikotsu" },
    { name: "Jozankei Onsen", q: "Jozankei+Onsen" },
    { name: "Kokusai Ski", q: "Sapporo+Kokusai+Ski" },
    { name: "Teine Ski", q: "Sapporo+Teine+Ski" },
    { name: "Otaru Canal", q: "Otaru+Canal" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden p-5" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Map className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Trip Map</h2>
          <p className="text-sm text-gray-500">{uniqueLocations.length} locations</p>
        </div>

        <a
          href={tripRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
          aria-label="Open full trip route in Google Maps"
        >
          <Navigation className="w-5 h-5" />
          Open Full Trip Route
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">All Locations</h3>
        </div>
        <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
          {uniqueLocations.map((loc, idx) => (
            <a
              key={idx}
              href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              aria-label={`Open ${loc.name} in Google Maps`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                {loc.day}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{loc.name}</p>
                <p className="text-xs text-gray-400 truncate">{loc.activity}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden p-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickLinks.map((loc, idx) => (
            <a
              key={idx}
              href={`https://www.google.com/maps/search/?api=1&query=${loc.q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors flex items-center gap-2"
              aria-label={`Open ${loc.name} in Google Maps`}
            >
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{loc.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapTab;
