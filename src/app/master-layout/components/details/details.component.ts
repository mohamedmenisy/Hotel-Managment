import { AlertsService } from './../../../shared/Services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from '../../../shared/Services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PaymentService } from '../../services/payment.service';
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
    CarouselModule,
    ReactiveFormsModule,
    TranslatePipe,
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
    {
      img: 'assets/icons/bedroom.png',
      label: 'Bedroom',
      arlable: 'غرفة نوم',
      number: 5,
    },
    {
      img: 'assets/icons/living-room.png',
      label: 'Living Room',
      arlable: 'غرفة معيشة',
      number: 1,
    },
    {
      img: 'assets/icons/bathroom.png',
      label: 'Bathroom',
      arlable: 'حمام',
      number: 3,
    },
    {
      img: 'assets/icons/dining-room.png',
      label: 'Dining Room',
      arlable: 'غرفة طعام',
      number: 1,
    },

    // Row 2
    {
      img: 'assets/icons/mbps.png',
      label: 'Mbps/s',
      arlable: 'ميغابت/ثانية',
      number: 10,
    },
    {
      img: 'assets/icons/unit-ready.png',
      label: 'Unit Ready',
      arlable: 'وحدة جاهزة',
      number: 7,
    },
    {
      img: 'assets/icons/refrigerator.png',
      label: 'Refrigerator',
      arlable: 'ثلاجة',
      number: 2,
    },
    {
      img: 'assets/icons/television.png',
      label: 'Television',
      arlable: 'تلفزيون',
      number: 4,
    },
  ];
  language: string = 'en';
  rating = 0;
  stars = [1, 2, 3, 4, 5];
  message = '';
  comment = '';
  roomid: string | null = null;
  discount:number=0;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    items: 1,
    dots: true,
    nav: false,
    rtl: false,
    navText: ['', ''],
    center: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoHeight: false,
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1024: { items: 1 },
    },
  };
  CreateBookingForm:FormGroup =new FormGroup({
    startDate:new FormControl(null,[Validators.required]),
    endDate:new FormControl(null,[Validators.required]),
  });
  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _alert: AlertsService,
    private lang: LanguageService,
    private _payment: PaymentService,
    private _router:Router
  ) {}
  ngOnInit(): void {
    this.roomid = this.route.snapshot.paramMap.get('id');
    console.log('Captured Room ID:', this.roomid);

    if (this.roomid) {
      this.fetchRoomDetails(this.roomid);
    } else {
      this.isLoading = false;
      this._alert.SweetalertError('No room ID provided!');
    }
    this.lang.currentLang$.subscribe({
      next: (res) => {
        this.language = res;
        if (res == 'ar') {
          this.refreshOwl(true);
        } else {
          this.refreshOwl(false);
        }
      },
    });
  }

  refreshOwl(value: boolean) {
    this.customOptions = { ...this.customOptions, rtl: value };
  }

  private fetchRoomDetails(id: string): void {
    this.isLoading = true;
    this.detailsService.Detailed(id).subscribe({
      next: (response: RoomResponse) => {
        this.roomDetails = response.data.room;
        console.log(response);

        this.facilitiesList = this.roomDetails.facilities || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this._alert.SweetalertError('Failed to load room details');
      },
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
  createBooking(room:Room){
    if(!this.CreateBookingForm.invalid){
    let myform = {...this.CreateBookingForm.value}
    myform.room=this.roomid;
    myform.startDate=myform.startDate.toISOString().split('T')[0];
    myform.endDate=myform.endDate.toISOString().split('T')[0];
    let start = new Date(myform.startDate);
    let end = new Date(myform.endDate);
    let diffMs = end.getTime() - start.getTime();
    let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let total = diffDays * room.price;
    myform.totalPrice = total * (1 - room.discount / 100)
    this._payment.BookRoom(myform).subscribe({
      next:(res)=>{
        console.log(res);
        this._alert.succeess('room booked successfuly');
       this._router.navigate([`/master/payment/${res.data.booking._id}`]);
      },
      error:(err)=>{},
      complete:()=>{},
    })
    }else{
    console.log("error");
    }

  }
}
