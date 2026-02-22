import { Injectable } from '@angular/core';
import { Week } from '../models/week.model';
import { ScheduleDay, DAYS_OF_WEEK } from '../models/schedule.model';
import { GROUPS } from '../data/groups.data';
import { ROTATION_MATRIX } from '../data/schedule.data';
import { ALL_WEEKS, BASE_WEEK_START } from '../data/weeks.data';

export interface PersonWeekEntry {
  weekLabel: string;
  day: string;
  startDate: Date;
}

export interface DateScheduleEntry {
  groupName: string;
  members: string[];
  dayOfWeek: string;
  weekNumber: number;
}

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

  getAllPeople(): string[] {
    return GROUPS.flatMap((g) => g.members).sort((a, b) => a.localeCompare(b));
  }

  getScheduleForPerson(name: string): PersonWeekEntry[] {
    const groupIndex = GROUPS.findIndex((g) => g.members.includes(name));
    if (groupIndex === -1) return [];

    return ALL_WEEKS.map((week) => {
      const rotation = ROTATION_MATRIX[week.weekNumber - 1];
      const dayIndex = rotation.indexOf(groupIndex);
      return {
        weekLabel: week.label,
        day: DAYS_OF_WEEK[dayIndex],
        startDate: week.startDate,
      };
    });
  }

  getScheduleForDate(date: Date): DateScheduleEntry | null {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const jsDay = d.getDay();
    if (jsDay === 0 || jsDay === 6) return null;

    const dayIndex = jsDay - 1;
    const diffTime = d.getTime() - BASE_WEEK_START.getTime();
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
    const weekNumber = (((diffWeeks % 5) + 5) % 5) + 1;
    const rotation = ROTATION_MATRIX[weekNumber - 1];
    const group = GROUPS[rotation[dayIndex]];

    return {
      groupName: group.name,
      members: group.members,
      dayOfWeek: DAYS_OF_WEEK[dayIndex],
      weekNumber,
    };
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
