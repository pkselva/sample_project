import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],  
    children: [
      { path: '', redirectTo: 'userlist', pathMatch: 'full' },
      { path: 'userlist', component: ListUserComponent },
      { path: 'createparty', component: CreatePartyComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }