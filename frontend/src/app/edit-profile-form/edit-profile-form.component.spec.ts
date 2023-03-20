import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { EditProfileFormComponent } from './edit-profile-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';


describe('EditProfileFormComponent', () => {
  let component: EditProfileFormComponent;
  let fixture: ComponentFixture<EditProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ EditProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
