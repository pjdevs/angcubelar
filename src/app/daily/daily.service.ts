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
}
