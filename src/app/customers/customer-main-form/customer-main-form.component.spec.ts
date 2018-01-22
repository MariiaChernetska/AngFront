import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainFormComponent } from './customer-main-form.component';

describe('CustomerMainFormComponent', () => {
  let component: CustomerMainFormComponent;
  let fixture: ComponentFixture<CustomerMainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
