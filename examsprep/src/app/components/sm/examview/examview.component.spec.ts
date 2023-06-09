import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExamviewComponent } from './examview.component';

describe('ExamviewComponent', () => {
  let component: ExamviewComponent;
  let fixture: ComponentFixture<ExamviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
