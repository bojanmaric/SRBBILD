import { TestBed } from '@angular/core/testing';

import { KataloziSlikeService } from './katalozi-slike.service';

describe('KataloziSlikeService', () => {
  let service: KataloziSlikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KataloziSlikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
