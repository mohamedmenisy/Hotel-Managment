import { DeleteModalComponent } from './../../../../shared/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAdsComponent } from './../add-edit-ads/add-edit-ads.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Ad } from '../../Interfaces/ads';
import { AdsService } from '../../Services/ads.service';
import { AlertsService } from '../../../../shared/Services/alerts.service';
import { AdsViewComponent } from '../ads-view/ads-view.component';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
})
export class AdsListComponent implements OnInit {

  displayedColumns: string[] = [
    'room',
    'price',
    'discount',
    'capacity',
    'active',
    'category',
    'actions',
  ];

  dataSource = new MatTableDataSource<Ad>([]);
  totalCount = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adsService: AdsService,public dialog: MatDialog ,private _alerts:AlertsService) {}

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.adsService.Getter().subscribe({
      next: (response) => {
        this.dataSource.data = response.data.ads;
        this.totalCount = response.data.totalCount;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load ads:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: any): void {
    console.log('Page changed:', event);
  }

  addAd(): void {
   const dialogRef = this.dialog.open(AddEditAdsComponent, {
          width: '640px',
          data: {
            title: 'Add ads',
            modalData:null,
          },
        });
         dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadAds()
          }
        });
  }


  editAd(model: any): void {
    const dialogRef = this.dialog.open(AddEditAdsComponent, {
          width: '640px',
          data: {
            title: 'Edit ads',
            modalData:model
          },
        });
         dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadAds();
          }
        });
  }


   deleteAd(id: string) {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        width: '640px',
        height: '571px',
        data: {
          text: 'Ads',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteAdsFunc(id);
        }
      });
    }

    deleteAdsFunc(id: string) {
      this.adsService.DeleteAds(id).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
        this._alerts.SweetalertError();
          console.log(error);
        },
        complete: () => {
          this._alerts.SweetalertSuccess("Deleted successfully🎉");
          this.loadAds();
        },
      });
    }
  viewAd(adsid:string){
     const dialogRef = this.dialog.open(AdsViewComponent, {
      width: '640px',
      data: {
        id: adsid,
      },
    });
  }
}
