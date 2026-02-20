import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { WeekSelectorComponent } from './components/week-selector.component';
import { ScheduleTableComponent } from './components/schedule-table.component';
import { ScheduleService } from './services/schedule.service';
import { Week } from './models/week.model';
import { ScheduleDay } from './models/schedule.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeekSelectorComponent, ScheduleTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private scheduleService = inject(ScheduleService);

  currentYear = new Date().getFullYear();
  allWeeks: Week[] = this.scheduleService.getWeeks();
  selectedIndex = signal(0);

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

  private formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
