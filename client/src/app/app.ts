import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  TOAST_POSITIONS = TOAST_POSITIONS; 
}
