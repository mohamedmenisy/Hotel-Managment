import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) {}
  succeess(message:string){
    //successfully🎉
    this._snackBar.open(`${message}`, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
  }
  Error(message?:string){
    this._snackBar.open(message ||'an error occurred', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
    });
  }

  SweetalertSuccess(message:string){
      Swal.fire({
        title: message +' successfully',
        icon: "success",
        draggable: false
      });
  }
   SweetalertError(message?:string){
     Swal.fire({
        title: message || 'an error occurred',
        icon: "error",
        draggable: false
      });
  }
}
