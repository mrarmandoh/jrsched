import { Component, input } from '@angular/core';
import { DateScheduleEntry } from '../services/schedule.service';

@Component({
  selector: 'app-date-schedule-table',
  standalone: true,
  template: `
    @if (entry(); as e) {
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Week</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="day-cell">{{ e.dayOfWeek }}</td>
              <td class="week-cell">Week {{ e.weekNumber }}</td>
              <td class="group-cell">{{ e.groupName }}</td>
            </tr>
          </tbody>
        </table>

        <h3 class="people-heading">People</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            @for (member of e.members; track member) {
              <tr>
                <td>{{ member }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <div class="weekend-msg">
        This date falls on a weekend
      </div>
    }
  `,
  styles: [
    `
      .table-wrapper {
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
      }
      thead {
        background: #1e40af;
        color: #fff;
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
      .day-cell {
        font-weight: 600;
        color: #1e293b;
      }
      .week-cell {
        font-weight: 500;
        color: #334155;
      }
      .group-cell {
        font-weight: 500;
        color: #1e40af;
      }
      .people-heading {
        margin: 20px 0 12px;
        font-size: 1rem;
        font-weight: 700;
        color: #1e293b;
      }
      .weekend-msg {
        padding: 24px;
        text-align: center;
        color: #64748b;
        font-size: 1rem;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
      }
    `,
  ],
})
export class DateScheduleTableComponent {
  entry = input.required<DateScheduleEntry | null>();
}
