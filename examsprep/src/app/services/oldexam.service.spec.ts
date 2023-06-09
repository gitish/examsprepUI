import { TestBed } from '@angular/core/testing';

import { OldexamService } from './oldexam.service';

describe('OldexamService', () => {
  let service: OldexamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldexamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
