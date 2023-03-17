import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportIssueFormService } from './report-issue-form.service';

describe('ReportIssueFormService', () => {
  let service: ReportIssueFormService;
  let fixture: ComponentFixture<ReportIssueFormService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReportIssueFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
