import { Week } from '../models/week.model';

const BASE_WEEK_START = new Date(2024, 11, 30); // Monday, Dec 30, 2024 (Week 1 reference)
const DISPLAY_START = new Date(2026, 1, 23); // Monday, Feb 23, 2026 (first visible week)
const END_DATE = new Date(2027, 11, 31); // Dec 31, 2027

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(d: Date, days: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function generateWeeks(): Week[] {
  const weeks: Week[] = [];
  let current = new Date(DISPLAY_START);

  while (current < END_DATE) {
    const monday = getMonday(current);
    const friday = addDays(monday, 4);
    const diffTime = monday.getTime() - BASE_WEEK_START.getTime();
    const diffWeeks = Math.round(diffTime / (7 * 24 * 60 * 60 * 1000));
    const weekNumber = (diffWeeks % 5) + 1;

    weeks.push({
      weekNumber,
      label: `Week ${weekNumber} (${formatDate(monday)} - ${formatDate(friday)})`,
      startDate: monday,
      endDate: friday,
    });

    current = addDays(current, 7);
  }

  return weeks;
}

export const ALL_WEEKS: Week[] = generateWeeks();
export { BASE_WEEK_START };
