// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, RouterModule } from '@angular/router';
import { CommitteeComponent } from './committee.component';

describe('ScholarshipCommitteeComponent', () => {
  let component: CommitteeComponent;
  let fixture: ComponentFixture<CommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, RouterModule,  ],
      declarations: [ CommitteeComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({id: '1'})
            }
          }
        }
      ]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
