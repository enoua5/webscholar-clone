import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { ReportIssueFormComponent } from './report-issue-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReportIssueFormComponent', () => {
  let component: ReportIssueFormComponent;
  let fixture: ComponentFixture<ReportIssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ReportIssueFormComponent]
    })
      .compileComponents();
      fixture = TestBed.createComponent(ReportIssueFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
