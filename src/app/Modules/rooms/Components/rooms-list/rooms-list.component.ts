import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../../../../shared/delete-modal/delete-modal.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from '../../../../Core/auth/auth-routing.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { RoomsService } from '../../Services/rooms.service';
import { AlertsService } from '../../../../shared/Services/alerts.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-rooms-list',
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
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
})
export class RoomsListComponent {
  constructor(public dialog: MatDialog,public _RoomsService: RoomsService,private _alert: AlertsService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  facilites!: any[];
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'roomNumber',
    'images',
    'price',
    'discount',
    'capacity',
    'facilities',
    'actions',
  ];

  ngOnInit(): void {
        this.getAllrooms();
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllrooms(page: number = 1, size: number = this.pageSize) {
    this._RoomsService.getAllrooms(page, size).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data.rooms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalCount = res.data.totalCount;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllrooms(this.pageIndex + 1, this.pageSize);
  }

  deleteRoom(id: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '640px',
      height: '571px',
      data: {
        text: 'rooms',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRoomFunc(id);
      }
    });
  }

  deleteRoomFunc(id: string) {
    this._RoomsService.deleterooms(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
      this._alert.SweetalertError();
        console.log(error);
      },
      complete: () => {
        this._alert.SweetalertSuccess("Deleted successfully🎉");
        this.getAllrooms();
      },
    });
  }
}
