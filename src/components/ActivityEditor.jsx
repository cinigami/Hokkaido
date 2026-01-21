import React, { useState } from 'react';
import { X, Trash2, Save, Search } from 'lucide-react';

const ActivityEditor = ({ activity, onSave, onCancel, onDelete }) => {
  const [form, setForm] = useState({
    time: activity?.time || "",
    activity: activity?.activity || "",
    location: activity?.location?.name || activity?.location || "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.time.trim()) {
      newErrors.time = "Time is required";
    }
    if (!form.activity.trim()) {
      newErrors.activity = "Activity is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newActivity = {
      ...activity,
      id: activity?.id || Date.now(),
      time: form.time.trim(),
      activity: form.activity.trim(),
      icon: activity?.icon || "MapPin",
      location: form.location.trim() || null,
    };
    onSave(newActivity);
  };

  const searchLocation = () => {
    if (form.location) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(form.location)}`, '_blank');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-title"
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="editor-title" className="text-lg font-bold text-gray-800">
            {activity?.id ? "Edit Activity" : "Add Activity"}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="time-input" className="block text-sm font-medium text-gray-700 mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              id="time-input"
              type="text"
              value={form.time}
              onChange={(e) => {
                setForm({...form, time: e.target.value});
                if (errors.time) setErrors({...errors, time: null});
              }}
              placeholder="e.g., 09:00 AM"
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.time ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
            />
            {errors.time && (
              <p id="time-error" className="text-red-500 text-xs mt-1">{errors.time}</p>
            )}
          </div>

          <div>
            <label htmlFor="activity-input" className="block text-sm font-medium text-gray-700 mb-1">
              Activity <span className="text-red-500">*</span>
            </label>
            <input
              id="activity-input"
              type="text"
              value={form.activity}
              onChange={(e) => {
                setForm({...form, activity: e.target.value});
                if (errors.activity) setErrors({...errors, activity: null});
              }}
              placeholder="What are you doing?"
              className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.activity ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              aria-invalid={!!errors.activity}
              aria-describedby={errors.activity ? "activity-error" : undefined}
            />
            {errors.activity && (
              <p id="activity-error" className="text-red-500 text-xs mt-1">{errors.activity}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="location-input" className="block text-sm font-medium text-gray-700">Location (Optional)</label>
              <button
                type="button"
                onClick={searchLocation}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                aria-label="Find location on Google Maps"
              >
                <Search className="w-3 h-3" /> Find on Maps
              </button>
            </div>
            <input
              id="location-input"
              type="text"
              value={form.location}
              onChange={(e) => setForm({...form, location: e.target.value})}
              placeholder="e.g., Nijo Market, Sapporo"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          {activity?.id && (
            <button
              onClick={() => onDelete(activity.id)}
              className="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors"
              aria-label="Delete activity"
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

export default ActivityEditor;
