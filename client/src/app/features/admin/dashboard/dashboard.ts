import { Component } from '@angular/core';
import { StatCard } from "./components/stat-card/stat-card";

@Component({
  selector: 'admin-dashboard',
  imports: [StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
