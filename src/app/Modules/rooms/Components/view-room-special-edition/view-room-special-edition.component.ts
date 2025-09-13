import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../Services/rooms.service';

@Component({
  selector: 'app-view-room-special-edition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-room-special-edition.component.html',
  styleUrl: './view-room-special-edition.component.scss',
})
export class ViewRoomSpecialEditionComponent implements OnInit, OnDestroy {
  roomid: string = '';
  room: any;
  currentIndex = 0;
  autoplayInterval: any;

  constructor(
    private _active: ActivatedRoute,
    private _roomsService: RoomsService
  ) {
    this.roomid = _active.snapshot.params['id'];
    if (this.roomid) this.getRoomByid(this.roomid);
  }

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
  }

  getRoomByid(id: string) {
    this._roomsService.getRoomByid(id).subscribe({
      next: async (res) => {
        console.log(res);
        this.room = res.data.room;
      },
    });
  }

  public get facilityNames(): string {
    return this.room && this.room.facilities
      ? this.room.facilities.map((f: any) => f.name).join(', ')
      : '';
  }

  nextSlide() {
    if (!this.room?.images?.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.room.images.length;
  }

  prevSlide() {
    if (!this.room?.images?.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.room.images.length) %
      this.room.images.length;
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  openZoom(index: number) {
    const img = this.room?.images?.[index];
    if (img) window.open(img, '_blank');
  }
}
