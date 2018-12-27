import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CMS_URL } from '../config/constants';

import { MainComponent } from '../components/main/main.component';
import { UserLoginComponent } from '../components/main/user-login/user-login.component';

import { AuthGuard } from '../guards/auth.guard';
import { SignupFormComponent } from '../components/main/user-login/signup-form/signup-form.component';


const topMenu: Routes = [
    { path: '', redirectTo: CMS_URL, pathMatch:'full'},
    { path: 'signin', component: UserLoginComponent},
    { path: 'signup', component: SignupFormComponent},
    { path: CMS_URL, component: MainComponent,
        canActivate: [AuthGuard], children: [
        { path: 'user', loadChildren: 'app/components/main/home/home.module#HomeModule'},
        { path: 'admin', loadChildren: 'app/components/main/user/user.module#UserModule'},        
        ]
    },
    { path: '**', redirectTo: CMS_URL }
];

@NgModule({
    imports: [RouterModule.forRoot(topMenu)],
    exports: [RouterModule]
})

export class TopMenuModule {

}

