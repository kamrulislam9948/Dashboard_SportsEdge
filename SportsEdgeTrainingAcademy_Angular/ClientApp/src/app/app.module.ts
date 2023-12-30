import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventAddComponent } from './components/event/event-add/event-add.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginService } from './components/services/authentication/login.service';
import { AuthService } from './components/services/authentication/auth.service';
import { ManagerService } from './components/services/data/manager.service';
import { NotifyService } from './components/services/common/notify.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { ManagerListComponent } from './components/manager/manager-list/manager-list.component';
import { ManagerAddComponent } from './components/manager/manager-add/manager-add.component';
import { ManagerEditComponent } from './components/manager/manager-edit/manager-edit.component';
import { SelectionPanelListComponent } from './components/selectionPanel/selection-panel-list/selection-panel-list.component';
import { SelectionPanelAddComponent } from './components/selectionPanel/selection-panel-add/selection-panel-add.component';
import { SelectionPanelEditComponent } from './components/selectionPanel/selection-panel-edit/selection-panel-edit.component';
import { ConfirmationDeleteComponent } from './components/dialog/confirmation-delete/confirmation-delete.component';
import { EventService } from './components/services/data/event.service';
import { SelectionPanelService } from './components/services/data/selectionPanel.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminComponent,
    DashboardComponent,
    EventAddComponent,
    EventEditComponent,
    ProfileComponent,
    EventListComponent,
    ManagerListComponent,
    ManagerAddComponent,
    ManagerEditComponent,
    SelectionPanelListComponent,
    SelectionPanelAddComponent,
    SelectionPanelEditComponent,
    ConfirmationDeleteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    
  ],
  providers: [HttpClient, LoginService, EventService, SelectionPanelService, AuthService, ManagerService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
