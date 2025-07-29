import { Component } from '@angular/core';
import { Sidebar } from "../../features/admin/sidebar/sidebar";
import { Dashboard } from "../../features/admin/dashboard/dashboard";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Dashboard, Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
