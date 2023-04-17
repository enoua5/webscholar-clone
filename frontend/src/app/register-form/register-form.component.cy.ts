import {RegisterFormComponent} from "./register-form.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RegisterFormComponent', () => {
  it('mounts', () => {
    cy.mount(RegisterFormComponent, {
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
  });
});
