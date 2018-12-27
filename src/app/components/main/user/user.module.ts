import { NgModule, FactoryProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../Modules/shared.module';

import { AddUserComponent } from './manage-user/add-user/add-user.component';
import { EditUserListComponent } from './manage-user/edit-user/edit-user.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RoleEditComponent } from './manage-role/role-edit/role-edit.component';
import { RoleListComponent } from './manage-role/role-list/role-list.component';
import { UserComponent } from './user.component';
import { UserListComponent } from './manage-user/user-list/user-list.component';

import { RoleService } from '../../../services/role.service';

import { AuthGuard } from '../../../guards/auth.guard';

const  UserRoutes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [AuthGuard], children: [
        { path: '', component: ManageUserComponent, pathMatch: 'full' },       
        { path: 'adduser', component: AddUserComponent },
        { path: 'edituser', component: EditUserListComponent },
        { path: 'managerole', component: ManageRoleComponent,children:[
          { path: '', component: RoleListComponent },
          { path: 'add', component: RoleEditComponent },
          { path: 'manageedit', component: RoleEditComponent },
      ] },
    ]
},
  
];




@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(UserRoutes), SharedModule
  ],
  declarations: [AddUserComponent,EditUserListComponent,ManageRoleComponent,
                 ManageUserComponent,RoleEditComponent,RoleListComponent,UserComponent,UserListComponent],
  providers: [RoleService,],
  entryComponents: [],
  exports: [RouterModule]
})
export class UserModule { }
