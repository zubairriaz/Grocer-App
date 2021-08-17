import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import {MatTooltipModule} from "@angular/material/tooltip"
import {MatCardModule} from "@angular/material/card"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatDialogModule} from "@angular/material/dialog"


const modules = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatTooltipModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
