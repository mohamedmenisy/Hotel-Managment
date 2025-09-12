import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    CommonModule,      
    MatIconModule,     
    DatePipe,          
    ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
})
export class BookingDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookingDetailsComponent>
  ) {
    console.log('Booking Data:', this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
