// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
