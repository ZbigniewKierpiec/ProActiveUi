import { TestBed } from '@angular/core/testing';

import { ThemeEventService } from './theme-event.service';

describe('ThemeEventService', () => {
  let service: ThemeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
