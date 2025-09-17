import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Room, RoomResponse, Facility } from '../../../Modules/rooms/interfaces/room-details';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  roomDetails!: Room;
  facilitiesList: Facility[] = [];
  isLoading = true;
  nights = 2;

  icons = [
  // Row 1
  { img: 'assets/icons/bedroom.png', label: 'Bedroom', number: 5 },
  { img: 'assets/icons/living-room.png', label: 'Living Room', number: 1 },
  { img: 'assets/icons/bathroom.png', label: 'Bathroom', number: 3 },
  { img: 'assets/icons/dining-room.png', label: 'Dining Room', number: 1 },

  // Row 2
  { img: 'assets/icons/mbps.png', label: 'Mbps/s', number: 10 },
  { img: 'assets/icons/unit-ready.png', label: 'unit-ready', number: 7 },
  { img: 'assets/icons/refrigerator.png', label: 'Refrigerator', number: 2 },
  { img: 'assets/icons/television.png', label: 'Television', number: 4 },
];

rating = 0;
stars = [1, 2, 3, 4, 5];
message = '';
comment = '';

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  private fetchRoomDetails(id: string): void {
    this.isLoading = true;
    this.detailsService.Detailed(id).subscribe({
      next: (response: RoomResponse) => {
        this.roomDetails = response.data.room;

        this.facilitiesList = this.roomDetails.facilities || [];

        this.isLoading = false;
        console.log('Room Details Fetched:', this.roomDetails);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching room details:', err);
        this.showErrorSnackBar('Failed to load room details');
      }
    });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }


setRating(value: number) {
  this.rating = value;
}

submitRating() {
  if (this.rating === 0) {
    this.snackBar.open('Please select a star rating before submitting!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
    return;
  }

  console.log('Rating Submitted:', this.rating);
  console.log('Message:', this.message);

  this.snackBar.open('Thank you for your feedback!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['success-snackbar']
  });

  // Reset after submit
  this.rating = 0;
  this.message = '';
}


  getTotalCost(): number {
    if (!this.roomDetails) return 0;

    const total = this.roomDetails.price * this.nights;
    const discountAmount = this.roomDetails.discount
      ? (total * this.roomDetails.discount) / 100
      : 0;

    return total - discountAmount;
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    console.log('Captured Room ID:', roomId);

    if (roomId) {
      this.fetchRoomDetails(roomId);
    } else {
      this.isLoading = false;
      this.showErrorSnackBar('No room ID provided!');
    }
  }
}
