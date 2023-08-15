import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidateComponent } from './components/candidates/candidates.component';
import { AccessGuardService } from './services/guard/access-guard.service';
import { VotarComponent } from './components/votar/votar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'candidates',
    component: CandidateComponent,
    canActivate: [AccessGuardService]
  },
  {
    path: 'votar',
    component: VotarComponent,
    canActivate: [AccessGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
