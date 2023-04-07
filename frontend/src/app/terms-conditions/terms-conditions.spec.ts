// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TermsConditionsComponent } from './terms-conditions.component';
import { TermsConditionsService } from './terms-conditions.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;
  let testService: TermsConditionsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TermsConditionsComponent],
      providers: [TermsConditionsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    testService = new TermsConditionsService(httpClientSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('Terms and Conditions');
  })

  it('Thest the mock API call to the backend', () => {
    const mockResponse = { status: 200 };
    httpClientSpy.get.and.returnValue(of(mockResponse));
    testService.retrieve().subscribe(response => {
      expect(response.status).toBe(200);
    });
  })
});

