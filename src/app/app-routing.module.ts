import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListPartyComponent } from './components/list-party/list-party.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditPartyComponent } from './components/edit-party/edit-party.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'createparty', pathMatch: 'full' },
      { path: 'userlist', component: ListUserComponent },
      { path: 'partylist', component: ListPartyComponent },
      { path: 'createparty', component: CreatePartyComponent },
      { path: 'userlist/edituser', component: EditUserComponent },
      { path: 'partylist/editparty', component: EditPartyComponent },
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