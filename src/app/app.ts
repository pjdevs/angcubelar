import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from './timer/timer.component';
import { ButtonControlsComponent } from './timer/button-controls.component';
import { KeyboardControlsComponent } from './timer/keyboard-controls.component';
import { TimeHistoryComponent } from './history/history.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent, ButtonControlsComponent, KeyboardControlsComponent, TimeHistoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angcubelar');
}
