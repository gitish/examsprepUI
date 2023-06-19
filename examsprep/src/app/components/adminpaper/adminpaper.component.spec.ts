import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpaperComponent } from './adminpaper.component';

describe('AdminpaperComponent', () => {
  let component: AdminpaperComponent;
  let fixture: ComponentFixture<AdminpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
