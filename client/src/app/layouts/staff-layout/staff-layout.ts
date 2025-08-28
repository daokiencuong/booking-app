import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StaffHeaderComponent } from '../../features/staff/header/header';
import { SideBarComponent } from '../../features/staff/side-bar/side-bar';

@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, StaffHeaderComponent],
  templateUrl: './staff-layout.html',
  styleUrl: './staff-layout.css',
})
export class StaffLayout {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarNavigate() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
      this.isSidebarOpen = false;
    }
  }
}
