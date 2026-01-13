/**
 * Unit tests for timeSort utilities
 * Run with: node src/utils/timeSort.test.js
 */

import { parseTimeToMinutes, sortDayItems } from './timeSort.js';

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`Expected null, got ${actual}`);
      }
    }
  };
}

// ============ parseTimeToMinutes tests ============

test('parseTimeToMinutes: 24-hour format with colon', () => {
  expect(parseTimeToMinutes('08:00')).toBe(8 * 60);
  expect(parseTimeToMinutes('8:00')).toBe(8 * 60);
  expect(parseTimeToMinutes('23:59')).toBe(23 * 60 + 59);
  expect(parseTimeToMinutes('00:00')).toBe(0);
  expect(parseTimeToMinutes('12:30')).toBe(12 * 60 + 30);
});

test('parseTimeToMinutes: 24-hour format with dot', () => {
  expect(parseTimeToMinutes('08.00')).toBe(8 * 60);
  expect(parseTimeToMinutes('8.00')).toBe(8 * 60);
  expect(parseTimeToMinutes('14.30')).toBe(14 * 60 + 30);
});

test('parseTimeToMinutes: 12-hour AM format', () => {
  expect(parseTimeToMinutes('8am')).toBe(8 * 60);
  expect(parseTimeToMinutes('8 am')).toBe(8 * 60);
  expect(parseTimeToMinutes('8AM')).toBe(8 * 60);
  expect(parseTimeToMinutes('8:30am')).toBe(8 * 60 + 30);
  expect(parseTimeToMinutes('8:30 AM')).toBe(8 * 60 + 30);
  expect(parseTimeToMinutes('12am')).toBe(0); // midnight
  expect(parseTimeToMinutes('12:30am')).toBe(30);
});

test('parseTimeToMinutes: 12-hour PM format', () => {
  expect(parseTimeToMinutes('8pm')).toBe(20 * 60);
  expect(parseTimeToMinutes('8 pm')).toBe(20 * 60);
  expect(parseTimeToMinutes('8:30pm')).toBe(20 * 60 + 30);
  expect(parseTimeToMinutes('8:30 PM')).toBe(20 * 60 + 30);
  expect(parseTimeToMinutes('12pm')).toBe(12 * 60); // noon
  expect(parseTimeToMinutes('12:30pm')).toBe(12 * 60 + 30);
});

test('parseTimeToMinutes: mixed format with AM/PM suffix (like in data)', () => {
  expect(parseTimeToMinutes('05:30 AM')).toBe(5 * 60 + 30);
  expect(parseTimeToMinutes('10:00 AM')).toBe(10 * 60);
  expect(parseTimeToMinutes('14:15 PM')).toBe(14 * 60 + 15); // treat as 24h
  expect(parseTimeToMinutes('22:15 PM')).toBe(22 * 60 + 15);
});

test('parseTimeToMinutes: 4-digit military time', () => {
  expect(parseTimeToMinutes('0830')).toBe(8 * 60 + 30);
  expect(parseTimeToMinutes('2015')).toBe(20 * 60 + 15);
  expect(parseTimeToMinutes('0000')).toBe(0);
  expect(parseTimeToMinutes('2359')).toBe(23 * 60 + 59);
});

test('parseTimeToMinutes: time ranges (uses start time)', () => {
  expect(parseTimeToMinutes('08:00-09:30')).toBe(8 * 60);
  expect(parseTimeToMinutes('8am - 9am')).toBe(8 * 60);
  expect(parseTimeToMinutes('08:00 - 10:00')).toBe(8 * 60);
  expect(parseTimeToMinutes('8:30pm-10pm')).toBe(20 * 60 + 30);
});

test('parseTimeToMinutes: text prefixes', () => {
  expect(parseTimeToMinutes('Around 8:00')).toBe(8 * 60);
  expect(parseTimeToMinutes('approx 8pm')).toBe(20 * 60);
  expect(parseTimeToMinutes('approximately 10:30')).toBe(10 * 60 + 30);
  expect(parseTimeToMinutes('about 9am')).toBe(9 * 60);
  expect(parseTimeToMinutes('~14:00')).toBe(14 * 60);
});

