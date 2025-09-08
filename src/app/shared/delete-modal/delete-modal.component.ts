import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../Modules/facilities/Components/facilities-list/facilities-list.component';
import {
  MatDialog,
 
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatDialogContent,MatIconModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteModalComponent>,) {}


  
   onNoClick(): void {
    this.dialogRef.close();
  }
     onNoClickdelete(): void {
    this.dialogRef.close(true);
  }
}
