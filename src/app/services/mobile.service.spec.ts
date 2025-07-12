import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MobileService } from './mobile.service';

describe('MobileService', () => {
  let service: MobileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MobileService]
    });

    service = TestBed.inject(MobileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('frontend_mobile service should be created', () => {
    expect(service).toBeTruthy();
  });
});