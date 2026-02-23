import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeekSelectorComponent } from '../components/week-selector.component';
import { ScheduleTableComponent } from '../components/schedule-table.component';
import { PersonScheduleTableComponent } from '../components/person-schedule-table.component';
import { DateScheduleTableComponent } from '../components/date-schedule-table.component';
import { ScheduleService, PersonWeekEntry, DateScheduleEntry } from '../services/schedule.service';
import { Week } from '../models/week.model';
import { ScheduleDay } from '../models/schedule.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    WeekSelectorComponent,
    ScheduleTableComponent,
    PersonScheduleTableComponent,
    DateScheduleTableComponent,
  ],
  template: `
    <div class="current-week-badge">
      <span class="badge-label">{{ currentWeekLabel() }}</span>
      <span class="badge-dates">{{ currentWeekDates() }}</span>
    </div>

    <div class="tab-bar">
      <button
        class="tab-btn"
        [class.active]="activeTab() === 'weekly'"
        (click)="onTabChange('weekly')"
      >
        Weekly Plan
      </button>
      <button
        class="tab-btn"
        [class.active]="activeTab() === 'person'"
        (click)="onTabChange('person')"
      >
        By Person
      </button>
      <button
        class="tab-btn"
        [class.active]="activeTab() === 'calendar'"
        (click)="onTabChange('calendar')"
      >
        By Calendar
      </button>
    </div>

    @if (activeTab() === 'weekly') {
      <app-week-selector
        [weeks]="allWeeks"
        [selectedIndex]="selectedIndex()"
        (weekSelected)="onWeekSelected($event)"
      />
      <app-schedule-table [schedule]="schedule()" />
    } @else if (activeTab() === 'person') {
      <div class="person-selector">
        <label for="person-select">Select Person</label>
        <select
          id="person-select"
          [ngModel]="selectedPerson()"
          (ngModelChange)="onPersonChange($event)"
        >
          @for (person of allPeople; track person) {
            <option [value]="person">{{ person }}</option>
          }
        </select>
      </div>
      @if (selectedPerson()) {
        <app-person-schedule-table [schedule]="personSchedule()" />
      }
    } @else {
      <div class="date-selector">
        <label for="date-select">Select Date</label>
        <input
          id="date-select"
          type="date"
          [ngModel]="selectedDate()"
          (ngModelChange)="onDateChange($event)"
        />
      </div>
      <app-date-schedule-table [entry]="dateSchedule()" />
    }

  `,
  styles: [
    `
      .current-week-badge {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        background: #1e40af;
        color: #fff;
        padding: 10px 24px;
        border-radius: 8px;
        margin-bottom: 24px;
        text-align: center;
      }
      .badge-label {
        font-size: 1.1rem;
        font-weight: 600;
      }
      .badge-dates {
        font-size: 0.85rem;
        opacity: 0.9;
      }
      .tab-bar {
        display: flex;
        gap: 0;
        margin-bottom: 24px;
        border-bottom: 2px solid #e2e8f0;
      }
      .tab-btn {
        padding: 10px 24px;
        font-size: 0.95rem;
        font-weight: 600;
        color: #64748b;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        cursor: pointer;
        transition: color 0.2s, border-color 0.2s;
      }
      .tab-btn:hover {
        color: #1e40af;
      }
      .tab-btn.active {
        color: #1e40af;
        border-bottom-color: #1e40af;
      }
      .person-selector,
      .date-selector {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      .person-selector label,
      .date-selector label {
        font-weight: 600;
        font-size: 1rem;
        color: #334155;
        white-space: nowrap;
      }
      .person-selector select,
      .date-selector input[type='date'] {
        padding: 8px 14px;
        font-size: 0.95rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: #fff;
        color: #1e293b;
        cursor: pointer;
        transition: border-color 0.2s;
      }
      .person-selector select {
        min-width: 240px;
      }
      .date-selector input[type='date'] {
        min-width: 200px;
      }
      .person-selector select:focus,
      .date-selector input[type='date']:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
      @media (max-width: 640px) {
        .tab-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
        }
        .person-selector,
        .date-selector {
          flex-direction: column;
          align-items: stretch;
        }
        .person-selector select,
        .date-selector input[type='date'] {
          min-width: 0;
          width: 100%;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  private scheduleService = inject(ScheduleService);

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
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${fmt(week.startDate)} - ${fmt(week.endDate)}`;
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
      if (idx >= 0) this.selectedIndex.set(idx);
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
}
