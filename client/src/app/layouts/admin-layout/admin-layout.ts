import { Component } from '@angular/core';
import { Sidebar } from "../../features/admin/sidebar/sidebar";
import { Footer } from '../../shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Footer, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
