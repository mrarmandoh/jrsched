import { Component, input } from '@angular/core';
import { PersonWeekEntry } from '../services/schedule.service';

@Component({
  selector: 'app-person-schedule-table',
  standalone: true,
  template: `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>WFH Day</th>
          </tr>
        </thead>
        <tbody>
          @for (entry of schedule(); track entry.weekLabel) {
            <tr [class.current-week]="isCurrentWeek(entry)">
              <td class="week-cell">{{ entry.weekLabel }}</td>
              <td class="day-cell">{{ entry.day }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .table-wrapper {
        overflow: auto;
        max-height: 410px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      thead {
        background: #1e40af;
        color: #fff;
        position: sticky;
        top: 0;
        z-index: 1;
      }
      th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      td {
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 0.95rem;
        color: #334155;
      }
      tbody tr:nth-child(odd) {
        background: #f8fafc;
      }
      tbody tr:nth-child(even) {
        background: #fff;
      }
      tbody tr:hover {
        background: #eff6ff;
      }
      tbody tr.current-week {
        background: #dbeafe;
        font-weight: 600;
      }
      .week-cell {
        min-width: 200px;
      }
      .day-cell {
        font-weight: 600;
        color: #1e293b;
        min-width: 100px;
      }
    `,
  ],
})
export class PersonScheduleTableComponent {
  schedule = input.required<PersonWeekEntry[]>();

  isCurrentWeek(entry: PersonWeekEntry): boolean {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const start = new Date(entry.startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 4);
    return now >= start && now <= end;
  }
}
