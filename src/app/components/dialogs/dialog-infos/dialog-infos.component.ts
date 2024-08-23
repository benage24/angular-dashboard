import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-infos',
  standalone: true,
  imports: [],
  templateUrl: './dialog-infos.component.html',
  styleUrl: './dialog-infos.component.css'
})
export class DialogInfosComponent {
  message!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DialogInfosComponent>
  ) { 
    if(data)
    this.message = data.message
  }

  ngOnInit(){
  
  }

  close(){
    this.dialogRef.close()
  }
}
