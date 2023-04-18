// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, RouterModule } from '@angular/router';
import { CommitteeComponent } from './committee.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScholarshipCommitteeComponent', () => {
    let component: CommitteeComponent;
    let fixture: ComponentFixture<CommitteeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, RouterModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [CommitteeComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: '1' })
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommitteeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component = new CommitteeComponent(null, null);
    });

  /**
   * This unit test tests if the correct number of search results are returned when using a search string.
   * A collection of dummy applicants named John Doe, Jane Doe, and Bob Deer is created. The search string is then set
   * to "doe". 2 search results are expected. If the length of displayedApplicants is 2, the test passes. The search
   * string is then set to "bob". 1 search result is expected. If the length of displayedApplicants is 1, the test
   * passes again. The unit test is then concluded.
   */
  it('should return the correct number of searched applicants', () => {
        expect(component).toBeTruthy();
        const applicants = [
          { name: 'John Doe', schoolId: 'w1234567', appId: '123456' },
          { name: 'Jane Doe', schoolId: 'w7654321', appId: '654321' },
          { name: 'Bob Deer', schoolId: 'w2345678', appId: '345678' },
      ];
      component.allApplicants = applicants;

      //Searching for the name "doe". 2 result are expected.
      component.searchString = 'doe';
      component.filterApps(0);
      expect(component.displayedApplicants.length).toBe(2);

      //Searching for the name "bob". 1 result is expected.
      component.searchString = 'bob';
      component.filterApps(0);
      expect(component.displayedApplicants.length).toBe(1);

    });





});
