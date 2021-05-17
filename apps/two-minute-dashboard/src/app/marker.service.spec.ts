import { TestBed } from '@angular/core/testing';

import { MarkerService } from './marker.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarkerService', () => {
  let service: MarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule
      ]});
    service = TestBed.inject(MarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
