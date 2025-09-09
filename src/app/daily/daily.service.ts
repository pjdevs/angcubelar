import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyService {
  private http = inject(HttpClient); 

  public getDailyScramble() : Observable<string> {
    return this.http
      .get('http://localhost:3000/daily/scramble', { responseType: "text" })
      .pipe(
        retry({
          resetOnSuccess: true,
          count: 3,
          delay: 2000
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('[DailyService::getDailyScramble] Request failed:', error.message);
          return throwError(() => "Daily scramble is unavailable. Please retry later.");
        })
      );
  }

  public addDailyTime(solve: DailySolve) : Observable<DailySolve> {
    return this.http
      .post<DailySolve>('http://localhost:3000/daily/scramble', solve)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('[DailyService::addDailyTime] Request failed:', error.message);
          return throwError(() => "Could not submit daily time. You can only submit one time per day. Otherwise, please retry later.");
        })
      );
  }

  public getDailyLeaderboard() : Observable<DailyLeaderboard> {
    return this.http
      .get<DailyLeaderboard>('http://localhost:3000/daily/leaderboard')
      .pipe(
        retry({
          resetOnSuccess: true,
          count: 3,
          delay: 2000
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('[DailyService::getDailyLeaderboard] Request failed:', error.message);
          return throwError(() => "Daily leaderbaord is unavailable. Please retry later.");
        })
      );
  }
}

export interface DailyLeaderboard {
  solves: DailySolve[]
}

export interface DailySolve {
  username: string,
  time: number
}
