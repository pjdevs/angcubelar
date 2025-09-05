import { Component } from '@angular/core';
import { DailyScrambleComponent } from "../daily/daily-scramble.component";
import { TimerComponent } from "../timer/timer.component";

@Component({
  selector: 'app-daily-page',
  imports: [DailyScrambleComponent, TimerComponent],
  templateUrl: './daily-page.html',
  styleUrl: './daily-page.css'
})
export class DailyPage {

}
