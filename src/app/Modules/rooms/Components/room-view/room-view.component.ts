import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RoomsService } from '../../Services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { RoomResponse } from '../../interfaces/room-details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-room-view',
  standalone: true,
  imports: [CarouselModule,NgFor,NgIf,MatIconModule],
    animations: [
      trigger('zoomInOut', [
        transition(':enter', [
          style({ transform: 'scale(1.5)', opacity: 0 }),
          animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
        ])
      ])
    ],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.scss'
})
export class RoomViewComponent {
  constructor(private _room:RoomsService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RoomViewComponent>){
  }
  ngOnInit(): void {
    this.getRoom();
  }
  response!:RoomResponse;
  customOptions: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  smartSpeed: 700,
  items: 1,
  dots: false,
  nav: false,
  navText: ['',''],
  center: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  autoHeight: false,
  responsive: {
    0: { items: 1 },
    768: { items: 1 },
    1024: { items: 1 }
  }
};
  getRoom(){
    this._room.getRoomByid(this.data.id).subscribe({
      next:(res:RoomResponse)=>{
        console.log(res);

        this.response=res;
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
