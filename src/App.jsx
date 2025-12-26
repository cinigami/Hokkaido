import React, { useState } from 'react';
import { Plane, Train, Car, Mountain, ShoppingBag, Home, MapPin, Clock, Phone, AlertCircle, CheckSquare, Square, ChevronDown, ChevronUp, Snowflake, Coffee, Camera, Music, Heart, Map, Navigation, ExternalLink, Sunrise, Star, Edit3, Trash2, Plus, Save, X, Search } from 'lucide-react';

const initialItineraryData = [
  {
    day: 1,
    date: "Thu, Jan 23",
    title: "Journey Begins",
    location: "Sungai Petani → Tokyo",
    icon: "Plane",
    color: "#E8927C",
    activities: [
      { id: 1, time: "05:30 AM", activity: "Drive from Sungai Petani", icon: "Car", location: { name: "Sungai Petani", lat: 5.6470, lng: 100.4880 } },
      { id: 2, time: "10:00 AM", activity: "Arrive KLIA, park car (8 days)", icon: "MapPin", location: { name: "KLIA", lat: 2.7456, lng: 101.7072 } },
      { id: 3, time: "14:15 PM", activity: "Fly to Tokyo (NH886)", icon: "Plane", location: { name: "KLIA", lat: 2.7456, lng: 101.7072 } },
      { id: 4, time: "22:15 PM", activity: "Arrive Tokyo Haneda", icon: "MapPin", location: { name: "Tokyo Haneda Airport", lat: 35.5494, lng: 139.7798 } },
      { id: 5, time: "23:00 PM", activity: "Check in Haneda Excel Hotel", icon: "Home", location: { name: "Haneda Excel Hotel", lat: 35.5494, lng: 139.7798 } },
    ],
    sleep: "Haneda Excel Hotel Tokyu (Terminal 2)",
    cost: "~RM 864",
  },
  {
    day: 2,
    date: "Fri, Jan 24",
    title: "Hello Hokkaido",
    location: "Tokyo → Sapporo",
    icon: "Plane",
    color: "#7CB9E8",
    activities: [
      { id: 1, time: "06:20 AM", activity: "Fly to Sapporo (NH987)", icon: "Plane", location: { name: "Tokyo Haneda", lat: 35.5494, lng: 139.7798 } },
      { id: 2, time: "07:50 AM", activity: "Arrive New Chitose Airport", icon: "MapPin", location: { name: "New Chitose Airport", lat: 42.7752, lng: 141.6925 } },
      { id: 3, time: "09:30 AM", activity: "Airport bus to city", icon: "Car", location: null },
      { id: 4, time: "10:00 AM", activity: "Arrive Misono (early luggage drop)", icon: "MapPin", location: { name: "Misono Sapporo", lat: 43.0476, lng: 141.3640 } },
      { id: 5, time: "16:00 PM", activity: "Check in Sunny Parkside Apartment", icon: "Home", location: { name: "Sunny Parkside Apartment", lat: 43.0476, lng: 141.3640 } },
      { id: 6, time: "Evening", activity: "Grocery shopping, explore neighborhood", icon: "ShoppingBag", location: null },
    ],
    sleep: "Sunny Parkside Apartment, Sapporo",
    cost: "~RM 300",
  },
  {
    day: 3,
    date: "Sat, Jan 25",
    title: "City + Market",
    location: "Sapporo | Nijo Market 🦀",
    icon: "Camera",
    color: "#FF6B6B",
    activities: [
      { id: 1, time: "09:00 AM", activity: "🦀 NIJO MARKET - Fresh seafood!", icon: "Coffee", location: { name: "Nijo Market", lat: 43.0575, lng: 141.3470 } },
      { id: 2, time: "09:30 AM", activity: "Kaisen Don breakfast (seafood bowl) 🍚", icon: "Coffee", location: { name: "Nijo Market", lat: 43.0575, lng: 141.3470 } },
      { id: 3, time: "10:40 AM", activity: "Odori Park walk", icon: "Camera", location: { name: "Odori Park", lat: 43.0603, lng: 141.3544 } },
      { id: 4, time: "11:20 AM", activity: "Sapporo TV Tower", icon: "Camera", location: { name: "Sapporo TV Tower", lat: 43.0612, lng: 141.3566 } },
      { id: 5, time: "13:30 PM", activity: "Tanukikoji Shopping Arcade (900m)", icon: "ShoppingBag", location: { name: "Tanukikoji Shopping Arcade", lat: 43.0565, lng: 141.3530 } },
      { id: 6, time: "18:00 PM", activity: "Genghis Khan dinner (grilled lamb) 🍖", icon: "Coffee", location: { name: "Sapporo Genghis Khan", lat: 43.0550, lng: 141.3530 } },
    ],
    sleep: "Sapporo Airbnb",
    cost: "~RM 680-1,310",
  },
  {
    day: 4,
    date: "Sun, Jan 26",
    title: "Otaru Full Day",
    location: "Triangle Market + Tenguyama 🚡",
    icon: "Train",
    color: "#DDA0DD",
    activities: [
      { id: 1, time: "08:50 AM", activity: "Train to Otaru (40 min)", icon: "Train", location: { name: "Sapporo Station", lat: 43.0687, lng: 141.3508 } },
      { id: 2, time: "09:35 AM", activity: "🦀 TRIANGLE MARKET - Kaisen Don!", icon: "Coffee", location: { name: "Triangle Market Otaru", lat: 43.1980, lng: 140.9935 } },
      { id: 3, time: "11:00 AM", activity: "Otaru Canal (photo spot) 📸", icon: "Camera", location: { name: "Otaru Canal", lat: 43.1970, lng: 141.0010 } },
      { id: 4, time: "11:45 AM", activity: "Sakaimachi Street + Music Box Museum 🎵", icon: "Music", location: { name: "Music Box Museum Otaru", lat: 43.1903, lng: 140.9943 } },
      { id: 5, time: "14:00 PM", activity: "LeTAO cheesecake 🍰", icon: "Coffee", location: { name: "LeTAO Main Store Otaru", lat: 43.1915, lng: 140.9960 } },
      { id: 6, time: "14:45 PM", activity: "Melon ice cream 🍈", icon: "Coffee", location: null },
      { id: 7, time: "15:10 PM", activity: "Taxi to Tenguyama", icon: "Car", location: null },
      { id: 8, time: "15:25 PM", activity: "🚡 TENGUYAMA ROPEWAY - Sunset views!", icon: "Sunrise", location: { name: "Tenguyama Ropeway Otaru", lat: 43.1850, lng: 140.9780 } },
      { id: 9, time: "17:00 PM", activity: "Night city lights view ✨", icon: "Star", location: { name: "Tenguyama Otaru", lat: 43.1850, lng: 140.9780 } },
      { id: 10, time: "17:40 PM", activity: "Train back to Sapporo", icon: "Train", location: { name: "Otaru Station", lat: 43.1973, lng: 140.9948 } },
    ],
    sleep: "Sapporo Airbnb",
    cost: "~RM 783-1,211",
  },
  {
    day: 5,
    date: "Mon, Jan 27",
    title: "Road Trip + Onsen",
    location: "Lake Shikotsu + Jozankei ♨️",
    icon: "Car",
    color: "#4ECDC4",
    activities: [
      { id: 1, time: "09:00 AM", activity: "Pick up rental car", icon: "Car", location: { name: "Toyota Rent a Car Sapporo", lat: 43.0687, lng: 141.3508 } },
      { id: 2, time: "09:30 AM", activity: "🎨 Moere Numa Park (art + nature, FREE)", icon: "Camera", location: { name: "Moerenuma Park", lat: 43.1190, lng: 141.4230 } },
      { id: 3, time: "11:15 AM", activity: "🏔️ LAKE SHIKOTSU (volcanic lake)", icon: "Mountain", location: { name: "Lake Shikotsu", lat: 42.7580, lng: 141.3340 } },
      { id: 4, time: "12:00 PM", activity: "Himemasu salmon lunch 🐟", icon: "Coffee", location: { name: "Lake Shikotsu Restaurant", lat: 42.7580, lng: 141.3340 } },
      { id: 5, time: "13:00 PM", activity: "Natural hot springs on beach!", icon: "Heart", location: { name: "Kohan Beach Shikotsu", lat: 42.7620, lng: 141.3280 } },
      { id: 6, time: "15:00 PM", activity: "♨️ JOZANKEI ONSEN (hot springs)", icon: "Heart", location: { name: "Jozankei Onsen", lat: 42.9680, lng: 141.1670 } },
      { id: 7, time: "17:00 PM", activity: "Relax in outdoor baths, mountain views", icon: "Heart", location: { name: "Jozankei Onsen", lat: 42.9680, lng: 141.1670 } },
      { id: 8, time: "18:15 PM", activity: "Return car, head home", icon: "Car", location: { name: "Sapporo Station", lat: 43.0687, lng: 141.3508 } },
    ],
    sleep: "Sapporo Airbnb",
    cost: "~RM 773-1,168",
  },
  {
    day: 6,
    date: "Tue, Jan 28",
    title: "Ski Day #1",
    location: "Sapporo Kokusai ⛷️",
    icon: "Mountain",
    color: "#74B9FF",
    activities: [
      { id: 1, time: "09:00 AM", activity: "Bus to Sapporo Kokusai (60 min)", icon: "Car", location: { name: "Sapporo Station Bus Terminal", lat: 43.0687, lng: 141.3508 } },
      { id: 2, time: "10:00 AM", activity: "Arrive resort", icon: "Mountain", location: { name: "Sapporo Kokusai Ski Resort", lat: 43.0045, lng: 141.0647 } },
      { id: 3, time: "10:30 AM", activity: "Rent equipment, buy passes", icon: "ShoppingBag", location: { name: "Sapporo Kokusai Ski Resort", lat: 43.0045, lng: 141.0647 } },
      { id: 4, time: "11:00 AM", activity: "⛷️ SKI & SNOW ACTIVITIES!", icon: "Snowflake", location: { name: "Sapporo Kokusai Ski Resort", lat: 43.0045, lng: 141.0647 } },
      { id: 5, time: "12:30 PM", activity: "Resort lunch (ramen, curry) 🍜", icon: "Coffee", location: { name: "Sapporo Kokusai Ski Resort", lat: 43.0045, lng: 141.0647 } },
      { id: 6, time: "13:30 PM", activity: "More skiing/snow tubing/sledding", icon: "Snowflake", location: { name: "Sapporo Kokusai Ski Resort", lat: 43.0045, lng: 141.0647 } },
      { id: 7, time: "15:30 PM", activity: "Return equipment", icon: "ShoppingBag", location: null },
      { id: 8, time: "16:00 PM", activity: "Bus back to Sapporo", icon: "Car", location: null },
      { id: 9, time: "19:00 PM", activity: "Simple dinner, rest well!", icon: "Home", location: null },
    ],
    sleep: "Sapporo Airbnb",
    cost: "~RM 555-1,215",
  },
  {
    day: 7,
    date: "Wed, Jan 29",
    title: "Ski Day #2 + Pack",
    location: "Sapporo Teine 🎿 (Olympics!)",
    icon: "Mountain",
    color: "#A29BFE",
    activities: [
      { id: 1, time: "09:00 AM", activity: "Bus to Sapporo Teine (40 min)", icon: "Car", location: { name: "Sapporo Station", lat: 43.0687, lng: 141.3508 } },
      { id: 2, time: "09:40 AM", activity: "Arrive resort", icon: "Mountain", location: { name: "Sapporo Teine Ski Resort", lat: 43.0833, lng: 141.2167 } },
      { id: 3, time: "10:00 AM", activity: "🏅 1972 OLYMPICS VENUE!", icon: "Star", location: { name: "Sapporo Teine Ski Resort", lat: 43.0833, lng: 141.2167 } },
      { id: 4, time: "10:30 AM", activity: "🎿 More skiing - apply Day 6 skills!", icon: "Snowflake", location: { name: "Sapporo Teine Ski Resort", lat: 43.0833, lng: 141.2167 } },
      { id: 5, time: "12:30 PM", activity: "Lunch at resort", icon: "Coffee", location: { name: "Sapporo Teine Ski Resort", lat: 43.0833, lng: 141.2167 } },
      { id: 6, time: "13:30 PM", activity: "Olympia zone (beginner-friendly)", icon: "Snowflake", location: { name: "Sapporo Teine Olympia", lat: 43.0833, lng: 141.2167 } },
      { id: 7, time: "15:00 PM", activity: "Finish activities", icon: "Mountain", location: null },
      { id: 8, time: "16:15 PM", activity: "Bus back to Sapporo", icon: "Car", location: null },
      { id: 9, time: "17:30 PM", activity: "Arrive home", icon: "Home", location: null },
      { id: 10, time: "18:00 PM", activity: "📦 PACK EVERYTHING", icon: "ShoppingBag", location: null },
      { id: 11, time: "19:00 PM", activity: "Final Sapporo dinner", icon: "Coffee", location: null },
      { id: 12, time: "21:00 PM", activity: "Early bedtime (departure tomorrow)", icon: "Clock", location: null },
    ],
    sleep: "Sapporo Airbnb",
    cost: "~RM 723-1,413",
  },
  {
    day: 8,
    date: "Thu, Jan 30",
    title: "Homeward Bound",
    location: "Sapporo → Tokyo → KL",
    icon: "Plane",
    color: "#E8927C",
    activities: [
      { id: 1, time: "08:00 AM", activity: "Wake up", icon: "Clock", location: null },
      { id: 2, time: "10:00 AM", activity: "Check out from Airbnb", icon: "Home", location: null },
      { id: 3, time: "10:30 AM", activity: "Airport bus to New Chitose", icon: "Car", location: { name: "Sapporo Station", lat: 43.0687, lng: 141.3508 } },
      { id: 4, time: "11:30 AM", activity: "Arrive airport", icon: "MapPin", location: { name: "New Chitose Airport", lat: 42.7752, lng: 141.6925 } },
      { id: 5, time: "13:40 PM", activity: "Fly to Tokyo Narita (NH2154)", icon: "Plane", location: { name: "New Chitose Airport", lat: 42.7752, lng: 141.6925 } },
      { id: 6, time: "15:30 PM", activity: "⚠️ Tight connection (1h 55m)!", icon: "Clock", location: { name: "Tokyo Narita Airport", lat: 35.7720, lng: 140.3929 } },
      { id: 7, time: "17:25 PM", activity: "Fly to KL (NH815)", icon: "Plane", location: { name: "Tokyo Narita Airport", lat: 35.7720, lng: 140.3929 } },
      { id: 8, time: "00:15 AM", activity: "Arrive KLIA (Jan 31)", icon: "MapPin", location: { name: "KLIA", lat: 2.7456, lng: 101.7072 } },
    ],
    sleep: "In transit",
    cost: null,
  },
  {
    day: 9,
    date: "Fri, Jan 31",
    title: "Welcome Home",
    location: "KLIA → Sungai Petani",
    icon: "Home",
    color: "#00B894",
    activities: [
      { id: 1, time: "01:30 AM", activity: "Exit KLIA", icon: "MapPin", location: { name: "KLIA", lat: 2.7456, lng: 101.7072 } },
      { id: 2, time: "02:00 AM", activity: "Check in KLIA hotel (REST!) 🏨", icon: "Home", location: { name: "Sama Sama Hotel KLIA", lat: 2.7456, lng: 101.7072 } },
      { id: 3, time: "02:30 AM", activity: "Sleep (much needed!)", icon: "Clock", location: null },
      { id: 4, time: "08:00 AM", activity: "Wake, breakfast", icon: "Coffee", location: null },
      { id: 5, time: "10:00 AM", activity: "Check out, get car from parking", icon: "Car", location: { name: "KLIA Parking", lat: 2.7456, lng: 101.7072 } },
      { id: 6, time: "10:30 AM", activity: "Drive home 🚗", icon: "Car", location: null },
      { id: 7, time: "12:00 PM", activity: "Rest stop (lunch, stretch)", icon: "Coffee", location: null },
      { id: 8, time: "14:00 PM", activity: "🏠 ARRIVE HOME! 🎉", icon: "Home", location: { name: "Sungai Petani", lat: 5.6470, lng: 100.4880 } },
    ],
    sleep: "Home sweet home! 🏠",
    cost: "~RM 330",
  }
];

