import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TimerComponent } from './timer/timer.component';
import { KeyboardControlsComponent } from './timer/keyboard-controls.component';
import { TimeHistoryComponent } from './history/history.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent, KeyboardControlsComponent, TimeHistoryComponent, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angcubelar');
}
