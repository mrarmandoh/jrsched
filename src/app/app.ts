import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeekSelectorComponent } from './components/week-selector.component';
import { ScheduleTableComponent } from './components/schedule-table.component';
import { PersonScheduleTableComponent } from './components/person-schedule-table.component';
import { DateScheduleTableComponent } from './components/date-schedule-table.component';
import { ScheduleService, PersonWeekEntry, DateScheduleEntry } from './services/schedule.service';
import { Week } from './models/week.model';
import { ScheduleDay } from './models/schedule.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, WeekSelectorComponent, ScheduleTableComponent, PersonScheduleTableComponent, DateScheduleTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private scheduleService = inject(ScheduleService);

  currentYear = new Date().getFullYear();
  allWeeks: Week[] = this.scheduleService.getWeeks();
  allPeople: string[] = this.scheduleService.getAllPeople();
  selectedIndex = signal(0);
  activeTab = signal<'weekly' | 'person' | 'calendar'>('weekly');
  selectedPerson = signal(this.allPeople[0] ?? '');
  selectedDate = signal(this.todayString());

  currentWeekLabel = computed(() => {
    const week = this.allWeeks[this.selectedIndex()];
    return week ? `Week ${week.weekNumber}` : '';
  });

  currentWeekDates = computed(() => {
    const week = this.allWeeks[this.selectedIndex()];
    if (!week) return '';
    return `${this.formatDate(week.startDate)} - ${this.formatDate(week.endDate)}`;
  });

  schedule = computed<ScheduleDay[]>(() => {
    const week = this.allWeeks[this.selectedIndex()];
    if (!week) return [];
    return this.scheduleService.getScheduleForWeek(week.weekNumber);
  });

  personSchedule = computed<PersonWeekEntry[]>(() => {
    const person = this.selectedPerson();
    if (!person) return [];
    return this.scheduleService.getScheduleForPerson(person);
  });

  dateSchedule = computed<DateScheduleEntry | null>(() => {
    const dateStr = this.selectedDate();
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    return this.scheduleService.getScheduleForDate(new Date(year, month - 1, day));
  });

  ngOnInit(): void {
    const currentWeek = this.scheduleService.getCurrentWeek();
    if (currentWeek) {
      const idx = this.allWeeks.findIndex(
        (w) => w.startDate.getTime() === currentWeek.startDate.getTime()
      );
      if (idx >= 0) {
        this.selectedIndex.set(idx);
      }
    }
  }

  onWeekSelected(index: number): void {
    this.selectedIndex.set(index);
  }

  onTabChange(tab: 'weekly' | 'person' | 'calendar'): void {
    this.activeTab.set(tab);
  }

  onPersonChange(name: string): void {
    this.selectedPerson.set(name);
  }

  onDateChange(dateStr: string): void {
    this.selectedDate.set(dateStr);
  }

  private todayString(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
