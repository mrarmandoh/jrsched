import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="back-link">&larr; Back to Schedule</a>

    <section class="rules-section">
      <h2>Rules</h2>
      <ul class="rules-list">
        <li>
          No conversations whatsoever with other people about you working from home, believe me they
          will ruin it for us, not because they will want to do anything bad but just because the
          word getting out will just naturally ruin things
        </li>
        <li>
          If you're out that week, you lose your wfh day. Same if you're sick. It's not punishment,
          it's reducing risk
        </li>
        <li>
          Stay home, no home depot or islas canarias trips, unless of course it's during your lunch
          time
        </li>
        <li>If your day falls on a holiday, tough luck</li>
        <li>
          As soon as I get challenged by anyone, we will stop this until safe to do again
        </li>
        <li>
          If asked by others, you had a situation and worked it out with me. If needed, you would
          have to follow up with requesting a leave absence, just in case anyone decides to follow up
        </li>
        <li>No cameras when you're home, and if you get on camera use a background</li>
        <li>Be mindful of your dog barking or any other revealing noises</li>
        <li>
          You accidentally (or not) mess up your order, you're coming to the office that day
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .back-link {
        display: inline-block;
        margin-bottom: 20px;
        font-size: 0.95rem;
        font-weight: 600;
        color: #1e40af;
        text-decoration: none;
        transition: color 0.2s;
      }
      .back-link:hover {
        color: #1d4ed8;
      }
      .rules-section {
        padding: 24px;
        background: #dcfce7;
        border: 1px solid #4ade80;
        border-radius: 8px;
      }
      .rules-section h2 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #166534;
        margin: 0 0 16px 0;
      }
      .rules-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .rules-list li {
        position: relative;
        padding-left: 20px;
        font-size: 0.9rem;
        line-height: 1.6;
        color: #14532d;
      }
      .rules-list li::before {
        content: "\\2022";
        position: absolute;
        left: 0;
        color: #22c55e;
        font-weight: 700;
      }
      @media (max-width: 640px) {
        .rules-section {
          padding: 16px;
        }
      }
    `,
  ],
})
export class RulesComponent {}
