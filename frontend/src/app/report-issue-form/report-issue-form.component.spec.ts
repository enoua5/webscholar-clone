import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportIssueFormComponent} from './report-issue-form.component';

describe('ReportIssueFormComponent', () => {
  let component: ReportIssueFormComponent;
  let fixture: ComponentFixture<ReportIssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportIssueFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
