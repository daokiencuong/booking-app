import { Component } from '@angular/core';
import { Sidebar } from "../../features/admin/sidebar/sidebar";
import { Dashboard } from "../../features/admin/dashboard/dashboard";
import { SharedModule } from '../../shared/shared-module';
import { StaffManage } from "../../features/admin/staff-manage/staff-manage";
@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, SharedModule, StaffManage],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
