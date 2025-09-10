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

  constructor(private adsService: AdsService) {}

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
    console.log('Add new ad clicked');
  }

  viewAd(row: Ad): void {
    console.log('View Ad:', row);
  }

  editAd(id: string): void {
    console.log('Edit Ad with ID:', id);
  }

  deleteAd(id: string): void {
    console.log('Delete Ad with ID:', id);
  }
}
