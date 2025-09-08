import { Component } from '@angular/core';
import { FacilitesService } from '../../Services/facilites.service';

import { ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  IApiResponse,
  IFacilitiesData,
  IFacility,
} from '../../Interfaces/IFacility';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthRoutingModule } from '../../../../Core/auth/auth-routing.module';
import { DatePipe } from '@angular/common';

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
    DatePipe
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

  constructor(private _FacilitesService: FacilitesService) {
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

  viewFacility(id: string) {
    console.log('View facility with ID:', id);
    // Implement navigation to the facility detail view if needed
  }

  editFacility(id: string) {
    console.log('Edit facility with ID:', id);
    // Implement navigation to the facility edit view if needed
  }

  deleteFacility(id: string) {
    console.log('Delete facility with ID:', id);
    // Implement facility deletion logic if needed
  }
}
