import { Component, Inject } from '@angular/core';
import { adsDetails } from '../../Interfaces/ads-details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomViewComponent } from '../../../rooms/Components/room-view/room-view.component';
import { AdsService } from '../../Services/ads.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-ads-view',
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
  templateUrl: './ads-view.component.html',
  styleUrl: './ads-view.component.scss'
})
export class AdsViewComponent {
  constructor(private _ads:AdsService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RoomViewComponent>){
  }
  ngOnInit(): void {
    this.getRoom();
  }
  response!:adsDetails;
  getRoom(){
    this._ads.getDetails(this.data.id).subscribe({
      next:(res:adsDetails)=>{
        this.response=res;
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
