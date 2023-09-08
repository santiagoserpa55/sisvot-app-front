import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationResponse } from '../../models/authentication-response';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  eventBusSub?: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private eventBusService: EventBusService,

  ) {
  }
  items: Array<MenuItem> = [
    {
      label: 'Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      separator: true
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.clear();
        this.logout()
        this.router.navigate(['login']);
      }
    },
  ];

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;

    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
