import { IFacility ,IFacilitiesData , IApiResponse} from './../../Interfaces/IFacility';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../../../../shared/delete-modal/delete-modal.component';
import { FacilitesService } from '../../Services/facilites.service';
import { ViewFacilityComponent } from '../view-facility/view-facility.component';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from '../../../../Core/auth/auth-routing.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator,MatPaginatorModule,PageEvent} from '@angular/material/paginator';
import { AddEditFacilitiesComponent } from '../add-edit-facilities/add-edit-facilities.component';
import { AlertsService } from '../../../../shared/Services/alerts.service';

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

  constructor(public dialog: MatDialog,public _FacilitesService: FacilitesService,private _alerts: AlertsService)
  {
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

  viewFacility(row: any) {
     this.dialog.open(ViewFacilityComponent, {
      data:row,
    });

  }

  addFacility() {
   const dialogRef = this.dialog.open(AddEditFacilitiesComponent, {
      width: '640px',

      data: {
        title: 'Add Facility',
        name:null,
        id:null
      },
    });
     dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.getAllFacilites();
      }
    });
  }
  editFacility(id: string , name :string) {
   const dialogRef = this.dialog.open(AddEditFacilitiesComponent, {
      width: '640px',

      data: {
        title: 'Edit Facility',
        name:name,
        id:id
      },
    });
     dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllFacilites();
      }
    });
  }

  deleteFacility(id: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '640px',
      height: '571px',
      data: {
        text: 'facilities',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletefacilitiesFunc(id);
      }
    });
  }

  deletefacilitiesFunc(id: string) {
    this._FacilitesService.deletefacilities(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        this._alerts.SweetalertError('an error occurred');

      },
      complete: () => {
        this._alerts.SweetalertSuccess("Deleted successfully🎉")
        this.getAllFacilites();
      },
    });
  }
}
