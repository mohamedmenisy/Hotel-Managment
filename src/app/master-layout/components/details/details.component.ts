import { AlertsService } from './../../../shared/Services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Room,
  RoomResponse,
  Facility,
} from '../../../Modules/rooms/interfaces/room-details';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  roomDetails!: Room;
  facilitiesList: Facility[] = [];
  isLoading = true;
  nights = 2;
  dimage1: string = '../../../../assets/Images/d1.jpg';
  dimage2: string = '../../../../assets/Images/d2.jpg';
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
  roomid: string | null = null;
  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _alert: AlertsService
  ) {}
  ngOnInit(): void {
    this.roomid = this.route.snapshot.paramMap.get('id');
    console.log('Captured Room ID:', this.roomid);

    if (this.roomid) {
      this.fetchRoomDetails(this.roomid);
    } else {
      this.isLoading = false;
      this.showErrorSnackBar('No room ID provided!');
    }
  }
  
  private fetchRoomDetails(id: string): void {
    this.isLoading = true;
    this.detailsService.Detailed(id).subscribe({
      next: (response: RoomResponse) => {
        this.roomDetails = response.data.room;
        console.log(response);

        this.facilitiesList = this.roomDetails.facilities || [];

        this.isLoading = false;
        console.log('Room Details Fetched:', this.roomDetails);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching room details:', err);
        this.showErrorSnackBar('Failed to load room details');
      },
    });
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitRating() {
    if (this.rating === 0) {
      this._alert.SweetalertError(
        'Please select a star rating before submitting!'
      );
      return;
    } else {
      let data = {
        roomId: this.roomid,
        rating: this.rating,
        review: this.message,
      };
      //'Thank you for your feedback!'
      this.detailsService.RateRoom(data).subscribe({
        next: (res) => {
          console.log(res);

          this._alert.SweetalertSuccess(res.message);
          this.rating = 0;
          this.message = '';
        },
        error: (err) => {
          console.log(err);
          this._alert.SweetalertError(err.error.message);
        },
      });
    }

    // Reset after submit
  }
  submitComment() {
    let data = {
      roomId: this.roomid,
      comment: this.comment,
    };
    this.detailsService.CreateComment(data).subscribe({
      next: (res) => {
        console.log(res);

        this._alert.SweetalertSuccess(res.message);
      },
      error: (err) => {
        console.log(err);

        this._alert.SweetalertError(err.error.message);
      },
    });
  }

  getTotalCost(): number {
    if (!this.roomDetails) return 0;

    const total = this.roomDetails.price * this.nights;
    const discountAmount = this.roomDetails.discount
      ? (total * this.roomDetails.discount) / 100
      : 0;

    return total - discountAmount;
  }


}
