import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacilityComponent } from './view-facility.component';

describe('ViewFacilityComponent', () => {
  let component: ViewFacilityComponent;
  let fixture: ComponentFixture<ViewFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFacilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
