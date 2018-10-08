import { TestBed, inject } from '@angular/core/testing';

import { PhotostreamsService } from './photostreams.service';

describe('PhotostreamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotostreamsService]
    });
  });

  it('should be created', inject([PhotostreamsService], (service: PhotostreamsService) => {
    expect(service).toBeTruthy();
  }));
});
