import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LandingService } from '../../services/landing.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
CommonModule
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule, CommonModule,TranslatePipe,RouterLink],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  totalCount = 0;
  pageSize: number = 12;
  pageNumber: number = 1;
  rooms!: any[];
  currentIndexes: Record<string, number> = {};
  emptyImig: string = '../../../../assets/Images/Register.png';
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(private _LandingService:LandingService){}
  onPageChange(event: any): void {
    console.log('Page changed:', event);
  }
   ngOnInit(): void {

  this.getAllrooms()
 }
    getAllrooms() {


       this._LandingService.gitallroomsexplore(this.pageNumber, this.pageSize).subscribe({
         next: (res) => {
          console.log(res);

            this.rooms = res.data.rooms
            this.totalCount = res.data.totalCount;

         },
       });
     }


    formatImages(images: any): string[] {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    if (typeof images === 'string') return images.split(',').map(img => img.trim());
    return [];
  }
    getCurrentIndex(roomId: string): number {
    return this.currentIndexes[roomId] ?? 0;
  }

  prevImage(roomId: string, images: string[]) {
    const current = this.getCurrentIndex(roomId);
    this.currentIndexes[roomId] = (current - 1 + images.length) % images.length;
  }

  nextImage(roomId: string, images: string[]) {
    const current = this.getCurrentIndex(roomId);
    this.currentIndexes[roomId] = (current + 1) % images.length;
  }
 handlePageEvent(e: any) {

    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllrooms();
  }
}
