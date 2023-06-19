import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminresultComponent } from './adminresult.component';

describe('AdminresultComponent', () => {
  let component: AdminresultComponent;
  let fixture: ComponentFixture<AdminresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
