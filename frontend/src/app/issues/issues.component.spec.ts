import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { IssuesComponent } from './issues.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ IssuesComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
