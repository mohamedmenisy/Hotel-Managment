import { RoomsService } from './../../Services/rooms.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FacilitesService } from './../../../facilities/Services/facilites.service';
import { MatSelectModule } from '@angular/material/select';
import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IFacility } from '../../../facilities/Interfaces/IFacility';
import { NgFor } from '@angular/common';
import { AlertsService } from '../../../../shared/Services/alerts.service';


@Component({
  selector: 'app-add-edit-rooms',
  standalone: true,
  imports: [FormsModule,MatSelectModule,NgFor ,NgxDropzoneModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './add-edit-rooms.component.html',
  styleUrl: './add-edit-rooms.component.scss'
})
export class AddEditRoomsComponent {
    facilites!: IFacility[];
    files: File[] = [];
    imgSrc:any=null;
    roomid:string = '';
    isloading:boolean=false;
    constructor(private alert:AlertsService,private _router:Router,private active:ActivatedRoute,private _FacilitesService:FacilitesService,private _roomsService:RoomsService){
    this.roomid = active.snapshot.params['id'];
    if (this.roomid != '')
    this.getRoomByid(this.roomid);
    }
    rooms:FormGroup = new FormGroup({
    roomNumber:new FormControl(null,[Validators.required]),
    price:new FormControl(null,[Validators.required]),
    capacity:new FormControl(null,[Validators.required]),
    facilities:new FormControl(null,[Validators.required]),
    imgs:new FormControl(null,[Validators.required]),
    discount:new FormControl(null,[Validators.required]),
    });
    ngOnInit(): void {
      this.getFacilities();
    }
    getFacilities(){
      this._FacilitesService.getAllFacilites(1,100000000).subscribe({
        next:(res)=>{
          this.facilites = res.data.facilities;
        }
      })
    }
    submit(rooms:FormGroup){
      if(this.roomid != ''){
        this.updateRoom(rooms);
      }else{
        this.addRoom(rooms);
      }
    }
  addRoom(rooms:FormGroup){
    this.isloading=true;
    const formData = new FormData();
    formData.append('roomNumber', rooms.value.roomNumber);
    formData.append('price', rooms.value.price);
    formData.append('capacity', rooms.value.capacity);
    formData.append('discount', rooms.value.discount);
    this.files.forEach(file => {
    formData.append('imgs', file);
    });
    const facilities: string[] = Array.isArray(rooms.value.facilities)
    ? rooms.value.facilities
    : [rooms.value.facilities];
    console.log(facilities);

    facilities.forEach((f: string) => {
      formData.append('facilities[]', f);
    });
    this._roomsService.createRoom(formData).subscribe({
    next: (res)=>{
      this.alert.SweetalertSuccess("Room Created successfully🎉");
      this.isloading=false;
    },
    error: (err) => {
      this.isloading=false;
      this.alert.SweetalertError();
    }
    });
  }
  updateRoom(rooms:FormGroup){
    this.isloading=true;
    const formData = new FormData();
    formData.append('roomNumber', rooms.value.roomNumber);
    formData.append('price', rooms.value.price);
    formData.append('capacity', rooms.value.capacity);
    formData.append('discount', rooms.value.discount);
    this.files.forEach(file => {
    formData.append('imgs', file);
    });
    const facilities: string[] = Array.isArray(rooms.value.facilities)
    ? rooms.value.facilities
    : [rooms.value.facilities];
    console.log(facilities);

    facilities.forEach((f: string) => {
      formData.append('facilities[]', f);
    });
    this._roomsService.UpdateRoom(this.roomid,formData).subscribe({
    next: (res)=>{
    this.isloading=false;
    this.alert.SweetalertSuccess("Room Updated successfully🎉");
    },
    error: (err) => {
      this.isloading=false;
      this.alert.SweetalertError();
    }
    });
  }
  getRoomByid(id:string){
      this._roomsService.getRoomByid(id).subscribe({
        next:async (res)=>{
          console.log(res);
      const room = res.data.room;
        this.rooms.patchValue({
        roomNumber: room.roomNumber,
        price: room.price,
        capacity:room.capacity,
        discount: room.discount,
        facilities: room.facilities.map((f: any) => f._id),
        imgs: room.images
      });
      this.files = [];
      for (const url of room.images) {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split('/').pop() || 'image.jpg';
        const file = new File([blob], fileName, { type: blob.type });
        this.files.push(file);
      }
      }
      });
  }
  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }
  onRemove(file:File) {
    this.files = this.files.filter(f => f !== file);
  }
}
