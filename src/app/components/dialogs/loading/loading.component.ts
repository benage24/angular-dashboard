import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  constructor(
    private dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.stop) {
      this.dialogRef.close()
    }
  }


  ngOnInit(): void {
  }
}
