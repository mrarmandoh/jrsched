import { Component, input } from '@angular/core';
import { ScheduleDay } from '../models/schedule.model';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  template: `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Group</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          @for (row of schedule(); track row.day) {
            <tr>
              <td class="day-cell">{{ row.day }}</td>
              <td class="group-cell">{{ row.groupName }}</td>
              <td class="people-cell">{{ row.members.join(', ') }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
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
        min-width: 100px;
      }
      .group-cell {
        font-weight: 500;
        color: #1e40af;
        min-width: 100px;
      }
      .people-cell {
        min-width: 200px;
      }
    `,
  ],
})
export class ScheduleTableComponent {
  schedule = input.required<ScheduleDay[]>();
}
