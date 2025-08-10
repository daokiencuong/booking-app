import { Component } from '@angular/core';
import { Sidebar } from "../../features/admin/sidebar/sidebar";
import { Footer } from '../../shared/footer/footer';
import { ServiceManage } from "../../features/admin/service-manage/service-manage";
@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Footer, ServiceManage],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
