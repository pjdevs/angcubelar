import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DailyScrambleComponent } from "../daily/daily-scramble.component";
import { TimerComponent } from "../timer/timer.component";
import { KeyboardControlsComponent } from '../timer/keyboard-controls.component';
import { DailyLeaderboard, DailyService, DailySolve } from '../daily/daily.service';
import { MatTableModule } from '@angular/material/table';
import { TimePipe } from '../pipes/timer/timer-pipe';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DailySolveDialogComponent } from './daily-solve-popup.component';

// TODO cleanup all this daily page as it was just to see if the daily works

@Component({
  selector: 'app-daily-page',
  imports: [DailyScrambleComponent, TimerComponent, TimePipe, KeyboardControlsComponent, MatTableModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './daily-page.html',
  styleUrl: './daily-page.css'
})
export class DailyPage {
  private readonly dailyService = inject(DailyService);

  protected readonly isReady = signal(false);
  @ViewChild(TimerComponent) protected readonly timer!: TimerComponent;

  protected readonly leaderboard = signal<DailySolve[]>([]);
  protected readonly displayedColumns = ['rank', 'username', 'time'];

  readonly dialog = inject(MatDialog);

  constructor() {
    this.fecthLeaderboard();
  }

  public ready() {
    this.isReady.set(true);
    this.timer.start();
  }

  public done(time: number) {
    if (!this.isReady()) {
      return;
    }

    this.dialog.open(DailySolveDialogComponent, {
      closeOnNavigation: false,
      disableClose: true
    })
      .afterClosed()
      .subscribe((username: string) => {
        this.completeDailySolve(username, time);
      });

  }

  private fecthLeaderboard() {
    this.dailyService.getDailyLeaderboard()
      .pipe(
        catchError(() => {
          return of<DailyLeaderboard>({ solves: [] });
        })
      )
      .subscribe(leaderboard => {
        this.leaderboard.set(leaderboard.solves)
      });
  }

  private completeDailySolve(username: string, time: number) {
    this.dailyService.addDailyTime({ username: username, time: time })
      .pipe(
        catchError(err => {
          console.error(`Could not complete daily solve: ${err}.`);
          return of();
        })
      )
      .subscribe(() => {
        this.fecthLeaderboard();
      });
  }
}
