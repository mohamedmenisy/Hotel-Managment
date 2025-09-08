import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../../../../shared/delete-modal/delete-modal.component';
import { FacilitesService } from '../../Services/facilites.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewFacilityComponent } from '../view-facility/view-facility.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-facilities-list',
  standalone: true,
  imports: [MatButtonModule,MatSnackBarModule],
  templateUrl: './facilities-list.component.html',
  styleUrl: './facilities-list.component.scss',
})
export class FacilitiesListComponent {
  constructor(
    public dialog: MatDialog,
    public _FacilitesService: FacilitesService,
    private _snackBar: MatSnackBar
  ) {}

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '640px',
      height: '571px',
      data: {
        text: 'facilities',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletefacilities(id);
      }
    });
  }


    openDialogview() {
    const dialogRef = this.dialog.open(ViewFacilityComponent, {
      width: '640px',
      height: '571px',
      data: {
        text: 'facilities',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
     
      }
    });
  }

  deletefacilities(id: number) {
    this._FacilitesService.deletefacilities(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {     this._snackBar.open("an error occurred","",
                {
                  duration: 3000,
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  panelClass: ['error-snackbar']
              })
            console.log(error);
            
            },
      complete: () => {    this._snackBar.open('Delete successfully 🎉',"", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['success-snackbar']
        });},
    });
  }

}
