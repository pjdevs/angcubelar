import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DailyService } from './daily.service';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-daily-scramble',
  imports: [AsyncPipe],
  template: `
    <p>
      @if (error) {
        {{ error }}
      } @else {
        @if (scramble$ | async; as scramble) {
          {{ scramble }}
        } @else {
          Waiting for daily scramble...
        }
      }
    </p>
  `,
  styles: `
    p {
      font-size: 1.5em;
    }
  `
})
export class DailyScrambleComponent {
  private dailyService = inject(DailyService);
  
  protected scramble$: Observable<string>;
  protected error: string | null = null;
  
  constructor() {
    this.scramble$ = this.dailyService.getDailyScramble()
    .pipe(
      catchError(error => {
        this.error = error;
        return of('');
      })
    );
  }
}
