import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdsComponent } from './add-edit-ads.component';

describe('AddEditAdsComponent', () => {
  let component: AddEditAdsComponent;
  let fixture: ComponentFixture<AddEditAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
