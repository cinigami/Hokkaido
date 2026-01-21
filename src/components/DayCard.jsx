import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit3, Plus, Clock, ExternalLink, MapPin } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import ActivityEditor from './ActivityEditor';
import { sortDayItems } from '../utils/timeSort';

const DayCard = ({ day, isExpanded, onToggle, onUpdateDay, isEditMode, globalAutoSort = true }) => {
  const IconComponent = getIcon(day.icon);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [localSortOverride, setLocalSortOverride] = useState(null); // null = use global, true/false = override

  // Determine if sorting is enabled for this day
  const isSortEnabled = localSortOverride !== null ? localSortOverride : globalAutoSort;

  // Get sorted or original activities (computed on each render for reliability)
  const displayActivities = isSortEnabled ? sortDayItems(day.activities) : day.activities;

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <>
      <div
        className="mb-4 rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: isExpanded ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-controls={`day-${day.day}-content`}
          className="p-5 cursor-pointer flex items-center gap-4 hover:bg-white/50 transition-colors"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{ backgroundColor: day.color }}
          >
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: day.color }}>
                Day {day.day}
              </span>
              <span className="text-xs text-gray-400">&#8226;</span>
              <span className="text-xs text-gray-500 font-medium">{day.date}</span>
              {isExpanded && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocalSortOverride(isSortEnabled ? false : true);
                  }}
                  className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                    isSortEnabled
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                  title={isSortEnabled ? 'Sorted by time' : 'Original order'}
                >
                  <Clock className="w-3 h-3" />
                  {isSortEnabled ? 'Sorted' : 'Unsorted'}
                </button>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{day.title}</h3>
            <p className="text-sm text-gray-500 truncate">{day.location}</p>
          </div>
          <div className="shrink-0 text-gray-400" aria-hidden="true">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        {isExpanded && (
          <div id={`day-${day.day}-content`} className="px-5 pb-5 border-t border-gray-100">
            <div className="mt-4 space-y-2">
              {displayActivities.map((activity) => {
                const ActivityIcon = getIcon(activity.icon);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <ActivityIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {activity.time}
                      </span>
                      <p className="text-sm text-gray-700 mt-0.5">
                        {activity.activity}
                        {activity.link && (
                          <a
                            href={activity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </p>
                      {activity.location && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            typeof activity.location === 'string' ? activity.location : activity.location.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-xs"
                        >
                          <MapPin className="w-3 h-3" />
                          {typeof activity.location === 'string' ? activity.location : activity.location.name}
                        </a>
                      )}
                    </div>
                    {isEditMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingActivity(activity);
                        }}
                        className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Edit ${activity.activity}`}
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
                aria-label="Add new activity"
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
          onCancel={() => {
            setEditingActivity(null);
            setShowAddNew(false);
          }}
          onDelete={handleDeleteActivity}
        />
      )}
    </>
  );
};

export default DayCard;
