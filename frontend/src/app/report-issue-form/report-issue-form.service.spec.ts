import {TestBed} from '@angular/core/testing';

import {ReportIssueFormService} from './report-issue-form.service';

describe('ReportIssueFormService', () => {
  let service: ReportIssueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIssueFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
