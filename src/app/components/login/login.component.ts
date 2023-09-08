import { Component, OnInit } from '@angular/core'
import { AuthenticationRequest } from '../../models/authentication-request'
import { AuthenticationService } from '../../services/authentication/authentication.service'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/services/storage.service'
import { AuthService } from 'src/app/services/auth.service'
import { HttpStatusCode } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  }
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  roles: string[] = []

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true
      this.roles = this.storageService.getUser().roles
    }
  }

  onSubmit(): void {
    const { username, password } = this.form

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data)

        this.isLoginFailed = false
        this.isLoggedIn = true
        this.roles = this.storageService.getUser().roles
        this.router.navigate(['dashboard']);
        //this.reloadPage()        
      },
      error: (err) => {
        console.log("error", err);
        
        if (err.status === 401) {
          this.errorMessage = 'Login and / or password is incorrect';
        }
      /*   this.errorMessage = err.error.message
        this.isLoginFailed = true */
      },
    })
  }

/*   reloadPage(): void {
    window.location.reload()
  }
 */
  register() {
    this.router.navigate(['registro'])
  }
}
