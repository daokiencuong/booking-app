import { Component, input } from '@angular/core';

@Component({
  selector: 'admin-section',
  imports: [],
  templateUrl: './admin-section.html',
  styleUrl: './admin-section.css'
})
export class AdminSection {
  sectionTitle = input.required<string>();
}
