import React, { useState, useEffect, useRef } from 'react';
import { Snowflake, Edit3, Clock } from 'lucide-react';
import { initialItineraryData } from '../data/itineraryData';
import { supabase, fetchItinerary, saveItinerary, deleteItinerary } from '../lib/supabase';
import Snowflakes from './Snowflakes';
import DayCard from './DayCard';
import MapTab from './MapTab';

const STORAGE_KEY = 'hokkaido-itinerary';
const SORT_PREF_KEY = 'hokkaido-autosort';

const JapanItinerary = () => {
  const [itinerary, setItinerary] = useState(initialItineraryData);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expandedDay, setExpandedDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSortByTime, setAutoSortByTime] = useState(() => {
    try {
      const saved = localStorage.getItem(SORT_PREF_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const isInitialLoad = useRef(true);

  // Persist sort preference
  useEffect(() => {
    try {
      localStorage.setItem(SORT_PREF_KEY, JSON.stringify(autoSortByTime));
    } catch {
      // Ignore storage errors
    }
  }, [autoSortByTime]);

  // Load data on mount - prefer Supabase, fallback to localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      if (supabase) {
        const data = await fetchItinerary();
        if (data) {
          setItinerary(data);
        } else {
          // No data in Supabase, check localStorage
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              const parsed = JSON.parse(saved);
              setItinerary(parsed);
              // Migrate localStorage data to Supabase
              await saveItinerary(parsed);
            }
          } catch {
            // Use default data
          }
        }
      } else {
        // No Supabase, use localStorage
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) setItinerary(JSON.parse(saved));
        } catch {
          // Use default data
        }
      }

      setIsLoading(false);
      isInitialLoad.current = false;
    };

    loadData();
  }, []);

  // Persist changes - save to both Supabase and localStorage
  useEffect(() => {
    if (isInitialLoad.current) return;

    const persistData = async () => {
      setIsSaving(true);

      // Always save to localStorage as backup
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }

      // Save to Supabase if available
      if (supabase) {
        await saveItinerary(itinerary);
      }

      setIsSaving(false);
    };

    persistData();
  }, [itinerary]);

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: '📅' },
    { id: 'map', label: 'Map', icon: '🗺️' },
  ];

  const handleUpdateDay = (updatedDay) => {
    setItinerary(itinerary.map(d => d.day === updatedDay.day ? updatedDay : d));
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all changes? This will restore the original itinerary.')) {
      setItinerary(initialItineraryData);
      if (supabase) {
        await deleteItinerary();
      }
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(180deg, #1a365d 0%, #2d4a7c 30%, #7ba3c9 70%, #b8d4e8 100%)'
      }}
    >
      <Snowflakes />

      <div className="relative z-10 pt-8 pb-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
          <Snowflake className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold text-white tracking-wider uppercase">Winter 2026</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">北海道 Adventure</h1>
        <p className="text-white/80 text-sm">Sapporo • Otaru • Shikotsu • Jozankei</p>
        <p className="text-white/60 text-xs mt-1">January 23-31, 2026 • Family of 4</p>
        {isSaving && (
          <p className="text-white/50 text-xs mt-2">Saving...</p>
        )}
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <span className="px-2 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">2 Markets</span>
          <span className="px-2 py-1 rounded-full bg-blue-500/80 text-white text-xs font-medium">2 Ski Resorts</span>
          <span className="px-2 py-1 rounded-full bg-orange-500/80 text-white text-xs font-medium">Onsen</span>
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
                  activeTab === tab.id
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-pressed={activeTab === tab.id}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'itinerary' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoSortByTime(!autoSortByTime)}
                className={`px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all ${
                  autoSortByTime
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-pressed={autoSortByTime}
                title={autoSortByTime ? 'Auto-sort by time: ON' : 'Auto-sort by time: OFF'}
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">{autoSortByTime ? 'Sorted' : 'Unsorted'}</span>
              </button>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                  isEditMode
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                aria-pressed={isEditMode}
              >
                <Edit3 className="w-4 h-4" />
                {isEditMode ? 'Done' : 'Edit'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-white/70">Loading itinerary...</p>
          </div>
        )}

        {!isLoading && activeTab === 'itinerary' && (
          <div>
            {isEditMode && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-400/30 text-green-100 text-sm flex items-center justify-between">
                <span>Edit mode: Tap activities to edit, or add new ones</span>
                <button
                  onClick={handleResetData}
                  className="text-xs underline hover:no-underline"
                >
                  Reset all
                </button>
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
                globalAutoSort={autoSortByTime}
              />
            ))}
          </div>
        )}

        {!isLoading && activeTab === 'map' && <MapTab itinerary={itinerary} />}
      </div>

      <div className="relative z-10 text-center pb-8 text-white/50 text-xs">
        Have an EPIC trip!
      </div>
    </div>
  );
};

export default JapanItinerary;
