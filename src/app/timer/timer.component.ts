import { Component, computed, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-timer',
  template: `
    <p> {{ displayElaspedTime() | date:"HH:mm:ss.SSS" }} </p>
  `,
  styles: `
  p {
    font-size: 4em;
  }
  `
})
export class TimerComponent {
  public readonly isStarted = signal(false);
  public readonly timeDone = output<number>();

  protected readonly displayElaspedTime = computed(() => this.elapsedTime() - 3600000.0);
  private readonly elapsedTime = signal(0.0);
  private intervalHandle = 0;

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
    this.isStarted.set(false);
    this.timeDone.emit(this.displayElaspedTime());
  }

  public start() {
    if (this.isStarted()) {
      return;
    }

    const startTime = Date.now();
    this.intervalHandle = setInterval(
      () => {
        this.elapsedTime.set(Date.now() - startTime);
      },
      10
    );
    this.isStarted.set(true);
  }
}
