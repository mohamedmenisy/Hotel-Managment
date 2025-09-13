import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../Modules/users/Services/users.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(1.5)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 })) 
      ])
    ])
  ]
})
export class ProfileComponent {
  userData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProfileComponent>,private _users:UsersService) {}
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._users.getUserProfile(this.data.id).subscribe({
      next:(res)=>{
        this.userData=res.data.user
        console.log(res);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
