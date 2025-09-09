import { Component, output, signal } from '@angular/core';
import { TimePipe } from "../pipes/timer/timer-pipe";

@Component({
  imports: [TimePipe],
  selector: 'app-timer',
  template: `
    <p> {{ elapsedTime() | timer }} </p>
  `,
  styles: `
  p {
    font-size: 6em;
  }
  `
})
export class TimerComponent {
  public readonly isStarted = signal(false);
  public readonly timeDone = output<number>();
  public readonly timeStarted = output<void>();

  protected readonly elapsedTime = signal(0.0);
  private intervalHandle = 0;
  private startTime = 0.0;

  public toggle() {
    if (this.isStarted()) {
      this.stop();
    } else {
      this.start();
    }
  }

  public stop() {
    if (!this.isStarted()) {
      return;
    }

    clearInterval(this.intervalHandle);

    this.setElapsedTimeSinceStartTime();
    this.isStarted.set(false);
    this.timeDone.emit(this.elapsedTime());
  }

  public start() {
    if (this.isStarted()) {
      return;
    }

    this.startTime = Date.now();
    this.intervalHandle = setInterval(() => this.setElapsedTimeSinceStartTime(), 10);
    this.isStarted.set(true);
    this.timeStarted.emit();
  }

  private setElapsedTimeSinceStartTime() {
    this.elapsedTime.set(this.getElaspedTimeSinceStartTime());
  }

  private getElaspedTimeSinceStartTime() : number {
    return Date.now() - this.startTime;
  }
}
