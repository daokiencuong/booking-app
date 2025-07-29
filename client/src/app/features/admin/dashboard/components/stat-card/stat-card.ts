import { Component, input } from '@angular/core';

@Component({
  selector: 'stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard {
  title = input.required<string>();
  value = input.required<string | number>();
  trend = input<boolean>();
}
