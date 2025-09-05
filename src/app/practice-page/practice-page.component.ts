import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { KeyboardControlsComponent } from '../timer/keyboard-controls.component';
import { TimeHistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-practice-page',
  imports: [TimerComponent, KeyboardControlsComponent, TimeHistoryComponent],
  templateUrl: './practice-page.html',
  styleUrl: './practice-page.css'
})
export class PracticePage {

}
