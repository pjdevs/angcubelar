import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.round(ms % 1000);
    const timeParts = [];

    if (hours > 0) {
      timeParts.push(hours);
    }

    if (minutes > 0) {
      timeParts.push(minutes);
    }

    timeParts.push(seconds);

    const timeString = timeParts.join(':'); 
    const millisString = millis.toString().padStart(3, '0');
    return `${timeString}.${millisString}`;
  }
}
