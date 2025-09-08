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
import { Router } from '@angular/router';
import { IFacility } from '../../../facilities/Interfaces/IFacility';
import { NgFor } from '@angular/common';


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
    constructor(private _snackBar:MatSnackBar,private _router:Router,private _FacilitesService:FacilitesService,private _roomsService:RoomsService){}
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
    const formData = new FormData();
    // إضافة النصوص
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
      console.log(res);
    },
    error: (err) => {
      console.log(err);
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
