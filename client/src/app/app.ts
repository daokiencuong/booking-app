import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayout } from "./layouts/admin-layout/admin-layout";
import { SharedModule } from './shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminLayout, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
