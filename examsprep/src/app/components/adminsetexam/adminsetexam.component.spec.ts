import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsetexamComponent } from './adminsetexam.component';

describe('AdminsetexamComponent', () => {
  let component: AdminsetexamComponent;
  let fixture: ComponentFixture<AdminsetexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsetexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsetexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
