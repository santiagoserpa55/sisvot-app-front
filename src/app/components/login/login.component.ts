import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authenticationRequest: AuthenticationRequest = {};
  errorMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login() {    
    this.errorMsg = '';
    this.authenticationService.login(this.authenticationRequest)    
    .subscribe({
      next: (authenticationResponse) => {
        localStorage.setItem('user', JSON.stringify(authenticationResponse));
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
        
        if (err.error.msg === "Bad username or password") {
          this.errorMsg = 'Correo o contraseña incorrectos';
        }
      }
    });
  }

  register() {
    this.router.navigate(['registro']);
  }
}
