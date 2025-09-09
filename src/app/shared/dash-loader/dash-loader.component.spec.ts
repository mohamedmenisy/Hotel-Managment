import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLoaderComponent } from './dash-loader.component';

describe('DashLoaderComponent', () => {
  let component: DashLoaderComponent;
  let fixture: ComponentFixture<DashLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
