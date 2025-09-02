import { Component, HostListener, Input } from '@angular/core';
import { TimerComponent } from "./timer.component";

@Component({
  selector: 'keyboard-controls',
  template: ``
})
export class KeyboardControlsComponent {
  @Input({ required: true }) public timer!: TimerComponent;

  @HostListener('window:keyup', ['$event'])
  protected onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.timer.toggle();
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
