import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-staff-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class StaffHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
