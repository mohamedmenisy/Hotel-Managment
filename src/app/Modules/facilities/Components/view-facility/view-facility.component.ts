import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-facility',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './view-facility.component.html',
  styleUrl: './view-facility.component.scss',
})
export class ViewFacilityComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ViewFacilityComponent>) {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
