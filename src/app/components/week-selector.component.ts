import { Component, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Week } from '../models/week.model';

@Component({
  selector: 'app-week-selector',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="week-selector">
      <label for="week-select">Select Week</label>
      <select
        id="week-select"
        [ngModel]="selectedIndex()"
        (ngModelChange)="onSelectionChange($event)"
      >
        @for (week of weeks(); track week.label) {
          <option [ngValue]="$index">{{ week.label }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .week-selector {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      label {
        font-weight: 600;
        font-size: 1rem;
        color: #334155;
        white-space: nowrap;
      }
      select {
        padding: 8px 14px;
        font-size: 0.95rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: #fff;
        color: #1e293b;
        cursor: pointer;
        min-width: 320px;
        transition: border-color 0.2s;
      }
      select:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
    `,
  ],
})
export class WeekSelectorComponent {
  weeks = input.required<Week[]>();
  selectedIndex = input<number>(0);
  weekSelected = output<number>();

  onSelectionChange(index: number): void {
    this.weekSelected.emit(index);
  }
}
