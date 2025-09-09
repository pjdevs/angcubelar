import { Component, HostListener, input} from '@angular/core';
import { TimerComponent } from "./timer.component";

@Component({
  selector: 'app-keyboard-controls',
  template: ``
})
export class KeyboardControlsComponent {
  public timer = input.required<TimerComponent>();
  public behavior = input<'toggle' | 'start' | 'stop'>('toggle');

  @HostListener('window:keyup', ['$event'])
  protected onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      if (this.behavior() === 'toggle') {
        this.timer().toggle();
      } else if (this.behavior() === 'start') {
        this.timer().start();
      } else if (this.behavior() === 'stop') {
        this.timer().stop();
      }
      
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
