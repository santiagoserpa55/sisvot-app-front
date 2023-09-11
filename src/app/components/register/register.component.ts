import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserRegistrationRequest } from 'src/app/models/user-registration-request'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  form: any = {
    username: null,
    email: null,
    password: null,
  }
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  constructor(private authService: AuthService, private router: Router) {}


  onSubmit() {
    const { username, email, password } = this.form

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.isSuccessful = true
        this.isSignUpFailed = false
        this.errorMessage = "Registro exitoso, ya puede iniciar sesion"
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message
        this.isSignUpFailed = true
      },
    })
  }
}
