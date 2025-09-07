import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }
  private isOpenedSubject = new BehaviorSubject<boolean>(false);

  isOpened$ = this.isOpenedSubject.asObservable();

  setIsOpened(value: boolean) {
    this.isOpenedSubject.next(value);
  }

  getIsOpened(): boolean {
    return this.isOpenedSubject.getValue();
  }

  private ScreenWidth = new BehaviorSubject<number>(0);
  screenWidth$ = this.ScreenWidth.asObservable();

  setWidth(value: number) {
    this.ScreenWidth.next(value);
  }

  getWidth(): number {
    return this.ScreenWidth.getValue();
  }

}
