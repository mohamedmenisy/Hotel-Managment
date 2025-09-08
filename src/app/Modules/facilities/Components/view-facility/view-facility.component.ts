import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-facility',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './view-facility.component.html',
  styleUrl: './view-facility.component.scss'
})
export class ViewFacilityComponent {
   constructor( public dialogRef: MatDialogRef<ViewFacilityComponent>,) {}
 onNoClick(): void {
    this.dialogRef.close();
  }

}
