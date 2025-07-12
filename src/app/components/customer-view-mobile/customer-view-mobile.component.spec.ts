import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewMobileComponent } from './customer-view-mobile.component';

describe('CustomerViewMobileComponent', () => {
  let component: CustomerViewMobileComponent;
  let fixture: ComponentFixture<CustomerViewMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
