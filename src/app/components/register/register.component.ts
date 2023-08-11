import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate/candidate.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationRequest } from '../../models/authentication-request';
import { CandidateRegistrationRequest } from 'src/app/models/candidate-registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMsg = '';
  candidate: CandidateRegistrationRequest = {
   // contrasena: undefined
  };
  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private authenticationService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  createAccount() {
    this.candidateService.registerCandidate(this.candidate)
    .subscribe({
      next: () => {
        const authReq: AuthenticationRequest = {
          correo: this.candidate.correo,
          //contrasena: this.candidate.contrasena
        }
        this.authenticationService.login(authReq)
        .subscribe({
          next: (authenticationResponse) => {
            localStorage.setItem('user', JSON.stringify(authenticationResponse));
            this.router.navigate(['customes']);
          },
          error: (err) => {
            if (err.error.statusCode === 401) {
              this.errorMsg = 'Login and / or password is incorrect';
            }
          }
        });
      }
    });
  }
}
