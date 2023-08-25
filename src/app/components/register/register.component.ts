import { Component } from '@angular/core';
import { UserRegistrationRequest } from 'src/app/models/user-registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMsg = '';
  usuario: UserRegistrationRequest = {};
  login() {
    throw new Error('Method not implemented.');
  }
  createAccount() {
    throw new Error('Method not implemented.');
  }

}
