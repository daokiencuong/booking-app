import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-staff-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class StaffHeaderComponent {
  toggleSidebar = output<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
