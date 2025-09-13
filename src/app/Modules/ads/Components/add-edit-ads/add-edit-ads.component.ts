import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AlertsService } from '../../../../shared/Services/alerts.service';
import { AddEditFacilitiesComponent } from '../../../facilities/Components/add-edit-facilities/add-edit-facilities.component';
import { FacilitesService } from '../../../facilities/Services/facilites.service';
import { AdsService } from '../../Services/ads.service';
import { RoomsService } from '../../../rooms/Services/rooms.service';

@Component({
  selector: 'app-add-edit-ads',
  standalone: true,
   imports: [
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     MatIconModule,
     MatInputModule,
     MatFormFieldModule,
     MatSelectModule
   ],
  templateUrl: './add-edit-ads.component.html',
  styleUrl: './add-edit-ads.component.scss'
})
export class AddEditAdsComponent {
  adsModel:any|null=null;
  roomslist:any[]=[];
  constructor(private _AdsService: AdsService,private _rooms:RoomsService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditAdsComponent>, private alerts: AlertsService) {
    if(data.modalData !=null){
      this.adsModel = data.modalData;
      console.log(this.adsModel);
      console.log(this.adsModel.room.roomNumber);

      this.AdsForm.patchValue({
        room:this.adsModel.room._id,
        discount:this.adsModel.room.discount,
        isActive:this.adsModel.isActive,
      })
    }
  }

  AdsForm = new FormGroup({
    room: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllRooms();
  }
SubmitForm(data:FormGroup){
  if(this.adsModel != null){
    let mydata = {
      isActive:data.value.isActive,
      discount:data.value.discount
    }
  this._AdsService.EditAds(this.adsModel._id,mydata).subscribe({
      next:(res)=>{
        console.log(res);

        this.alerts.SweetalertSuccess("Ads Edit successfully🎉")
        this.onSubmit(true);
      },
      error:(err)=>{
        console.log(err);

        this.alerts.SweetalertError("An error occurred")
        this.onSubmit(false);
      },

    });
  }else{
    this._AdsService.CreateAds(data.value).subscribe({
      next:(res)=>{
        this.alerts.SweetalertSuccess("Ads Created successfully🎉")
        this.onSubmit(true);
      },
      error:(err)=>{
        console.log(err);

      this.alerts.SweetalertError(err.error.message)
      this.onSubmit(false);
      },

    });
  }
}
  getAllRooms(){
    this._rooms.getrooms().subscribe({
      next:(res)=>{
        this.roomslist=res.data.rooms;
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(flag:boolean): void {
    this.dialogRef.close(flag);
  }
}
