import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewexamComponent } from './newexam.component';

describe('NewexamComponent', () => {
  let component: NewexamComponent;
  let fixture: ComponentFixture<NewexamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OldexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
