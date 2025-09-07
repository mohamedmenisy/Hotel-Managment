import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilitesService } from '../../Services/facilites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  facilityId: number = 0

  constructor(private F1: FacilitesService, private act: ActivatedRoute, private r: Router, private snack: MatSnackBar) {
    this.facilityId = act.snapshot.params['id']
  }

  FacitiyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(10)])
  });


  Missions(d: FormGroup) {

    if (this.facilityId && this.facilityId > 0) { //Update Exist

      this.F1.Editor(this.facilityId, this.FacitiyForm.value).subscribe({
        next: (Res) => {
          console.log("Mission Accomplished !" + Res);
          this.snack.open('Facility updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (issue) => {
          console.error("Aborting!" + issue);
          this.snack.open('Update failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        },
        complete: () => { this.r.navigate(['/dashboard/facilities']); }, //Navigate to table

      })
    }

    else {  // Create New

      this.F1.Creator(this.FacitiyForm.value).subscribe({

        next: (Res) => {
          console.log("Mission Accomplished !" + Res);
          this.snack.open('Facility created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },

        error: (issue) => {
          console.error("Aborting!" + issue);
          this.snack.open('Creation failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        },
        complete: () => { this.r.navigate(['/dashboard/facilities']); }, //Navigate to table

      })
    }


  }

}
