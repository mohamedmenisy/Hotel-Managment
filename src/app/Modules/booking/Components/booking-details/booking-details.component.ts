import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-details',
  standalone: true,
    imports: [
      MatIconModule,DatePipe,CurrencyPipe
    ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss'
})
export class BookingDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<BookingDetailsComponent>) {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
