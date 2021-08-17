import { TestBed } from '@angular/core/testing';
import { modules } from "../material.module";

import { UIService } from './ui.service';

describe('UIService', () => {
  let service: UIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ ...modules  ]
    });
    service = TestBed.inject(UIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
