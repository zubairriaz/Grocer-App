import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog'
import { SimpleDialogComponent } from './simple-dialogue.component'

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
