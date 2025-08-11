import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DayPilotModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
