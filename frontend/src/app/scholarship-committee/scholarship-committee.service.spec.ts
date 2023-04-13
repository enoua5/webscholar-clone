import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScholarshipCommitteeService } from './scholarship-committee.service';

describe('ScholarshipCommitteeService', () => {
    let service: ScholarshipCommitteeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScholarshipCommitteeService]
        });
        service = TestBed.inject(ScholarshipCommitteeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get applicants', (done: DoneFn) => {
        service.getApplicants().subscribe(applicants => {
            expect(applicants.length).toBeGreaterThan(0);
            done();
        });
    });

    it('should filter applicants correctly', () => {
        const mockApplicants = [
            { applicationScore: null },
            { applicationScore: 3 },
            { applicationScore: 5 },
            { applicationScore: null }
        ];

        const filteredApplicants = service.filterApplicants(mockApplicants, 1, '');
        expect(filteredApplicants.length).toEqual(2);
    });

});