const iconMap = {
  Plane, Train, Car, Mountain, ShoppingBag, Home, MapPin, Clock, Phone, 
  Coffee, Camera, Music, Heart, Sunrise, Star, Snowflake, Edit3
};

const getIcon = (iconName) => iconMap[iconName] || MapPin;

// Floating snowflakes
const Snowflakes = () => {
  const flakes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 4 + Math.random() * 8,
    opacity: 0.2 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flakes.map((f) => (
        <div key={f.id} className="absolute text-white" style={{
          left: `${f.left}%`, top: '-20px', fontSize: `${f.size}px`, opacity: f.opacity,
          animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
        }}>❄</div>
      ))}
      <style>{`@keyframes snowfall { 0% { transform: translateY(-20px) rotate(0deg); } 100% { transform: translateY(100vh) rotate(360deg); } }`}</style>
    </div>
  );
};

// Google Maps Button
const MapsButton = ({ location, size = "sm" }) => {
  if (!location) return null;
  const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors ${
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
      }`}
    >
      <Navigation className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className="font-medium">Maps</span>
    </a>
  );
};

// Activity Editor Modal
const ActivityEditor = ({ activity, onSave, onCancel, onDelete }) => {
  const [form, setForm] = useState({
    time: activity?.time || "",
    activity: activity?.activity || "",
    locationName: activity?.location?.name || "",
    locationLat: activity?.location?.lat || "",
    locationLng: activity?.location?.lng || "",
  });

  const handleSave = () => {
    const newActivity = {
      ...activity,
      id: activity?.id || Date.now(),
      time: form.time,
      activity: form.activity,
      icon: activity?.icon || "MapPin",
      location: form.locationName ? {
        name: form.locationName,
        lat: parseFloat(form.locationLat) || 0,
        lng: parseFloat(form.locationLng) || 0,
      } : null,
    };
    onSave(newActivity);
  };

  const searchLocation = () => {
    if (form.locationName) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(form.locationName)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {activity?.id ? "Edit Activity" : "Add Activity"}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({...form, time: e.target.value})}
              placeholder="e.g., 09:00 AM"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
            <input
              type="text"
              value={form.activity}
              onChange={(e) => setForm({...form, activity: e.target.value})}
              placeholder="What are you doing?"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">📍 Location (Optional)</label>
              <button
                onClick={searchLocation}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <Search className="w-3 h-3" /> Find on Maps
              </button>
            </div>
            <input
              type="text"
              value={form.locationName}
              onChange={(e) => setForm({...form, locationName: e.target.value})}
              placeholder="Location name"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={form.locationLat}
                onChange={(e) => setForm({...form, locationLat: e.target.value})}
                placeholder="Latitude"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                value={form.locationLng}
                onChange={(e) => setForm({...form, locationLng: e.target.value})}
                placeholder="Longitude"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">💡 Find coordinates: Right-click location in Google Maps</p>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          {activity?.id && (
            <button
              onClick={() => onDelete(activity.id)}
              className="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Day Card with Edit functionality
const DayCard = ({ day, isExpanded, onToggle, onUpdateDay, isEditMode }) => {
  const IconComponent = getIcon(day.icon);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);

  const handleSaveActivity = (activity) => {
    const existingIndex = day.activities.findIndex(a => a.id === activity.id);
    let newActivities;
    if (existingIndex >= 0) {
      newActivities = [...day.activities];
      newActivities[existingIndex] = activity;
    } else {
      newActivities = [...day.activities, activity];
    }
    onUpdateDay({ ...day, activities: newActivities });
    setEditingActivity(null);
    setShowAddNew(false);
  };

  const handleDeleteActivity = (activityId) => {
    const newActivities = day.activities.filter(a => a.id !== activityId);
    onUpdateDay({ ...day, activities: newActivities });
    setEditingActivity(null);
  };

  return (
    <>
      <div className="mb-4 rounded-2xl overflow-hidden transition-all duration-300" style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: isExpanded ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        <div onClick={onToggle} className="p-5 cursor-pointer flex items-center gap-4 hover:bg-white/50 transition-colors">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: day.color }}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: day.color }}>Day {day.day}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 font-medium">{day.date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{day.title}</h3>
            <p className="text-sm text-gray-500 truncate">{day.location}</p>
          </div>
          <div className="shrink-0 text-gray-400">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-5 pb-5 border-t border-gray-100">
            <div className="mt-4 space-y-2">
              {day.activities.map((activity) => {
                const ActivityIcon = getIcon(activity.icon);
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <ActivityIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{activity.time}</span>
                      <p className="text-sm text-gray-700 mt-0.5">{activity.activity}</p>
                      {activity.location && (
                        <div className="mt-2">
                          <MapsButton location={activity.location} />
                        </div>
                      )}
                    </div>
                    {isEditMode && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingActivity(activity); }}
                        className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {isEditMode && (
              <button
                onClick={() => setShowAddNew(true)}
                className="mt-3 w-full p-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Activity
              </button>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Accommodation</p>
                <p className="text-sm text-gray-600 font-medium">{day.sleep}</p>
              </div>
              {day.cost && (
                <span className="text-sm font-semibold text-green-600">{day.cost}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {(editingActivity || showAddNew) && (
        <ActivityEditor
          activity={editingActivity || {}}
          onSave={handleSaveActivity}
          onCancel={() => { setEditingActivity(null); setShowAddNew(false); }}
          onDelete={handleDeleteActivity}
        />
      )}
    </>
  );
};

// Map Tab
const MapTab = ({ itinerary }) => {
  const allLocations = itinerary.flatMap(day => 
    day.activities.filter(a => a.location).map(a => ({
      ...a.location,
      day: day.day,
      activity: a.activity,
    }))
  );

  const uniqueLocations = allLocations.reduce((acc, loc) => {
    if (!acc.find(l => l.name === loc.name)) acc.push(loc);
    return acc;
  }, []);

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
          href="https://www.google.com/maps/dir/KLIA/Tokyo+Haneda/New+Chitose+Airport/Sapporo/Otaru/Lake+Shikotsu/Jozankei+Onsen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
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
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                {loc.day}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{loc.name}</p>
                <p className="text-xs text-gray-400 truncate">{loc.activity}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300" />
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden p-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
        <h3 className="font-bold text-gray-800 mb-3">🚀 Quick Links</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Nijo Market", q: "Nijo+Market+Sapporo" },
            { name: "Triangle Market", q: "Triangle+Market+Otaru" },
            { name: "Tenguyama", q: "Tenguyama+Ropeway" },
            { name: "Lake Shikotsu", q: "Lake+Shikotsu" },
            { name: "Jozankei Onsen", q: "Jozankei+Onsen" },
            { name: "Kokusai Ski", q: "Sapporo+Kokusai+Ski" },
            { name: "Teine Ski", q: "Sapporo+Teine+Ski" },
            { name: "Otaru Canal", q: "Otaru+Canal" },
          ].map((loc, idx) => (
            <a
              key={idx}
              href={`https://www.google.com/maps/search/?api=1&query=${loc.q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors flex items-center gap-2"
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

export default function JapanItinerary() {
  const [itinerary, setItinerary] = useState(initialItineraryData);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expandedDay, setExpandedDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const tabs = [
    { id: 'itinerary', label: '📅 Itinerary' },
    { id: 'map', label: '🗺️ Map' },
  ];

  const handleUpdateDay = (updatedDay) => {
    setItinerary(itinerary.map(d => d.day === updatedDay.day ? updatedDay : d));
  };

  return (
    <div className="min-h-screen relative" style={{ 
      background: 'linear-gradient(180deg, #1a365d 0%, #2d4a7c 30%, #7ba3c9 70%, #b8d4e8 100%)'
    }}>
      <Snowflakes />
      
      <div className="relative z-10 pt-8 pb-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
          <Snowflake className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold text-white tracking-wider uppercase">Winter 2026</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">北海道 Adventure</h1>
        <p className="text-white/80 text-sm">Sapporo • Otaru • Shikotsu • Jozankei</p>
        <p className="text-white/60 text-xs mt-1">January 23-31, 2026 • Family of 4</p>
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <span className="px-2 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">🦀 2 Markets</span>
          <span className="px-2 py-1 rounded-full bg-blue-500/80 text-white text-xs font-medium">⛷️ 2 Ski Resorts</span>
          <span className="px-2 py-1 rounded-full bg-orange-500/80 text-white text-xs font-medium">♨️ Onsen</span>
        </div>
      </div>

      <div className="relative z-10 px-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 flex-1 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-white text-gray-800 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'itinerary' && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                isEditMode ? 'bg-green-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              {isEditMode ? 'Done' : 'Edit'}
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        {activeTab === 'itinerary' && (
          <div>
            {isEditMode && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-400/30 text-green-100 text-sm">
                ✏️ Edit mode: Tap activities to edit, or add new ones
              </div>
            )}
            {itinerary.map((day) => (
              <DayCard 
                key={day.day} 
                day={day} 
                isExpanded={expandedDay === day.day}
                onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                onUpdateDay={handleUpdateDay}
                isEditMode={isEditMode}
              />
            ))}
          </div>
        )}

        {activeTab === 'map' && <MapTab itinerary={itinerary} />}
      </div>

      <div className="relative z-10 text-center pb-8 text-white/50 text-xs">
        Have an EPIC trip! ⛄🗾🦀⛷️♨️
      </div>
    </div>
  );
}
