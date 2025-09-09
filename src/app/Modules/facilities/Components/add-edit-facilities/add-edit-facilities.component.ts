import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilitesService } from '../../Services/facilites.service';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AlertsService } from '../../../../shared/Services/alerts.service';
@Component({
  selector: 'app-add-edit-facilities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './add-edit-facilities.component.html',
  styleUrl: './add-edit-facilities.component.scss'
})

export class AddEditFacilitiesComponent {

  facilityId:any=null;
  constructor(private _facilities: FacilitesService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditFacilitiesComponent>, private alerts: AlertsService) {
    console.log(data);
    if(data.id !=null){
      this.facilityId = data.id;
      this.FacitiyForm.get("name")?.setValue(data.name);
    }
  }

  FacitiyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });


SubmitForm(data:FormGroup){
  if(this.facilityId != null){
  this._facilities.EditFacility(this.facilityId,data.value).subscribe({
      next:(res)=>{
        this.alerts.SweetalertSuccess("Facility Edit successfully🎉")
        this.onSubmit(true);
      },
      error:(err)=>{
        this.alerts.SweetalertError("An error occurred")
        this.onSubmit(false);
      },

    });
  }else{
    this._facilities.CreateFacility(data.value).subscribe({
      next:(res)=>{
        this.alerts.SweetalertSuccess("Facility Created successfully🎉")
        this.onSubmit(true);
      },
      error:(err)=>{
      this.alerts.SweetalertError("An error occurred")
      this.onSubmit(false);
      },

    });
  }
}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(flag:boolean): void {
    this.dialogRef.close(flag);
  }
}
