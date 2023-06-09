import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampreviewComponent } from './exampreview.component';

describe('ExampreviewComponent', () => {
  let component: ExampreviewComponent;
  let fixture: ComponentFixture<ExampreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
