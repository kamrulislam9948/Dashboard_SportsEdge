import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventAddComponent } from './components/event/event-add/event-add.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { ManagerListComponent } from './components/manager/manager-list/manager-list.component';
import { ManagerAddComponent } from './components/manager/manager-add/manager-add.component';
import { ManagerEditComponent } from './components/manager/manager-edit/manager-edit.component';
import { authGuardFnGuard } from './components/guards/auth-fn.guard';
import { SelectionPanelAddComponent } from './components/selectionPanel/selection-panel-add/selection-panel-add.component';
import { SelectionPanelListComponent } from './components/selectionPanel/selection-panel-list/selection-panel-list.component';
import { SelectionPanelEditComponent } from './components/selectionPanel/selection-panel-edit/selection-panel-edit.component';

const routes: Routes = [
  { path: '', component:LoginComponent  },
  { path: 'login', component : LoginComponent },
  { path: 'register', component : RegisterComponent},
  { path: 'password-forgot', component : ForgotPasswordComponent  },
  {
    path: 'admin', component: AdminComponent,  
    children:[
        { path: '', component: DashboardComponent },
        { path: 'dashbaoard', component: DashboardComponent },
        { path: 'manager-list', component: ManagerListComponent},
        { path: 'manager-add', component: ManagerAddComponent },
        { path: 'manager-edit/:id', component: ManagerEditComponent },
        { path: 'event-list', component: EventListComponent },
        { path: 'event-add', component: EventAddComponent },
        {path: 'event-edit/:id', component: EventEditComponent},
        { path: 'selectionPanel-list', component: SelectionPanelListComponent },
        { path: 'selectionPanel-add', component: SelectionPanelAddComponent },
        { path: 'selectionPanel-edit', component: SelectionPanelEditComponent },
        { path: 'profile', component: ProfileComponent }
      ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
