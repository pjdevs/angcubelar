import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../services/local-storage/local-storage';

// TODO Make a data pipe for cube time

@Component({
    imports: [DatePipe, MatListModule, MatIconModule, MatDividerModule, MatButtonModule],
    selector: 'app-time-history',
    template: `
    <div class="time-history">
        <h2>History</h2>
        <mat-list role="list">
            @for (time of times(); track time.id; let index = $index) {
                <div class="time-entry">
                    <mat-list-item role="listitem">{{ index }} | {{ time.time | date:"HH:mm:ss.SSS" }}</mat-list-item>
                    <button matIconButton aria-label="Delete time" (click)="removeTime(index)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </div>
            }
        </mat-list>
    </div>
  `,
    styles: `
    .time-history {
        padding: 4px;
        background: rgb(240, 240, 240)
    }

    .time-entry {
        display: flex;
        flex-direction: row;
    }
  `
})
export class TimeHistoryComponent {
    private localStorageService = inject(LocalStorageService);

    protected readonly times: WritableSignal<TimeEntry[]> = signal([]);
    private nextId = 0;

    public constructor() {
        const jsonTimes = this.localStorageService.get(TIMES_STORAGE_KEY);

        if (jsonTimes !== null) {
            const times = JSON.parse(jsonTimes);
            this.times.set(times);
        }
    }

    public addTime(time: number) {
        this.times.update(timesArray => [...timesArray, new TimeEntry(this.nextId, time)]);
        this.nextId++;
        this.saveTimes();
    }

    public removeTime(index: number) {
        this.times.update(timesArray => timesArray.slice(0, index).concat(timesArray.slice(index + 1)));
        this.saveTimes();
    }

    private saveTimes() {
        const jsonTimes = JSON.stringify(this.times()); 
        this.localStorageService.save(TIMES_STORAGE_KEY, jsonTimes)
    }
}

class TimeEntry {
    public id: number;
    public time: number;

    public constructor(id: number, time: number) {
        this.id = id;
        this.time = time;
    }
}

const TIMES_STORAGE_KEY = "times";