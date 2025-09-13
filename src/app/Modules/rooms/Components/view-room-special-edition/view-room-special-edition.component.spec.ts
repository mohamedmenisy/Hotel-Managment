import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomSpecialEditionComponent } from './view-room-special-edition.component';

describe('ViewRoomSpecialEditionComponent', () => {
  let component: ViewRoomSpecialEditionComponent;
  let fixture: ComponentFixture<ViewRoomSpecialEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRoomSpecialEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRoomSpecialEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
