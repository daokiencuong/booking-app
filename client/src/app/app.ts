import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayout } from "./layouts/admin-layout/admin-layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
