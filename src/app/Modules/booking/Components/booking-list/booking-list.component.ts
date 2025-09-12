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
import { BookingService } from '../../Services/booking.service';
@Component({
  selector: 'app-booking-list',
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
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent {
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  displayedColumns: string[] = [
    'Room.N',
    'Client Name',
    'Price',
    'Start Date',
    'End Date',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Booking!: any[];
 constructor(public dialog: MatDialog,public _booking: BookingService,private _alerts: AlertsService){}
 ngOnInit(): void {
  this.getAllBooking()
 }
  getAllBooking(page: number = 1, size: number = this.pageSize) {
     this._booking.getAllBooking(page, size).subscribe({
       next: (res) => {
         this.Booking = res.data.booking;
         this.totalCount = res.data.totalCount;
         this.dataSource = new MatTableDataSource(this.Booking);
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
    this.getAllBooking(this.pageIndex + 1, this.pageSize);
  }
viewBooking(data:any){

}

  deleteModal(id: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '640px',
      height: '571px',
      data: {
        text: 'Booking',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBooking(id);
      }
    });
  }

  deleteBooking(id: string) {
    this._booking.Ondelete(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        this._alerts.SweetalertError('an error occurred');

      },
      complete: () => {
        this._alerts.SweetalertSuccess("Deleted successfully🎉")
        this.getAllBooking();
      },
    });
  }
}
