import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TimePipe } from "../pipes/timer/timer-pipe";

@Component({
    imports: [MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, TimePipe],
    selector: 'app-time-history',
    template: `
    <div class="time-history">
        <h2>History</h2>
        <h2>Count: {{ times().length }}</h2>
        <h2>Mean: {{ times().length > 0 ? (mean() | timer) : "NA" }}</h2>

        <table mat-table [dataSource]="times()">
            <ng-container matColumnDef="index">
                <th mat-header-cell *matHeaderCellDef> Solve </th>
                <td mat-cell *matCellDef="let i = index;"> {{ times().length - i - 1 }} </td>
            </ng-container>

            <ng-container matColumnDef="time">
                <th mat-header-cell *matHeaderCellDef> Time </th>
                <td mat-cell *matCellDef="let element;"> {{ element.time | timer }} </td>
            </ng-container>

            <ng-container matColumnDef="delete">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let element; let i = index;">
                    <button matIconButton aria-label="Delete time" (click)="removeTime(i)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div> 
  `,
    styles: `
    .time-entry {
        display: flex;
        flex-direction: row;
    }

    table {
        background: none;
    }
  `
})
export class TimeHistoryComponent {
    private localStorageService = inject(LocalStorageService);

    protected readonly times: WritableSignal<TimeEntry[]> = signal([]);
    protected readonly mean: WritableSignal<number> = signal(0.0);

    protected readonly displayedColumns = ['index', 'time', 'delete']

    public constructor() {
        this.loadTimes();
        this.computeMeans();
    }

    public addTime(time: number) {
        const newTime = new TimeEntry(time, new Date());
        this.times.update(timesArray => [newTime, ...timesArray]);
        this.saveTimes();
        this.computeMeans();
    }

    public removeTime(index: number) {
        this.times.update(timesArray => timesArray.slice(0, index).concat(timesArray.slice(index + 1)));
        this.saveTimes();
        this.computeMeans();
    }

    private loadTimes() {
        const jsonTimes = this.localStorageService.get(TIMES_STORAGE_KEY);

        if (jsonTimes !== null) {
            const times = JSON.parse(jsonTimes);
            this.times.set(times);
        }
    }

    private computeMeans() {
        const timeSum = this.times().reduce((sum, timeEntry) => sum + timeEntry.time, 0.0);
        const mean = timeSum / this.times().length; 
        this.mean.set(mean);
    }

    private saveTimes() {
        const jsonTimes = JSON.stringify(this.times()); 
        this.localStorageService.save(TIMES_STORAGE_KEY, jsonTimes)
    }
}

class TimeEntry {
    public time: number;
    public date: Date;

    public constructor(time: number, date: Date) {
        this.time = time;
        this.date = date;
    }
}

const TIMES_STORAGE_KEY = "times";