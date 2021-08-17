import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  template: ` <h2 mat-dialog-title class="mat-display-4">{{ data.title }}</h2>

    <div mat-dialog-content>
      <p>{{ data.content }}</p>
    </div>
    <div mat-dialog-actions>
      <span class="flex-spacer"></span>
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" cdkFocusInitial>
        {{ data.okText }}
      </button>
    </div>`,
})
export class SimpleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
