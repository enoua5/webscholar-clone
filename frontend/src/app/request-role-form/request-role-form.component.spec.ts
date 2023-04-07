// Unit Testing Imports/Declarations
/// <reference types="jasmine" />

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RequestRoleFormComponent } from './request-role-form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms';
import { RequestRoleService } from './request-role.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

fdescribe('RequestRoleFormComponent', () => {
  let component: RequestRoleFormComponent;
  let fixture: ComponentFixture<RequestRoleFormComponent>;
  let httpMock: HttpTestingController;
  let service: RequestRoleService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ RequestRoleFormComponent ],
      providers: [ RequestRoleService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(RequestRoleService);
    httpMock = TestBed.inject(HttpTestingController)
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    sessionStorage.setItem("accountKey", '1');

    fixture = TestBed.createComponent(RequestRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('Request Role');
  });

  it('should get data from the API', () => {
    const testData = { status: 200 };
    
    service.sendRequest('chair').subscribe(data => {
      expect(data).toEqual(testData);
    });
  
    const req = httpMock.expectOne({
        method: 'POST',  
        url: 'http://localhost:6001/account/request_role/1',
    });    
    expect(req.request.body).toEqual('chair');
    req.flush(testData);
  });

  it('should set errorMessage when response status is not 200', () => {
    const response = { status: 404, error: { message: 'Not found' } };
    component['processErrors'](response);
  
    expect(component.errorMessage).toEqual('Not found');
  });

  it('blabla', fakeAsync(() => {
    const response = { status: 404, error: { message: 'Not found' } };
    httpClientSpy.post.and.returnValue(of(response));

    const pageForm = component.roleForm;
    pageForm.setValue({roleControl: "Committee Member"});
  
    component.onSubmit();
    tick(); // wait for HTTP request to complete

    fixture.detectChanges()
    alert(component.errorMessage)
    const element = fixture.debugElement.nativeElement;
    expect(component.errorMessage).toEqual('Not found');
  }));  
});
