import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private snackBar: MatSnackBar, private dialogue: MatDialog) {}
  showToast(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || { duration: 7000, politeness: 'assertive' }
    )
  }
}
