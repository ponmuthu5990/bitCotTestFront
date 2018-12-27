import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../Modules/shared.module';

import { HomeComponent } from './home.component';


const  HomeRoutes: Routes = [  
  {
    path: '', component: HomeComponent
}
];

@NgModule({
  imports: [CommonModule,MomentModule,RouterModule.forChild(HomeRoutes),
    SharedModule],
  declarations: [HomeComponent],
  providers:[],
  exports: [RouterModule]
})
export class HomeModule { }
