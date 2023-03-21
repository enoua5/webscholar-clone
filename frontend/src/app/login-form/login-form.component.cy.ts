// UI Testing Imports/Declarations
/// <reference types="cypress" />

// Component-Specific Imports
import { LoginFormComponent } from "./login-form.component"
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LoginFormComponent', () => {
  it('mounts', () => {
    cy.mount(LoginFormComponent, {
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
  })
})