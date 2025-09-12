import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../../../../shared/delete-modal/delete-modal.component';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from '../../../../Core/auth/auth-routing.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator,MatPaginatorModule,PageEvent} from '@angular/material/paginator';
import { AlertsService } from '../../../../shared/Services/alerts.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
   imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        AuthRoutingModule,
        DatePipe,
      ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  displayedColumns: string[] = [
    'profileImage',
    'userName',
    'role',
    'phoneNumber',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Users!: any[];
 constructor(public dialog: MatDialog,public _users: UsersService,private _alerts: AlertsService){}
 ngOnInit(): void {
  this.getAllUsers()
 }
  getAllUsers(page: number = 1, size: number = this.pageSize) {
     this._users.getAllUsers(page, size).subscribe({
       next: (res) => {
         this.Users = res.data.users;
         this.totalCount = res.data.totalCount;
         this.dataSource = new MatTableDataSource(this.Users);
         this.dataSource.sort = this.sort;
       },
     });
   }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllUsers(this.pageIndex + 1, this.pageSize);
  }
  viewUser(data:any){

  }
}