test('parseTimeToMinutes: non-time values return null', () => {
  expect(parseTimeToMinutes('Evening')).toBeNull();
  expect(parseTimeToMinutes('morning')).toBeNull();
  expect(parseTimeToMinutes('All day')).toBeNull();
  expect(parseTimeToMinutes('TBD')).toBeNull();
  expect(parseTimeToMinutes('')).toBeNull();
  expect(parseTimeToMinutes(null)).toBeNull();
  expect(parseTimeToMinutes(undefined)).toBeNull();
});

test('parseTimeToMinutes: invalid times return null', () => {
  expect(parseTimeToMinutes('25:00')).toBeNull();
  expect(parseTimeToMinutes('12:60')).toBeNull();
  expect(parseTimeToMinutes('random text')).toBeNull();
});

// ============ sortDayItems tests ============

test('sortDayItems: sorts by time ascending', () => {
  const items = [
    { id: 1, time: '10:00 AM', activity: 'Second' },
    { id: 2, time: '08:00 AM', activity: 'First' },
    { id: 3, time: '14:00 PM', activity: 'Third' }
  ];
  const sorted = sortDayItems(items);
  expect(sorted[0].activity).toBe('First');
  expect(sorted[1].activity).toBe('Second');
  expect(sorted[2].activity).toBe('Third');
});

test('sortDayItems: items without time go to bottom', () => {
  const items = [
    { id: 1, time: '10:00 AM', activity: 'Timed' },
    { id: 2, time: 'Evening', activity: 'No time 1' },
    { id: 3, time: '08:00 AM', activity: 'Earlier' },
    { id: 4, time: '', activity: 'No time 2' }
  ];
  const sorted = sortDayItems(items);
  expect(sorted[0].activity).toBe('Earlier');
  expect(sorted[1].activity).toBe('Timed');
  expect(sorted[2].activity).toBe('No time 1');
  expect(sorted[3].activity).toBe('No time 2');
});

test('sortDayItems: stable sort for same times', () => {
  const items = [
    { id: 1, time: '10:00 AM', activity: 'First at 10' },
    { id: 2, time: '10:00 AM', activity: 'Second at 10' },
    { id: 3, time: '10:00 AM', activity: 'Third at 10' }
  ];
  const sorted = sortDayItems(items);
  expect(sorted[0].activity).toBe('First at 10');
  expect(sorted[1].activity).toBe('Second at 10');
  expect(sorted[2].activity).toBe('Third at 10');
});

test('sortDayItems: preserves relative order for items without time', () => {
  const items = [
    { id: 1, time: 'Evening', activity: 'Evening 1' },
    { id: 2, time: '', activity: 'Empty' },
    { id: 3, time: 'Night', activity: 'Night' }
  ];
  const sorted = sortDayItems(items);
  expect(sorted[0].activity).toBe('Evening 1');
  expect(sorted[1].activity).toBe('Empty');
  expect(sorted[2].activity).toBe('Night');
});

test('sortDayItems: does not mutate original array', () => {
  const items = [
    { id: 1, time: '10:00 AM', activity: 'Second' },
    { id: 2, time: '08:00 AM', activity: 'First' }
  ];
  const original = JSON.stringify(items);
  sortDayItems(items);
  expect(JSON.stringify(items)).toBe(original);
});

test('sortDayItems: handles empty array', () => {
  expect(sortDayItems([])).toEqual([]);
});

test('sortDayItems: handles mixed time formats', () => {
  const items = [
    { id: 1, time: '2pm', activity: 'Third' },
    { id: 2, time: '09:30 AM', activity: 'First' },
    { id: 3, time: '12:00', activity: 'Second' }
  ];
  const sorted = sortDayItems(items);
  expect(sorted[0].activity).toBe('First');
  expect(sorted[1].activity).toBe('Second');
  expect(sorted[2].activity).toBe('Third');
});

// ============ Run tests ============

console.log('Running timeSort tests...\n');

for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  ${error.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
