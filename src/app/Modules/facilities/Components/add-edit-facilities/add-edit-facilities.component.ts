import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilitesService } from '../../Services/facilites.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-edit-facilities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-facilities.component.html',
  styleUrl: './add-edit-facilities.component.scss'
})

export class AddEditFacilitiesComponent {

facilityId:number = 0

constructor(private F1:FacilitesService,private act:ActivatedRoute){
this.facilityId= act.snapshot.params['id']
}

FacitiyForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(10)])
});


Missions(d: FormGroup){ 

  if(this.facilityId && this.facilityId > 0) { //Update Exist
 
  this.F1.Editor(this.facilityId,this.FacitiyForm.value).subscribe({
  next:(Res)=> {console.log("Mission Accomplished !"+Res)},
  error:(Res)=> {console.error("Aborting!"+Res)},
  complete:()=> {},
  
})
}

else{  // Create New
  
  this.F1.Creator(this.FacitiyForm.value).subscribe({
 
  next:(Res)=> {console.log("Mission Accomplished !"+Res)},
  error:(Res)=> {console.error("Aborting!"+Res)},
  complete:()=> {},
  
})
}


}

}
