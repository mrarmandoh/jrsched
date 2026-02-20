import { Injectable } from '@angular/core';
import { Week } from '../models/week.model';
import { ScheduleDay, DAYS_OF_WEEK } from '../models/schedule.model';
import { GROUPS } from '../data/groups.data';
import { ROTATION_MATRIX } from '../data/schedule.data';
import { ALL_WEEKS, BASE_WEEK_START } from '../data/weeks.data';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  getWeeks(): Week[] {
    return ALL_WEEKS;
  }

  getScheduleForWeek(weekNumber: number): ScheduleDay[] {
    const rotationIndex = weekNumber - 1;
    const rotation = ROTATION_MATRIX[rotationIndex];

    return DAYS_OF_WEEK.map((day, dayIndex) => ({
      day,
      groupName: GROUPS[rotation[dayIndex]].name,
      members: GROUPS[rotation[dayIndex]].members,
    }));
  }

  getGroupMembers(groupName: string): string[] {
    const group = GROUPS.find((g) => g.name === groupName);
    return group ? group.members : [];
  }

  getCurrentWeekNumber(): number {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffTime = now.getTime() - BASE_WEEK_START.getTime();
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
    return (((diffWeeks % 5) + 5) % 5) + 1;
  }

  getCurrentWeek(): Week | undefined {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return ALL_WEEKS.find((w) => now >= w.startDate && now <= w.endDate);
  }
}
