/**
 * Time sorting utilities for itinerary items
 */

/**
 * Parses a time string into minutes from midnight (0-1439)
 * Supports formats: "8:00", "08:00", "8.00", "8am", "8 am", "8:30pm", "20:15", "2015"
 * Also handles ranges like "08:00-09:30" (uses start time) and prefixes like "Around 8:00"
 *
 * @param {string} timeString - The time string to parse
 * @returns {number|null} - Minutes from midnight, or null if parsing fails
 */
export function parseTimeToMinutes(timeString) {
  if (!timeString || typeof timeString !== 'string') {
    return null;
  }

  const normalized = timeString.trim().toLowerCase();

  // Skip known non-time values
  if (['evening', 'morning', 'afternoon', 'night', 'all day', 'tbd', 'flexible'].includes(normalized)) {
    return null;
  }

  // Extract first time from ranges like "08:00-09:30" or "8am - 9am"
  const rangeMatch = normalized.match(/^([^-–]+)[-–]/);
  const timeToProcess = rangeMatch ? rangeMatch[1].trim() : normalized;

  // Remove common prefixes (longer words first to avoid partial matches)
  const cleanedTime = timeToProcess
    .replace(/^(approximately|around|approx\.?|about|circa|~)\s*/i, '')
    .trim();

  // Try various patterns
  let hours = null;
  let minutes = 0;

  // Pattern 1: Format with AM/PM - "8:30 PM", "8:30PM", "8 am", "8am", "14:15 PM"
  const ampmMatch = cleanedTime.match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)$/i);
  if (ampmMatch) {
    hours = parseInt(ampmMatch[1], 10);
    minutes = ampmMatch[2] ? parseInt(ampmMatch[2], 10) : 0;
    const isPM = ampmMatch[3].toLowerCase() === 'pm';

    // Only apply 12-hour conversion if hours <= 12 (standard 12-hour format)
    // If hours > 12, assume it's already 24-hour format with redundant AM/PM
    if (hours <= 12) {
      if (hours === 12) {
        hours = isPM ? 12 : 0;
      } else if (isPM) {
        hours += 12;
      }
    }
  }

  // Pattern 2: 24-hour format with colon or dot - "08:00", "8:00", "08.00", "8.00"
  if (hours === null) {
    const time24Match = cleanedTime.match(/^(\d{1,2})[:.](\d{2})(?:\s*(am|pm))?$/i);
    if (time24Match) {
      hours = parseInt(time24Match[1], 10);
      minutes = parseInt(time24Match[2], 10);

      // Handle explicit AM/PM suffix even with 24h format (e.g., "14:15 PM" in data)
      if (time24Match[3]) {
        const isPM = time24Match[3].toLowerCase() === 'pm';
        if (hours <= 12) {
          if (hours === 12) {
            hours = isPM ? 12 : 0;
          } else if (isPM && hours < 12) {
            hours += 12;
          }
        }
      }
    }
  }

  // Pattern 3: 4-digit military time - "2015" as 20:15, "0830" as 08:30
  if (hours === null) {
    const militaryMatch = cleanedTime.match(/^(\d{4})$/);
    if (militaryMatch) {
      const num = parseInt(militaryMatch[1], 10);
      hours = Math.floor(num / 100);
      minutes = num % 100;

      // Validate reasonable time
      if (hours > 23 || minutes > 59) {
        return null;
      }
    }
  }

  // Pattern 4: Just hours - "8", "20"
  if (hours === null) {
    const hoursOnlyMatch = cleanedTime.match(/^(\d{1,2})$/);
    if (hoursOnlyMatch) {
      hours = parseInt(hoursOnlyMatch[1], 10);
      minutes = 0;
    }
  }

  // Validate
  if (hours === null || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

/**
 * Sorts day items by time (earliest to latest)
 * Items without parseable times are placed at the bottom, preserving their relative order
 * Sorting is stable: items with the same time keep their original order
 *
 * @param {Array} items - Array of activity items with `time` field
 * @returns {Array} - New sorted array (original is not mutated)
 */
export function sortDayItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  // Add original index for stable sorting
  const itemsWithIndex = items.map((item, index) => ({
    ...item,
    _originalIndex: index,
    _parsedTime: parseTimeToMinutes(item.time)
  }));

  // Separate items with and without valid times
  const withTime = itemsWithIndex.filter(item => item._parsedTime !== null);
  const withoutTime = itemsWithIndex.filter(item => item._parsedTime === null);

  // Sort items with time (stable sort by using original index as tiebreaker)
  withTime.sort((a, b) => {
    if (a._parsedTime !== b._parsedTime) {
      return a._parsedTime - b._parsedTime;
    }
    return a._originalIndex - b._originalIndex;
  });

  // Combine: sorted items first, then items without time (in original order)
  const sorted = [...withTime, ...withoutTime];

  // Remove internal properties before returning
  return sorted.map(({ _originalIndex, _parsedTime, ...item }) => item);
}

/**
 * Returns items in their original order (for when sorting is disabled)
 * This is a pass-through function for consistency
 *
 * @param {Array} items - Array of activity items
 * @returns {Array} - Same array reference
 */
export function getOriginalOrder(items) {
  return items;
}
