import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeletePartyComponent, ListPartyComponent } from './components/list-party/list-party.component';
import { DialogModule } from '@angular/cdk/dialog';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditPartyComponent } from './components/edit-party/edit-party.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserStatusDialogComponent } from './components/user-status-dialog/user-status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './services/auth-interceptor';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    CreatePartyComponent,
    ListUserComponent,
    ListPartyComponent,
    EditUserComponent,
    EditPartyComponent,
    DashboardComponent,
    UserStatusDialogComponent,
    DeletePartyComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginator,
    DialogModule,
    MatMenuModule,
    NgChartsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
  export class AppModule { }
