import { Component } from '@angular/core';
import { Sidebar } from "../../features/admin/sidebar/sidebar";
import { Dashboard } from "../../features/admin/dashboard/dashboard";
import { StaffManage } from "../../features/admin/staff-manage/staff-manage";
import { Footer } from '../../shared/footer/footer';
import { ServiceManage } from "../../features/admin/service-manage/service-manage";
@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Footer, StaffManage, ServiceManage],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
