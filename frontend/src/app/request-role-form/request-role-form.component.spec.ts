import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRoleFormComponent } from './request-role-form.component';

describe('RequestRoleFormComponent', () => {
  let component: RequestRoleFormComponent;
  let fixture: ComponentFixture<RequestRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
