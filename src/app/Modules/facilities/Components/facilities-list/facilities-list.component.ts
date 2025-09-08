import { Component, Inject, ViewChild } from '@angular/core';
import {MatDialog
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../../../../shared/delete-modal/delete-modal.component';
import { FacilitesService } from '../../Services/facilites.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewFacilityComponent } from '../view-facility/view-facility.component';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from '../../../../Core/auth/auth-routing.module';
import { IFacility, IApiResponse, IFacilitiesData } from '../../Interfaces/IFacility';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-facilities-list',
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
    MatSnackBarModule
  ],
  templateUrl: './facilities-list.component.html',
  styleUrl: './facilities-list.component.scss',
})
export class FacilitiesListComponent {
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;

  displayedColumns: string[] = [
    'name',
    'createdBy',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  dataSource!: MatTableDataSource<IFacility>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  facilites!: IFacility[];

    constructor(
    public dialog: MatDialog,
    public _FacilitesService: FacilitesService,
    private _snackBar: MatSnackBar
  ) {
     this.getAllFacilites();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllFacilites(page: number = 1, size: number = this.pageSize) {
    this._FacilitesService.getAllFacilites(page, size).subscribe({
      next: (res: IApiResponse<IFacilitiesData>) => {
        this.facilites = res.data.facilities;
        this.totalCount = res.data.totalCount;
        this.dataSource = new MatTableDataSource(this.facilites);
        this.dataSource.sort = this.sort;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllFacilites(this.pageIndex + 1, this.pageSize);
  }

  // viewFacility(id: string) {
  //   console.log('View facility with ID:', id);
  //   // Implement navigation to the facility detail view if needed
  // }

  // editFacility(id: string) {
  //   console.log('Edit facility with ID:', id);
  //   // Implement navigation to the facility edit view if needed
  // }

  // deleteFacility(id: string) {
  //   console.log('Delete facility with ID:', id);
  //   // Implement facility deletion logic if needed
  // }


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
