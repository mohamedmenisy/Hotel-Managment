import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-room-view',
  standalone: true,
  imports: [MatIcon, DatePipe],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.scss',
})
export class RoomViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoomViewComponent>
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onNoClickdelete(): void {
    this.dialogRef.close(true);
  }
}
