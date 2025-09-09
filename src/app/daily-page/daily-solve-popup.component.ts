import { Component, computed, effect, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDialogClose,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    FormsModule,
    MatButton
  ],
  selector: 'app-daily-solve-dialog',
  template: `
    <h2 mat-dialog-title>Daily Solve Completion</h2>
    <mat-dialog-content>
        <mat-form-field>
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="username" />
        </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
        <button matButton [mat-dialog-close]="validatedUsername()" [disabled]="!isUsernameValid()" cdkFocusInitial>Submit Solve</button>
    </mat-dialog-actions>
  `
})
export class DailySolveDialogComponent {
//   private readonly dialogRef = inject(MatDialogRef<DailySolvePopupComponent>);
//   private readonly data = inject<DailySolvePopupComponentData>(MAT_DIALOG_DATA);
  protected readonly username = model("");
  protected readonly validatedUsername = computed(() => this.username().trim());
  protected readonly isUsernameValid = signal(false);

  constructor() {
    effect(() => {
        this.isUsernameValid.set(this.validatedUsername().length > 0 && this.validatedUsername().length < 256);
    });
  }
}

export interface DailySolvePopupComponentData {
  username: string;
}
