import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  message(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}