// Angular
import {Component, Inject} from '@angular/core';

// Angular Material
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  noButton: string;
  yesButton: string;
  textMessage: string;
  value : string;
}

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})

export class InputDialogComponent {
  placeholder = "";

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.placeholder = data.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
