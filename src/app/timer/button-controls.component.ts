import { Component, Input } from '@angular/core';
import { TimerComponent } from "./timer.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
    imports: [MatIconModule, MatDividerModule, MatButtonModule],
    selector: 'button-controls',
    template: `
      <button matFab extended (click)="timer.toggle()">
        <mat-icon>timer</mat-icon>
        @if (timer.isStarted()) {
          Stop Timer
        } @else {
          Start Timer
        }
      </button>
    `
})
export class ButtonControlsComponent {
  @Input({ required: true }) public timer!: TimerComponent;
}
