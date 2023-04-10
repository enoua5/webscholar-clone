import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScholarshipService } from './scholarship.service';

describe('ScholarshipService', () => {
    let service: ScholarshipService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScholarshipService],
        });

        service = TestBed.inject(ScholarshipService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return scholarships', (done) => {
        // Replace this with the expected hard-coded scholarships
        const expectedScholarships = [
            {
                scholarshipId: 1,
                title: 'Scholarship 1',
                organization: 'Organization 1',
                description: 'Description 1',
                requirements: 'Requirements 1',
                amount: '100',
            },
            {
                scholarshipId: 2,
                title: 'Scholarship 2',
                organization: 'Organization 2',
                description: 'Description 2',
                requirements: 'Requirements 2',
                amount: '2200'
            },
            {
                scholarshipId: 3,
                title: 'Scholarship 3',
                organization: 'Organization 3',
                description: 'Description 3',
                requirements: 'Requirements 3',
                amount: '300'
            },
        ];

        service.getScholarships().subscribe((scholarships) => {
            expect(scholarships).toEqual(expectedScholarships);
            done();
        });
    });

    it('should return user type from session storage', () => {
        sessionStorage.setItem('committeeMember', 'admin');

        const userType = service.getUserType();
        expect(userType).toEqual('admin');

        sessionStorage.removeItem('committeeMember');
    });
});
